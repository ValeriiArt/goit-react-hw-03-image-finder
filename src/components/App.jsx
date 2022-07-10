import React, { Component } from "react";
import { ToastContainer } from 'react-toastify';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'react-toastify/dist/ReactToastify.css';
import Modal from "./Modal";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Button from "./Button";

export class App extends Component {
  state = {
    key: '27064773-d5b51f526778ba93a6d48a229',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 32,
    page: 1,
    error: null,
    isLoaded: false,
    showModal: false,
    searchText: '',
    modalImage:'',
    data: [],
  };

  componentDidUpdate(_, prevState) {
    const prevSearchText = prevState.searchText;
    const nextSearchText = this.state.searchText;
    const {key, searchText, image_type, orientation, safesearch, per_page, page} = this.state;
      if (prevSearchText !== nextSearchText || prevState.page !== page) {
          this.setState({ isLoaded: true})
          fetch(`https://pixabay.com/api/?key=${key}&q=${searchText}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}&per_page=${per_page}&page=${page}`)
              .then(response => {
                  if (response.ok) {
                      return response.json();
                  }
                  return Promise.reject(
                      new Error('По даному запиту нічого не знайдено.')
                  );
              })
              .then((result) => {
                  this.setState({
                    isLoaded: true,
                    data: [...this.state.data, ...result.hits],
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

  handelFormSubmit = searchText => {
    this.setState({
            page: 1,
            data: [],
        });
    this.setState({ searchText });
  };

  loadMore = () => {
    this.setState(prevState => ({
        page: prevState.page + 1,
    }))
  };

  toggleModal = (largeImageURL) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalImage: largeImageURL,
    }));
  };


  render() {
    const { showModal, data, modalImage, isLoaded} = this.state;
    return (
      <>
        <Searchbar
          onSubmit={this.handelFormSubmit}
        />
        <ImageGallery
          data={data}
          toggleModal={this.toggleModal}
          isLoaded = {isLoaded}
        />

        {this.state.data.length > 0 && <Button 
          nameButton='Load More'
          Click={this.loadMore}
          />}
        
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={modalImage} alt="" />
            <Button 
              nameButton='Close'
              Click={this.toggleModal}
            />
          </Modal>
        )}

        <ToastContainer autoClose={3000}/>
      </>
    ); 
  }
};

