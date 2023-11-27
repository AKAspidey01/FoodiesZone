const mongoose = require("mongoose");

const commonUploadShema = new mongoose.Schema({
    image: {
        type: String
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('CommonUpload' , commonUploadShema , 'CommonUploads')