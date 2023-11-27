const mongoose = require('mongoose');
const Address = require("../models/address.model");
const addressModel = require('../models/address.model');

exports.createOrUpdateAddress = async (req, res) => {
    try {
      const address = req.body;
      const addressId = req.body.addressId && mongoose.isValidObjectId(req.body.addressId) ? req.body.addressId : mongoose.Types.ObjectId();
      const addressCreated = await Address.findOneAndUpdate({ _id:addressId }, address, { new: true, upsert: true })
      res.status(201).send({
          data: addressCreated,
          error: null,
          status: 201,
          message:'Address submited'
        })
      
    } catch (error) {
      res.status(400).send({
        data: null,
        error: error,
        status: 400,
        message:'Error in submitting the Address'
      })
    }
  };

  exports.getById = async(req,res) =>{
    try {
        const id =  await Address.findOne({ _id: req.params.addressId }).lean();
        //const form  = await Form.find()
        res.status(200).send({
            data: {Address : id},
            error: null,
            status: 200,
            message:"Getting Menu Successfull"
        })   
    } catch (error) {
        res.status(400).send({
            data:null,
            error:error,
            status:400,
            message:"Error in gettting the Menu"
        })  
    }
  }


  exports.getAllAddressByUser = async(req , res) => {
    try {
      const addresses = await addressModel.find({userId: req.userAuthId})
      res.status(200).send({
        data: addresses,
        error: null,
        status: 1,
        message: "Got The Address SuccessFully"
      })
    } catch (error) {
        console.log(error)
        res.status(400).send({
          data: null,
          error: error,
          status: 0,
          message: "Error in Getting The Address"
        })
    }
  }



  exports.deleteAddressById = async(req , res) =>{
    try {
        const deletedData =  await Address.findOneAndDelete({ _id: req.params.addressId });
        //const form  = await Form.find()
        res.status(200).send({
            data: deletedData,
            error: null,
            status: 1,
            message:"Deleted Address Successfully"
        })   
    } catch (error) {
        res.status(400).send({
            data:null,
            error: error,
            status: 0,
            message:"Error in Deleting the Address"
        })  
    }
  }