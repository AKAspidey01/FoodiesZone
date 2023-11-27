const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique:true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: "Please enter a valid email",
        },
    },
    password: {
        type: String,
        required: true,
        minlength:8
    },
    otp:{
        type: String
    },
    otpVerify:{
        type: Boolean
    },
    image:{
        type: String, 
    },
    number:{
        type: String, 
    },
    address:{
        type: String, 
    },
    dateOfBirth: {
        type: String
    },
    gender: {
        type: String,
        enum: ['Male' , 'Female']
    }
},{
    timestamps:true
})
module.exports = mongoose.model('User', userSchema, 'user');