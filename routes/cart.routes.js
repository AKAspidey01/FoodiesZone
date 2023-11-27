const router = require('express').Router();
const cartController = require('../controllers/cart.controller');
const verifyUser = require("../middlewares/authentication")

router.post('/', cartController.createOrUpdateCart);
router.get('/',  cartController.getAll);
router.get('/rest', cartController.getCartByRestaurantId);
// router.get('/getcartByuserId/:userId' , cartController.getCartByUserId)
router.get('/getcartByuserId' , verifyUser , cartController.getCartByUserId)
router.delete('/:cartId' , cartController.deleteById);
router.post('/cartQtyReduce' , cartController.cartQtyReducer );
router.post('/replaceCart', cartController.replaceCartItems)

module.exports = router;