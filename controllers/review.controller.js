const mongoose = require('mongoose');
const Review = require("../models/review.model");

exports.createOrUpdateReview = async (req, res) => {
    try {
      const review = req.body;

      const reviewId = req.body.reviewId && mongoose.isValidObjectId(req.body.reviewId) ? req.body.reviewId : mongoose.Types.ObjectId();
      const reviewCreated = await Review.findOneAndUpdate({ _id:reviewId }, review, { new: true, upsert: true })
      res.status(201).send({
          data: reviewCreated,
          error: null,
          status: 201,
          message: 'Review posted'
        })
      
    } catch (error) {
      res.status(400).send({
        data: null,
        error: error,
        status: 400,
        message: 'Error in posting the Review'
      })
    }
  };


  exports.getAll = async(req,res) =>{
    try {
        const review  = await Review.find().lean()
        const total = await Review.countDocuments();
        res.status(200).send({
            data: {Reviews: review, total:total},
            error: null,
            status: 200,
            message:"Getting Reviews Successfull"
        })   
    } catch (error) {
        res.status(400).send({
            data: null,
            error: error,
            status: 400,
            message: "Error in gettting Review"
        })  
    }
  }

  exports.getReviewsByRestaurantId = async(req,res) => {
    try {
        const review =  await Review.find({ restaurantId: req.params.restaurantId }).populate('userId').lean();
        //const form  = await Form.find()
        const total = await review.length
        res.status(200).send({
            data: {Reviews : review, total:total},
            error: null,
            status: 200,
            message:"Getting Reviews Successfull"
        })   
    } catch (error) {
        res.status(400).send({
            data:null,
            error:error,
            status:400,
            message:"Error in gettting the Reviews"
        })  
    }
  }