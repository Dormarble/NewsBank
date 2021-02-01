import mongoose from 'mongoose';

import Articles from '../../../../models/articles.js'

function handler(req, res) {
    const articleId = req.params.id;

    Articles.findById(articleId)
    .then((result) => {
        res.json(result);
    })
}

export default handler