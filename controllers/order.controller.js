const mongoose = require('mongoose');
const Order = require("../models/order.model");
const Cart = require("../models/cart.model");

exports.createOrder = async (req, res) => {
    try {
      if(req.body.addressId) {
        var data = [];
        var subTotal = 0;
        var total = 0;
        const cart = await Cart.find({ userId: req.body.userId, restaurantId: req.body.restaurantId }).populate("itemId").lean();        
        console.log(cart,"cart")
        for (let i = 0; i < cart.length; i++) {
          const product_data = {
            itemId: cart[i].itemId,
            quantity: cart[i].quantity,
            };
            console.log(product_data, "product_data");
          data.push(product_data);
          subTotal = parseFloat(subTotal) + parseFloat(cart[i].quantity) * parseFloat(cart[i].itemId.itemPrice);
            console.log(subTotal,"sub_total")
        }
        const order = await req.body;
        order.items = data;
        order.totalAmount = subTotal;
        order.status = "pending";
        const orderId = req.body.orderId && mongoose.isValidObjectId(req.body.orderId) ? req.body.orderId : mongoose.Types.ObjectId();
        const orderCreated = await Order.findOneAndUpdate({ _id: orderId }, order, { new: true, upsert: true });
        if (orderCreated) {
          const addCartCreated = await Cart.deleteMany({ userId: req.body.userId, restaurantId: req.body.restaurantId });
          console.log(addCartCreated, "addCartCreated");
        }
        res.status(200).send({
          data: { order: orderCreated },
          error: null,
          status: 200,
          message: "order successfull",
        });
      }
      else {
       res.status(404).send({
        data: null,
        error: "error",
        status: 404,
        message: "Some Feilds Are Missing"
       })
      }
    } catch (error) {
      res.status(400).send({
        data: null,
        error: error,
        status: 400,
        message: "error when ordering",
      });
    }
};



exports.updateOrderStatus = async (req , res) => {
  try {
    const orderData = req.body
    const orderStatus = await Order.findOneAndUpdate({_id: req.body.orderId} , orderData , { new : true });
    res.status(200).send({
      data: orderStatus,
      error: null,
      status: 200,
      message: "Successfully Updated Order",
    });
  } catch (error) {
    console.log(error)
    res.status(400).send({
      data: null,
      error: error,
      status: 400,
      message: "Error In Updating Order Status",
    });
  }
}

  exports.getAll = async(req,res) =>{
    try {
        const order  = await Order.find().lean().populate('restaurantId')
        const total = await Order.countDocuments();
        res.status(200).send({
            data: {Order : order, total:total},
            error: null,
            status: 200,
            message:"Getting Order Successfull"
        })   
    } catch (error) {
        res.status(400).send({
            data: null,
            error: error,
            status: 400,
            message: "Error in gettting orders"
        })  
    }
  }


  exports.getOrderbyId = async (req , res) => {
    try {
      const orderData = await Order.findOne({_id: req.params.orderId}).populate('restaurantId')
      res.status(200).send({
        data: orderData,
        error: null,
        status: 1,
        message: "Successfully Got Order By Id"
      })
    } catch (error) {
      console.log(error)
      res.status(400).send({
        data: null,
        error: error,
        status: 0,
        message: "Error in Getting Order By Id"
      })
    }
  }

  exports.deleteById = async(req,res) =>{
    try {
        const order =  await Order.findOneAndDelete({ _id: req.params.orderId });
        res.status(200).send({
            data: order,
            error: null,
            status: 200,
            message:"order Deleted Successfull"
        })   
    } catch (error) {
        res.status(400).send({
            data:null,
            error:error,
            status:400,
            message:"Error in deleting the order"
        })  
    }
  }

  exports.getOrderByRestaurantId = async(req,res) =>{
    try {
        const items =  await Order.find({ userId: req.query.userId ,restaurantId: req.query.restaurantId}).populate("addressId").lean();
        res.status(200).send({
            data: {Order : items},
            error: null,
            status: 200,
            message:"Getting Order Successfull"
        })   
    } catch (error) {
        res.status(400).send({
            data:null,
            error: error,
            status: 400,
            message:"Error in gettting the Order"
        })  
    }
  }

  exports.getOrdersByUserAuth = async (req , res) => {
      try {
        const orderData = await Order.find({userId: req.userAuthId}).populate('restaurantId');
        res.status(200).send({
          data: orderData,
          error: null,
          status: 1,
          message: "Orders Got Successfully"
        })
      } catch (error) {
        console.log(error)
        res.status(400).send({
          data: null,
          error: error,
          status: 0,
          message: "Error In Getting Orders"
        })
      }
  }