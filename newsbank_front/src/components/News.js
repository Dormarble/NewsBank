import React from 'react';
import { Link } from 'react-router-dom';
import './News.css';

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            title: props.title,
            body: props.body,
            date: props.date,
            resource: props.resource
        }
    }
    state = {
        id: '',
        title: '',
        body: '',
        date: '',
        resource: ''
    }

    render() {
        const { id, title, body, date, resource } = this.state;
        let dateObj = new Date(date);
        const body350 = body.length > 350 ? body.substr(0, 350).concat('...') : body;
        const articleLink = `/Economy/${id}`;

        return (
        <div className='news_card'>
            <span className='news_card_title'>
                <Link to={ articleLink } className='news_card_link'>
                    <h3>{ title }</h3>
                </Link>
            </span>
            <span className= 'news_card_date'>{ dateObj.format('yyyy-MM-dd(E) a/p hh:mm')}</span>
            <div className='news_card_body'>
                <Link to={articleLink} className='news_card_link'>
                    <p>{ body350 }</p>
                </Link>
            </div>
            <span className='news_card_resource'>
                출처: <a href={resource} className='news_card_resource_link'>
                    { resource }
                </a>
            </span>
        </div>
        )
    }
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


export default News