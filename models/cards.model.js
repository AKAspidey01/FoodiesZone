const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    cardName: {
        type: String
    },
    cardNumber: {
        type: Number
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cvv: {
        type: Number
    },
    cardDate: {
        type: Date
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('card' , cardSchema , 'cards')