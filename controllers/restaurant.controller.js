const mongoose = require('mongoose');
const restaurantModel = require('../models/restaurant.model');
const categoryModel = require('../models/category.model');
const wishlistModel = require('../models/wishlist.model');

exports.createOrUpdateRestaurant = async (req, res) => {
    try {
      const restaurant = req.body;
      if (req.file) {
        restaurant.image = req.file.destination + req.file.filename
      }
      const restaurantId = req.body.restaurantId && mongoose.isValidObjectId(req.body.restaurantId) ? req.body.restaurantId : mongoose.Types.ObjectId();
      const restaurantCreated = await restaurantModel.findOneAndUpdate({ _id: restaurantId }, restaurant, { new: true, upsert: true })
      res.status(201).send({
          data: restaurantCreated,
          error: null,
          status: 201,
          message: 'restaurant created'
        })
      
    } catch (error) {
      res.status(400).send({
        data: null,
        error: error,
        status: 400,
        message: 'Error in creating the Restaurant'
      })
    }
};

exports.getRestByCategoryId = async (req , res) => {
    try {
      // const categoryId = await categoryModel.findOne({_id: categoryRest[0]?.categoryId})
      const categoryRest = await restaurantModel.find({category: req.body.category});
      return res.status(200).send({
        data: categoryRest,
        error: null,
        status: 1,
        message: 'Successfully Got The Restaurants By Category Id'
      })
    } catch (error) {
      console.log(error);
      res.status(400).send({  
        data: null,
        error: error,
        status: 400,
        message: 'Error in Getting the Restaurant By Category Id'
      })
    }
}

exports.getVegRestaurants = async (req , res) => {
  try {
    const vegRestData = await restaurantModel.find({type:"Veg"});
    res.status(200).send({
      data: vegRestData,
      error: null,
      status: 1,
      message: "Successfully Got the Rests veg"
    })
  } catch (error) {
    console(error)
    res.status(400).send({
      error: error,
      data: null,
      status: 0,
      message: "Error in getting veg Rests"
    })
  }
}

exports.getNonVegRestaurants = async (req , res) => {
  try {
    const nvegRestData = await restaurantModel.find({type:"Non-veg"});
    res.status(200).send({
      data: nvegRestData,
      error: null,
      status: 1,
      message: "Successfully Got the Rests nveg"
    })
  } catch (error) {
    console(error)
    res.status(400).send({
      error: error,
      data: null,
      status: 0,
      message: "Error in getting nveg Rests"
    })
  }
}


  

  exports.getAll = async(req,res) =>{
    try {
        const restaurant  = await restaurantModel.find().lean().populate('categoryId');
        const wishLister = await wishlistModel.find({userId: req.userAuthId})
        restaurant.map((element) => {
          const foundItem = wishLister.find(item => item.restaurantId?.toString() === element._id?.toString());
          if(foundItem){
            element.wishList = true;
            element.wishId = foundItem._id
          }else {
            element.wishList = false
          }
        })
         res.status(200).send({
          data: restaurant,
          error: null,
          status: 200,
          message:"Getting Restaurants Successfull"
        })           
    } catch (error) {
      console.log(error
        )
        res.status(400).send({
            data: null,
            error: error,
            status: 400,
            message: "Error in getting Restaurants"
        })  
    }
  }

  
  exports.getById = async(req,res) =>{

    try {
        const restaurant =  await restaurantModel.findOne({ _id: req.params.restaurantId }).lean();
        const wishLister = await wishlistModel.find({userId: req.userAuthId , restaurantId: restaurant._id})
          if(wishLister){
            restaurant.wishList = true;
          }else {
            restaurant.wishList = false
          }
          console.log(foundItem)
        res.status(200).send({
            data: restaurant ,
            error: null,
            status: 200,
            message:"Getting Restaurant Successfull"
        })   
    } catch (error) {
        res.status(400).send({
            data:null,
            error:error,
            status: 400,
            message:"Error in gettting Restaurant"
        })  
    }
  }



//   exports.searchAll = async(req,res)=>{
//     try {
        
       
//         console.log("query", req)
//         console.log("query", req.query)
        
//         const data = [
//             { $match: { name: req.query.text } }
//             // {
//             //     $addFields:{
//             //         convertedId1:{$toString:"$Restaurant.name"},
//             //         convertedId2:{$toString:"$Restaurant.address" }
//             //     }
//             // },
//             // {
//             //     $lookup:{
//             //         from:"restaurant",
//             //         localField:"convertedId1",
//             //         foreignField:"_id",
//             //         as:"name"
//             //     }
//             // },
//             // {
//             //     $lookup:{
//             //         from:"restaurant",
//             //         localField:"convertedId2",
//             //         foreignField:"_id",
//             //         as:"address"
//             //     }
//             // },
//             // {
//             //     $project:{
//             //         name:"$name",
//             //         address:"$address",
//             //         categoryName:"$category.categoryName"
//             //     }
//             // },
//             // {
//             //     $match:{
//             //         $or:[
//             //             { 'convertedId1':{$regex:'.*'+req.query.text+'.*',$options:"i" } },
//             //             { 'convertedId2':{$regex:'.*'+req.query.text+'.*',$options:"i" } }  
//             //         ]
//             //     }
//             // },
//             // {
//             //     $unwind: { path: "$name", preserveNullAndEmptyArrays: true },
//             // },
//             // {
//             //     $unwind: { path: "$address", preserveNullAndEmptyArrays: true },
//             // }
//         ]


        
//       // const searching = await Restaurant.aggregate(data);
//       // const search_text = searching.slice((pageNumber - 1) * pageSize, pageNumber * pageSize).sort();
//       // const count = search_text.length
//         res.status(200).send({
//             //data:{ products: searching , total: count},
//             status:1,
//             error:null,
//             message:"Getting Search field"
//         })
//     } catch (error) {
//         res.status(400).send({
//             data:null,
//             error:error,
//             status:0,
//             message:" Error in Searching"
//         }) 
//     }
// };


exports.search = async(req,res) =>{
    try {

        console.log(req)

        const restaurant  = await restaurantModel.find().lean()
        const total = await restaurantModel.countDocuments();
        res.status(200).send({
            data: {Restaurants : restaurant, total: total},
            error: null,
            status: 200,
            message:"Getting Restaurants Successfull"
        })   
    } catch (error) {
        res.status(400).send({
            data: null,
            error: error,
            status: 400,
            message: "Error in getting Restaurants"
        })  
    }
  }