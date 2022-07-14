import React, { Component } from "react";
import { ToastContainer } from 'react-toastify';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'react-toastify/dist/ReactToastify.css';
import Modal from "./Modal";
import Searchbar from "./Searchbar";
import {fetchPictures} from '../service/fetchPictures'
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import { toast } from "react-toastify";

export class App extends Component {
  state = {
    modalImage:'',
    error: null,
    isLoaded: false,
    showModal: false,
    searchText: '',
    page: 1,
    data: [],
    totalHitsPage: null,
  };

  componentDidUpdate(_, prevState) {
    
    const prevSearchText = prevState.searchText;
    const nextSearchText = this.state.searchText;
    const {searchText, page} = this.state;
      if (prevSearchText !== nextSearchText || prevState.page !== page) {
          this.setState({ isLoaded: true})
          
        fetchPictures(searchText, page)
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
                    totalHitsPage: result.totalHits,
                  });
                if (result.hits.length === 0) {
                  return toast.error('По даному запиту нічого не знайдено.');
                }
              },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                  }
          ).finally(() => this.setState({ isLoaded: false }))
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
    const { showModal, data, modalImage, isLoaded, totalHitsPage} = this.state;
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

        { data.length !== 0 && totalHitsPage !== data.length && <Button
          nameButton='Load More'
          Click={this.loadMore}
        /> } 
        
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

