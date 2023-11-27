const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image:{
        type: String, 
    },
    description:{
        type: String,   
    },
    latitude:{
        type: String
    },
    longitude:{
        type: String
    },
    timings:{
        type: String,
    },
    url:{
        type: String,  
    },
    address:{
        type: String, 
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    type: {
        type: String,
        enum: ['Veg' , 'Non-veg']
    },
    kms: {
        type: String,
    },
    rating: {
        type:String,
    },
    popularity: {
        type: Boolean,
        default: false
    },
    category: {
        type: Array,
        required: true,
    },
    offer: {
        type: Boolean,
        default: false
    },
    offerPercent: {
        type: String,
        
    }
    
})
module.exports = mongoose.model('Restaurant', restaurantSchema, 'restaurant');
