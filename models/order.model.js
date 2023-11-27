const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    restaurantId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant",
        required:true
    },
    items: {
        type: Array,
        required:true
    },
    quantity: {
        type: Number,
        //required: true
    },
    addressId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address",
        required: true
    },
    totalAmount:{
        type:Number,
        // required:true
    },
    status:{
        type:String,
        default: "Pending"
    },
    payment_id: {
        type:String
    },
    deliveryName: {
        type: String,
    },
    deliveryNumber: {
        type: String
    }
},{
    timestamps:true
})
module.exports = mongoose.model('Order', orderSchema, 'order');