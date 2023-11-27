const router = require('express').Router();
const restaurantController = require('../controllers/restaurant.controller');
const fileUpload = require("../middlewares/upload");
const verifyUser = require('../middlewares/authentication')

router.post('/', fileUpload.single('image'), restaurantController.createOrUpdateRestaurant);
router.get('/' , restaurantController.getAll)
router.get('/:restaurantId', verifyUser ,restaurantController.getById);
router.get("/searchAll",restaurantController.search);
// router.get('/getRestCate/:categoryId' , restaurantController.getRestByCategoryId)
router.post('/getRestCate' , restaurantController.getRestByCategoryId)
router.get('/getByVeg' , restaurantController.getVegRestaurants);



module.exports = router;