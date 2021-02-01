import React from 'react';
import axios from 'axios';
import propType from 'prop-types';
import { API_SERVER } from '../config.js';
import './NewsBody.css';

class NewsBody extends React.Component {
    constructor(props) {
        super(props);
        this.state.id = props.match.params.id;
    }

    componentDidMount() {
        this.loadNews(`${API_SERVER}/economy/${this.state.id}`);
    }

    state = {  
        id: '',
        title: '',
        date: '',
        body: '',
        resource: ''
    }
    loadNews = async (url) => {
        const { data } = await axios.get(url);
        this.setState({
            title: data.title,
            date: data.date,
            body: data.body,
            resource: data.resource
        })
    }

    render() {
        const {title, date, body, resource} = this.state;
        const cleanDate = new Date(date).format('yyyy-MM-dd(E) a/p hh:mm');
        return (
            <div className='contents'>
                <div className='news_content'>
                    <div className='news_title'><h1>{ title }</h1></div>
                    <div className='news_date'>{ cleanDate }</div>
                    <div className='news_body'>{ body }</div>
                    <div className='news_resource'>
                        출처: <a href={resource} className='news_resource_link'>
                            { resource }
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

NewsBody.propType = {
    id: propType.string,
    title: propType.string,
    date: propType.date,
    body: propType.string,
    resource: propType.string
}

Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
    var h;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};



export default NewsBody