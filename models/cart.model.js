const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    itemId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Menu", 
        required:true
    },
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant",
        required:true
    },
    quantity: {
        type: Number,
        required: true
    },
    size: {
        type: String,
    },
    priceItems: {
        type: Number,
        required: true
    }

    
})
module.exports = mongoose.model('Cart', cartSchema, 'cart');