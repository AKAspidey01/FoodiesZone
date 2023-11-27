const mongoose = require('mongoose');
const commonUploadModel = require('../models/common-upload.model');


exports.createCommonUpload  = async (req , res) => {
    try {
        const common = req.body;
        console.log(req.file,"yjyutuyt")
        if (req.file) {
            common.image = req.file.destination + req.file.filename
        }
        const commonId = req.body.commonId && mongoose.isValidObjectId(req.body.commonId) ? req.body.commonId : mongoose.Types.ObjectId();
        const commonData = await commonUploadModel.findOneAndUpdate({_id: commonId} , common , {new: true , upsert: true});
        res.status(200).send({
            data: commonData,
            error: null,
            status: 1,
            message: "Uploaded File Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            data: null,
            error: error,
            status: 0,
            message: "Error In Uploading File"
        })
    }
}