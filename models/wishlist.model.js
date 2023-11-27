const mongoose = require('mongoose');


const wishlistSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Types.ObjectId,
        ref: "Restaurant",
    },
    itemId: {
        type: mongoose.Types.ObjectId,
        ref: "Menu"
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("wishlist" , wishlistSchema , "wishLists")