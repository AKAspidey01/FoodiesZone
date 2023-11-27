const mongoose = require('mongoose');
const User = require("../models/user.model");
var passwordValidator = require('password-validator');
var schema = new passwordValidator();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const sendEmail = require("../mail/sendEmail")
const data = require("../mail")

schema.is().min(8).is().max(25).has().uppercase().has().lowercase().has().digits(1)

const otpGenerator = require('otp-generator')

exports.userSignUp = async (req, res) => {
    try {
        const isUserExist = await User.findOne({ email: req.body.email }).lean();
        
        if(isUserExist){
            return res.status(409).send({
                data: isUserExist.email,
                error: "Email Exists",
                status: 409,
                message: 'User with this mail already Exists'
              })
        }
        if (!schema.validate(req.body.password)) {
            return res.status(404).send({
              data: null,
              error: schema.validate(req.body.password, { details: true }),
              status: 404,
              message: 'Enter Valid Password'
            })
          }


          const random_number = otpGenerator.generate(4, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
          });

          
    const user = new User({
        email: req.body.email,
        otp: random_number,
        otpVerify: false,
        name: req.body.name,
        number: req.body.number,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
      } )
      user.password = await bcrypt.hash(req.body.password, 10);

      isUserCreated = await user.save()

      //const update_otp = await userModel.findOneAndUpdate({email: req.body.email},{otp: random_number},{new: true});

      sendEmail({
        html: data.VERIFYEMAIL.html(isUserCreated.otp),
        subject: `OTP`,
        email: isUserCreated.email,
      });

      res.status(201).send({
          data: {user: isUserCreated},
          error: null,
          status: 201,
          message: 'otp send to your email'
        })
      
    } catch (error) {
      res.status(400).send({
        data: null,
        error: error,
        status: 400,
        message: 'Error in creating the User'
      })
    }
};


  exports.createUser = async (req, res)=>{
    try{
      const isUserExist = await User.findOne({ email: req.body.email });
      if(isUserExist.otp == req.body.otp){
        const userCreated = await User.findOneAndUpdate({ email: req.body.email}, {otpVerify:true }, { new: true, upsert: true })
        res.status(201).send({
          data: {user: userCreated },
          error: null,
          status: 201,
          message: 'User created successful'
        })
      } else{
        res.status(400).send({
          data: null,
          error: 'incorrect otp',
          status: 400,
          message: 'incorrect otp'
        })
      }

    }catch(error){
      res.status(400).send({
        data: null,
        error: error,
        status: 400,
        message: 'Email dosent exist'
      })
    }
  }

  exports.userSignIn = async (req, res) => {
    try {
      const isUserExist = await User.findOne({ email: req.body.email });
      if (!isUserExist) {
        return res.status(409).send({
          data: null,
          error: "Email Doesn't Exists",
          status: 409, 
          message: "User with mail Doesn't Exists"
        })
      }
      const isPasswordMatches = await bcrypt.compare(req.body.password, isUserExist.password);
  
      if (!isPasswordMatches) {
        return res.status(404).send({
          data: null,
          error: 'Incorrect Password',
          status: 404,
          message: 'Entered Incorrect Password'
        })
      }
      const token = jwt.sign({ authId: isUserExist._id }, process.env.JWT_TOKEN_KEY);

      if(isUserExist.otpVerify===true){
        res.status(200).send({
          data: { userId:isUserExist._id, email: isUserExist.email, token: token },
          error: null,
          status: 200,
          message: 'Signin Succuessfull'
        })
        
      }
      else{
        const random_number = otpGenerator.generate(4, {
          upperCaseAlphabets: false,
          specialChars: false,
          lowerCaseAlphabets: false,
        });


        sendEmail({
          html: data.VERIFYEMAIL.html(random_number),
          subject: `Eat Zone OTP`,
          email: "lehark@vinutnaa.com",
        });

        const userCreated = await User.findOneAndUpdate({ email: req.body.email}, {otp: random_number}, { new: true, upsert: true })

        res.status(200).send({
          data: userCreated ,
          error: null,
          status: 200,
          message: 'OTP sent to email'
        })

      }
    } catch (error) {
      res.status(404).send({
        data: null,
        error: error,
        status: 404,
        message:'Error in Signing the User'
      })
    }
  };

  exports.createOrUpdateUser = async (req, res) => {
    try {
      // console.log(req.file)
      const user = req.body;
      // if (req.file) {
      //   user.image = req.file.destination + req.file.filename
      // }
       
      const userId = req.body.userId && mongoose.isValidObjectId(req.body.userId) ? req.body.userId : mongoose.Types.ObjectId();
      const userCreated = await User.findOneAndUpdate({ _id: userId }, user, { new: true, upsert: true }).lean()
      res.status(201).send({
          data: userCreated,
          error: null,
          status: 201,
          message: 'User updated'
        })
      
    } catch (error) {
      res.status(400).send({
        data: null,
        error: error,
        status: 400,
        message: 'Error in updating the User'
      })
    }
  };

  exports.getAll = async(req,res) =>{
    try {
        const users  = await User.find().lean()
        const total = await User.countDocuments();
        res.status(200).send({
            data: {Users : users, total:total},
            error: null,
            status: 200,
            message:"Getting Users Successfull"
        })   
    } catch (error) {
        res.status(400).send({
            data: null,
            error: error,
            status: 400,
            message: "Error in gettting Users"
        })  
    }
  }

  exports.getById = async(req,res) =>{
    try {
        const user =  await User.findOne({ _id: req.params.userId }).lean();
        res.status(200).send({
            data: user,
            error: null,
            status: 200,
            message:"Getting User Successfull"
        })   
    } catch (error) {
        res.status(400).send({
            data: null,
            error: error,
            status: 400,
            message:"Error in gettting User"
        })  
    }
  }