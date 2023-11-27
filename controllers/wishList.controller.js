const mongoose = require('mongoose');
const wishlistModel = require('../models/wishlist.model');



exports.createWishList = async (req , res) => {
    try {
        const wish = req.body;
        wish.userId = req.userAuthId
        
        const wishId = req.body.wishId && mongoose.isValidObjectId(req.body.wishId) ? req.body.wishId : mongoose.Types.ObjectId();
        const wishData = await wishlistModel.findOneAndUpdate({_id: wishId} , wish , {new: true , upsert: true});
        res.status(200).send({
            data: wishData,
            error: null,
            status: 1,
            message: "Successfully Added To Wishlist"
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            data: null,
            error: error,
            status: 0,
            message: "Error in Adding Wishlist"
        })
    }
}


exports.getWishListData = async(req , res) => {
    try {
        const wishListData = await wishlistModel.find({userId: req.userAuthId}).populate('restaurantId itemId');
        let restArray = [];
        let itemArray = [];
        wishListData.forEach(element => {
            if(element.restaurantId){
                restArray.push(element)
            }
            if(element.itemId) {
                itemArray.push(element)
            }
        });
        res.status(200).send({
            data: {restArray , itemArray},
            error: null,
            status: 1,
            message: "Succesfully Got The Wishlist"
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            data: null,
            error: error,
            status: 0,
            message: "Error in Getting Wishlist"
        })
    }
}

exports.deleteWishList = async(req , res) => {
    try {
        const wishDelete = await wishlistModel.findOneAndDelete({_id: req.params.wishId});
        res.status(200).send({
            data: wishDelete,
            error: null,
            status: 1,
            message: "Successfully Deleted The WishList"
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            data: null,
            error: error,
            status: 0,
            message: "Error in Deleting Wishlist"
        })
    }
}