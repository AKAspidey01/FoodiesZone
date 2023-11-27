const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required :true,
        unique : true,
        enum : ["Biryani" , "Pizza" , "Chicken" , "Burger" , "Ramen" , "Ice Cream"]        
    },
    // categoryImage: {
    //     type: String,
    //     requied: true,   
    // }   
}
)

module.exports = mongoose.model('Category' , categorySchema , 'category');