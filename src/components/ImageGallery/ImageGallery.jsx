import ImageGalleryItem from 'components/ImageGalleryItem';
import s from './ImageGallery.module.css';
import { MutatingDots } from 'react-loader-spinner';




const ImageGallery = ({data, toggleModal, isLoaded}) => {

        return (
            <>
                {isLoaded && <MutatingDots/>}
                <ul className={s.gallery}>
                    {data.map(({ id, webformatURL, largeImageURL }) => {
                        return (                          
                            <ImageGalleryItem
                            key={id}
                            webformatURL={webformatURL}
                            largeImageURL={largeImageURL}
                            toggleModal={toggleModal}
                            />
                        )
                    })}
                </ul>
            </>
        );
    
}
 
export default ImageGallery;