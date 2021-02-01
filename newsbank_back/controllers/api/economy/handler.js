import mongoose from 'mongoose';

import Article from '../../../models/articles.js';

// url: /api/economy?start_date=2020-01-01&end_date=2020-01-31&page=1
function handler(req, res) {
    const defaultPeriod = 10;

    let startDate, endDate;
    if (req.query.start_date) { startDate = new Date(req.query.start_date); } 
    else { startDate = (new Date()).addDays((-1)*defaultPeriod); }
    if (req.query.end_date) { endDate = new Date(req.query.end_date); } 
    else { endDate = new Date(); }

    const search_word = req.query.search_word || '';

    const numOfArticles = 20;
    const page = req.query.page || 1;
    if (page < 1) {
        res.json({ "message": "invalid page" });
        return;
    }
    const skipArticles = (page-1) * numOfArticles;

    endDate.setHours(23, 59, 59, 999);
    startDate.setHours(0, 0, 0, 0);
    
    Article.find()
    .where('section').equals('economy')
    .where('date').gte(startDate)
    .where('date').lte(endDate)
    .where('title').equals({$regex: new RegExp(search_word, 'i')})
    .sort('-date')
    .skip(skipArticles)
    .limit(numOfArticles)
    .then((result) => {
        res.json({"articles" : result});
    })
    .catch((err) => {
        res.json({"message" : "invalid url"});
    })
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

export default handler