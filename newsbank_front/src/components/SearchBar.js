import React from 'react';
import propType from 'prop-types';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.props.onSubmit;
        this.onChange = this.props.onChange;
    }
    state = {
        searchWord: ''
    }

    onInputChange = (e) => {
        e.preventDefault();
        const sw = e.target.value;
        this.setState({searchWord: sw})
        this.onChange(sw);
    }
    onFormSubmit = (e) => {
        e.preventDefault();
        this.onSubmit(this.state.searchWord);
    }

    render() {
        return (
            <div className="search_bar">
                <form onSubmit={this.onFormSubmit}>
                    <input type="text" className="search_input" onChange={this.onInputChange} value={this.props.value}/>
                    <input type="submit" className="search_input_submit" value="search" />
                </form>
            </div>
        )
    }
}

SearchBar.propType = {
    onSubmit: propType.func,
    onChange: propType.func
}

export default SearchBar