const mongoose = require('mongoose');
const Menu = require("../models/menu.model");
const wishlistModel = require('../models/wishlist.model');

exports.createOrUpdateMenu = async (req, res) => {
  try {
    const menu = req.body;
    if (req.file) {
      menu.itemImage = req.file.destination + req.file.filename
    }

    const menuId = req.body.menuId && mongoose.isValidObjectId(req.body.menuId) ? req.body.menuId : mongoose.Types.ObjectId();
    const menuCreated = await Menu.findOneAndUpdate({ _id: menuId }, menu, { new: true, upsert: true }).lean()
    let message
    if (req.body.menuId) {
      message = "Menu Item updated"
    } else {
      message = "Menu Item created"
    }
    res.status(201).send({
      data: menuCreated,
      error: null,
      status: 201,
      message: message
    })

  } catch (error) {
    res.status(400).send({
      data: null,
      error: error,
      status: 400,
      message: 'Error in creating the Menu Item'
    })
  }
};

exports.getMenuByRestaurantId = async (req, res) => {
  try {
    const menu = await Menu.find({ restaurantId: req.params.restaurantId }).lean();
    const wishLister = await wishlistModel.find({userId: req.userAuthId})
    menu.map((element) => {
      const foundItem = wishLister.find(item => item.restaurantId?.toString() === element._id?.toString());
      if(foundItem){
        element.wishList = true;
        element.wishId = foundItem._id
      }else {
        element.wishList = false
      }
    })
    const restaurant = await Menu.findOne({ restaurantId: req.params.restaurantId }).populate("restaurantId").lean()
    const total = menu.length
    res.status(200).send({
      data:  menu ,
      error: null,
      status: 200,
      message: "Getting Menu Successfull"
    })
  } catch (error) {
    res.status(400).send({
      data: null,
      error: error,
      status: 400,
      message: "Error in gettting the Menu"
    })
  }
}

exports.getAll = async(req,res) =>{
  try {
      const restaurant  = await Menu.find().lean()
      const total = await Menu.countDocuments();
      res.status(200).send({
          data: {Menu : restaurant, total:total},
          error: null,
          status: 200,
          message:"Getting Restaurants Successfull"
      })   
    } catch (error) {
      res.status(400).send({
        data: null,
        error: error,
        status: 400,
        message: "Error in gettting the Menu"
      })
    }
}

exports.deleteById = async (req, res) => {
  try {
    const item = await Menu.findOneAndDelete({ _id: req.params.itemId });
    res.status(200).send({
      data: item,
      error: null,
      status: 200,
      message: "item Deleted Successfull"
    })

  } catch (error) {
    res.status(400).send({
      data: null,
      error: error,
      status: 400,
      message: "Error in deleting the item"
    })
  }
}

exports.update_despfield = async (req, res) => {
  try {
    const menu = await Menu.find().lean();
    for (let i = 0; i < menu.length; i++) {
      const update_field = await Menu.findOneAndUpdate({ _id: menu[i]._id }, { description: "New hyderabadi style Biryani rice served with signature chicken fry & spicy gravy [serves 2]" },
        { new: true })
    }
    res.status(200).send({
      status: 200,
      message: "Updated Menu Successfull"
    })
  } catch (error) {
    res.status(400).send({
      data: null,
      error: error,
      status: 400,
      message: "Error in gettting the Menu"
    })
  }
}
