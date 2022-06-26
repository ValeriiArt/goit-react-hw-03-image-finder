import React, { Component } from "react";
import Modal from "./Modal";

export class App extends Component {
  state = {
    showModal: false,

  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  }
  render() {
    const { showModal } = this.state;
    return (
      <>
        <button type="button" onClick={this.toggleModal}>Open Modal</button>
        {/* <Searchbar></Searchbar> */}
        {/* <ImageGallery></ImageGallery> */}
        {/* <ImageGalleryItem></ImageGalleryItem> */}
        {/* <Loader></Loader> */}
        {/* <Button></Button> */}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <button type="button" onClick={this.toggleModal}>Close Modal</button>
          </Modal>
        )}
      </>
    ); 
  }
};

