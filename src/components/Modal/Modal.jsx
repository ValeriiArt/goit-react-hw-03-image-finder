import React, { Component } from "react";
import { createPortal } from "react-dom";
import s from './Modal.module.css'

const modalRoot = document.querySelector('#root-modal');

export default class Modal extends Component {

    componentDidMount() {
        console.log('Modal componentDidMount')
        window.addEventListener('keydown', this.handeleKeyDown );
    };

    componentWillUnmount() {
        console.log('Modal componentWillUnmount')
        window.removeEventListener('keydown', this.handeleKeyDown );
    };

    handeleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        };
    };

    handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    }

    render() {      
        return createPortal(
            <div className={s.Overlay} onClick={this.handleBackdropClick}>
                <div className={s.Modal}>
                    
                    {this.props.children}
                </div>
            </div>,
            modalRoot,
        );
    }
}

