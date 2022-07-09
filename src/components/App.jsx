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
    showModal: false,
    searchText: '',
    data: [],
    page: 1,
    modalImage:'',
  };

  handelFormSubmit = searchText => {
    this.setState({
            page: 1,
            data: [],
        });
    this.setState({ searchText });
  };

  onChangeData = (data) => {
    this.setState({
      data: [...this.state.data, ...data],
    });
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
    const { showModal, searchText, data, page, modalImage} = this.state;
    return (
      <>
        <Searchbar
          onSubmit={this.handelFormSubmit}
        />
        <ImageGallery
          searchText={searchText} 
          data={data}
          page={page} 
          toggleModal={this.toggleModal}
          onChangeData={this.onChangeData}
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

