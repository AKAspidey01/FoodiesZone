const router = require('express').Router();
const addressController = require('../controllers/address.controller');
const verifyUser = require("../middlewares/authentication")



router.post('/',   addressController.createOrUpdateAddress);

router.get('/getById/:addressId', addressController.getById);

router.get('/getAllAddress'  , verifyUser , addressController.getAllAddressByUser);

router.delete('/deleteAddress/:addressId' , addressController.deleteAddressById)


module.exports = router;