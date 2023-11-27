const mongoose = require("mongoose");
const cartModel = require("../models/cart.model");

exports.createOrUpdateCart = async (req, res) => {
  try {
    // console.log(req.body)
    const cartItems = await cartModel.find({ userId: req.body.userId });
    if (cartItems.length === 0) {
      const findItem = await cartModel.findOne({
        userId: req.body.userId,
        itemId: req.body.itemId,
      });
      if (findItem === null) {
        const cart = req.body;
        const cartId =
          req.body.cartId && mongoose.isValidObjectId(req.body.cartId)
            ? req.body.cartId
            : mongoose.Types.ObjectId();
        const addCartCreated = await cartModel
          .findOneAndUpdate({ _id: cartId }, cart, {
            new: true,
            upsert: true,
          })
          .populate("itemId")
          .lean();
        res.status(201).send({
          data: addCartCreated,
          error: null,
          status: 201,
          message: "item added to cart",
        });
      } else {
        const cartupdated = await cartModel
          .findOneAndUpdate(
            { itemId: req.body.itemId },
            { $inc: { quantity: parseInt(1) } },
            { new: true, upsert: true }
          )
          .populate("itemId");
        res.status(201).send({
          data: cartupdated,
          error: null,
          status: 201,
          message: "item updated",
        });
      }
    } else {
      const findSameRest = await cartModel.find({
        userId: req.body.userId,
        restaurantId: req.body.restaurantId,
      });
      if (findSameRest.length > 0) {
        const findItem = await cartModel.findOne({
          userId: req.body.userId,
          itemId: req.body.itemId,
        });
        if (findItem === null) {
          const cart = req.body;
          const cartId =
            req.body.cartId && mongoose.isValidObjectId(req.body.cartId)
              ? req.body.cartId
              : mongoose.Types.ObjectId();
          const addCartCreated = await cartModel
            .findOneAndUpdate({ _id: cartId }, cart, {
              new: true,
              upsert: true,
            })
            .populate("itemId")
            .lean();
          res.status(201).send({
            data: addCartCreated,
            error: null,
            status: 201,
            message: "item added to cart",
          });
        } else {
          const cartupdated = await cartModel
            .findOneAndUpdate(
              { itemId: req.body.itemId },
              { $inc: { quantity: parseInt(1) } },
              { new: true, upsert: true }
            )
            .populate("itemId");
          res.status(201).send({
            data: cartupdated,
            error: null,
            status: 201,
            message: "item updated",
          });
        }
      } else {
        res.status(400).send({
          data: null,
          status: 1,
          error: null,
          message: "Replace Cart Item",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      data: null,
      error: error,
      status: 400,
      message: "Error in item adding to the cart",
    });
  }
};

exports.cartQtyReducer = async (req, res) => {
  try {
    const quantityStable = await cartModel.findOne({ _id: req.body.cartId });
    if (quantityStable.quantity == 1) {
      res.status(201).send({
        data: quantityStable,
        error: null,
        status: 1,
        message: "Quantity will not reduce to 0",
      });
    } else {
      const cartupdated = await cartModel.findOneAndUpdate(
        { _id: req.body.cartId },
        { $inc: { quantity: parseInt(-1) } },
        { new: true, upsert: true }
      );
      res.status(201).send({
        data: cartupdated,
        error: null,
        status: 201,
        message: "item quantity reduced",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      data: null,
      error: error,
      status: 400,
      message: "Error in item reducing cart quantity",
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const cartItems = await cartModel.find().populate("itemId");
    const total = await cartModel.countDocuments();
    res.status(200).send({
      data: { Cart: cartItems, total: total },
      error: null,
      status: 200,
      message: "Getting Cart Items Successfull",
    });
  } catch (error) {
    res.status(400).send({
      data: null,
      error: error,
      status: 400,
      message: "Error in gettting Cart Items",
    });
  }
};

exports.getCartByUserId = async (req, res) => {
  try {
    let totalQty = 0;
    let subTotal = 0;
    const userCartData = await cartModel
      .find({ userId: req.userAuthId })
      .populate("itemId");
    console.log(req.userAuthId);
    const cartCoutitems = await cartModel.countDocuments();
    userCartData.forEach((element) => {
      totalQty += element?.quantity;
      subTotal += element?.quantity * element?.itemId?.itemPrice;
    });
    res.status(200).send({
      data: userCartData,
      totalItems: totalQty,
      subPirce: subTotal,
      totalDocs: cartCoutitems,
      error: null,
      status: 1,
      message: "Succesfully got the cart data by userid",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      data: null,
      error: error,
      status: 0,
      message: "Error in getting Getting Cart Items",
    });
  }
};

exports.getCartByRestaurantId = async (req, res) => {
  try {
    const items = await cartModel
      .find({ userId: req.query.userId, restaurantId: req.query.restaurantId })
      .populate("itemId")
      .lean();
    res.status(200).send({
      data: { Cart: items },
      error: null,
      status: 200,
      message: "Getting Cart Successfull",
    });
  } catch (error) {
    res.status(400).send({
      data: null,
      error: error,
      status: 400,
      message: "Error in gettting the Cart",
    });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const item = await cartModel.findOneAndDelete({ _id: req.params.cartId });
    res.status(200).send({
      data: item,
      error: null,
      status: 200,
      message: "item Deleted Successfull",
    });
  } catch (error) {
    res.status(400).send({
      data: null,
      error: error,
      status: 400,
      message: "Error in deleting the item",
    });
  }
};

exports.replaceCartItems = async (req, res) => {
  try {
    const deleteCart = await cartModel.deleteMany({ userId: req.body.userId });
    if (deleteCart) {
      const cart = req.body;
      const cartId =
        req.body.cartId && mongoose.isValidObjectId(req.body.cartId)
          ? req.body.cartId
          : mongoose.Types.ObjectId();
      const addCartCreated = await cartModel.findOneAndUpdate(
        { _id: cartId },
        cart,
        {
          new: true,
          upsert: true,
        }
      );
      res.status(201).send({
        data:{addCartCreated},
        error:null,
        status:1,
        message:"adding cart successfully"
      })
    }
  } catch (error) {
    res.status(400).send({
        data:null,
        error:error,
        status:0,
        message:"Errro in Adding cart"
      })
  }
};
