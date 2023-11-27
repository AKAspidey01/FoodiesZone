const mongoose = require('mongoose');
const Category = require("../models/category.model");

exports.createOrUpdateCategory = async (req, res) => {
    try {
      const categoryExist = await Category.findOne({ name: req.body.name });
        if(categoryExist){
            return res.status(409).send({
                data: categoryExist.name,
                error: "Category Exists",
                status: 409,
                message: `${categoryExist.name} category already Exists`
              })
        }
      const category = req.body;
      // if(req.file) {
      //   category.categoryImage = req.file.path
      // }
      const categoryId = req.body.categoryId && mongoose.isValidObjectId(req.body.categoryId) ? req.body.categoryId : mongoose.Types.ObjectId();
      const categoryCreated = await Category.findOneAndUpdate({ _id:categoryId }, category, { new: true, upsert: true }).lean()
     let message
      if(req.body.categoryId){
      message = "Category updated"
     }else{
      message = "Category created"
     }
     
      res.status(201).send({
          data: categoryCreated,
          error: null,
          status: 201,
          message: message
        })
      
    } catch (error) {
      res.status(400).send({
        data: null,
        error: error,
        status: 400,
        message: 'Error in creating the category'
      })
    }
  };

  exports.getAll = async(req,res) =>{
    try {
        const category  = await Category.find().lean()
        const total = await Category.countDocuments();
        res.status(200).send({
            data: {Categories : category, total:total},
            error: null,
            status: 200,
            message:"Getting Categories Successfull"
        })   
    } catch (error) {
        res.status(400).send({
            data: null,
            error: error,
            status: 400,
            message: "Error in gettting Categories"
        })  
    }
  }

  exports.deleteById = async(req,res) =>{
    try {
        const category =  await Category.findOneAndDelete({_id: req.params.categoryId });
        res.status(200).send({
            data: category,
            error: null,
            status: 200,
            message:"category Deleted Successfull"
        })   
    } catch (error) {
        res.status(400).send({
            data:null,
            error:error,
            status:400,
            message:"Error in deleting the category"
        })  
    }
  }