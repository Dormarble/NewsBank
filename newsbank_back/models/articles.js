import mongoose from 'mongoose';
const { Schema }  = mongoose;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: Object
    },
    section: {
        type: String,
        enum: ['economy', 'politics', 'society', 'culture', 'science', 'global']
    },
    resource: {
        type: String
    }
});

const Arcitle = mongoose.model('Article', ArticleSchema);

export default Arcitle;