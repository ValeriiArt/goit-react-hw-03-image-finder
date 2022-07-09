import ImageGalleryItem from 'components/ImageGalleryItem';
import React, {Component} from 'react';
import s from './ImageGallery.module.css';
import { MutatingDots } from 'react-loader-spinner';




export default class ImageGallery extends Component {
    state = {
        key: '27064773-d5b51f526778ba93a6d48a229',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 32,
        error: null,
        isLoaded: false,
    };

    componentDidUpdate(prevProps, _) {
        const prevSearchText = prevProps.searchText;
        const nextSearchText = this.props.searchText;

        if (prevSearchText !== nextSearchText || prevProps.page !== this.props.page) {
            this.setState({ isLoaded: true})
            fetch(`https://pixabay.com/api/?key=${this.state.key}&q=${this.props.searchText}&image_type=${this.state.image_type}&orientation=${this.state.orientation}&safesearch=${this.state.safesearch}&per_page=${this.state.per_page}&page=${this.props.page}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    return Promise.reject(
                        new Error('По даному запиту нічого не знайдено.')
                    );
                })
                .then((data) => {
                    this.props.onChangeData(data.hits)
                    this.setState({
                             isLoaded: true,
                         });
                },
                     (error) => {
                         this.setState({
                             isLoaded: true,
                             error
                         });
                    }
            ).finally(()=>this.setState({isLoaded: false}))
            
        };
 
    }

    render() {
        return (
            <>
                {this.state.isLoaded && <MutatingDots/>}
                <ul className={s.gallery}>
                    {this.props.data.map(({ id, webformatURL, largeImageURL }) => {
                        return (                          
                            <ImageGalleryItem
                            key={id}
                            webformatURL={webformatURL}
                            largeImageURL={largeImageURL}
                            toggleModal={this.props.toggleModal}
                            />
                        )
                    })}
                </ul>
            </>
        );
    }
}
 