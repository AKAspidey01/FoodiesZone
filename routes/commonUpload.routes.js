const router = require('express').Router();
const commonUploadController = require('../controllers/commonUpload.controller');
const upload = require('../middlewares/upload');


router.post('/commonUpload' , upload.single('image') , commonUploadController.createCommonUpload);

module.exports = router;