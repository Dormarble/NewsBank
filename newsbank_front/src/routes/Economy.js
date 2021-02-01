import React from 'react';
import axios from 'axios';

import News from '../components/News.js';
import SearchBar from '../components/SearchBar.js';
import Spinner from '../components/Spinner.js';
import { API_SERVER } from '../config.js';
import './Economy.css';

class Economy extends React.Component {
    state = {
        isLoading: true,
        searchWord: '',
        newsArr: []
    }
    async getNews(searchWord) {
        this.setState({isLoading:true});
        let query = '';
        if (searchWord) {
            query = `?search_word=${searchWord}`;
        }
        const { data: {articles} } = await axios.get(`${API_SERVER}/economy${query}`);
        this.setState({isLoading:false, newsArr: articles});
    };

    componentDidMount() {
        this.getNews();
    }

    onSubmit = (searchWord) => {
        this.getNews(searchWord);
    }
    onChange = (searchWord) => {
        this.setState({searchWord: searchWord});
    }

    render() {
        const { isLoading, newsArr } = this.state;
        let component;
        if (isLoading) {
            component = 
            <div className='container'>
                <div className='loader'>
                    <Spinner/>
                    <span>Loading...</span>
                </div>
            </div>
        } else {
            component = 
            <div className='container'>
                <SearchBar value={this.state.searchWord} onChange={this.onChange} onSubmit={this.onSubmit} />
                <div className='contents'>
                    { newsArr.length === 0 ? <div className='no_news_card'>There is no news</div> : null }
                    <div className='news_cards_contents'>
                    {
                        newsArr.map((news, idx) => {
                            return <News
                                id = {news._id}
                                key={idx}
                                title={news.title}
                                body={news.body}
                                date={news.date}
                                resource={news.resource}
                            />
                        })
                    }
                    </div>
                </div>
            </div>
        }


        return component;
    }
}


export default Economy