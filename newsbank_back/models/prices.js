import mongoose from 'mongoose';
const { Schema } = mongoose;

const PriceSchema = Schema({
    stock: {
        type: String,
        required: true
    },
    date: {
        type: date,
        required: true
    },
    open: {
        type: Number,
        required: true
    },
    high: {
        type: Numver,
        required: true
    },
    low: {
        type: Number,
        required: true
    },
    close: {
        type: Number,
        required: true
    },
    volume: {
        type: Number,
        required: true
    }
});

const Price = mongoose.model('Price', PriceSchema);

export default Price;