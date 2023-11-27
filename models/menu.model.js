const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    restaurantId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant",
        required:true
    },
    categoryId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    itemImage:{
        type: String,
        required:true,
    },
    itemName:{
        type: String,
        required:true,
    },
    itemPrice:{
        type: Number,
        required:true,
    },
    veg:{
        type:Boolean,
        required:true,
    },
    description : {
        type : String ,
        required:true,
    },
    calories: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Menu', menuSchema, 'menu');