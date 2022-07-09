import s from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({id, webformatURL, largeImageURL, toggleModal}) => {
    return (
        <li key={id}
            className={s.galleryItem}
        >
            <img className={s.image}
                src={webformatURL}
                alt=""
                onClick={()=>{toggleModal(largeImageURL)}}
            />
        </li>
    );
}

export default ImageGalleryItem;