import React, { Component } from "react";
import s from './Searchbar.module.css'
import { toast } from "react-toastify";


export default class Searchbar extends Component {
    state = {
        searchInputText: '',
    };

    handelSearchChange = e => {
        this.setState({ searchInputText: e.currentTarget.value.toLowerCase() });

    };

    handelSubmit = e => {
        e.preventDefault();
        if (this.state.searchInputText.trim() === '') {
            toast.error('🦄 Wow so easy!');
            this.props.value();
            return;
        }
        this.props.onSubmit(this.state.searchInputText);
        this.setState({ searchInputText: '' });

    }

    render() {
        return (
            <header className={s.searchbar}>
                <form
                    className={s.searchForm}
                    onSubmit={this.handelSubmit} >
                        <button type="submit" className={s.button}>
                            <span className={s.buttonLabel}>Search</span>
                        </button>
    
                    <input
                        className={s.input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name="inputText"
                        value={this.state.searchInputText}
                        onChange={this.handelSearchChange}
                    />
                </form>
            </header>
        );
    };
}

