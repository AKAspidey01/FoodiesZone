const router = require('express').Router();
const orderController = require('../controllers/order.controller');
const verifyUser = require("../middlewares/authentication")

router.post('/', verifyUser,  orderController.createOrder);
router.get('/',  orderController.getAll);
router.get('/rest', orderController.getOrderByRestaurantId);
router.get('/orderById/:orderId' , orderController.getOrderbyId)
router.delete('/:orderId', orderController.deleteById);
router.post('/updateOrder' , orderController.updateOrderStatus)
router.get('/getbyUser' , verifyUser , orderController.getOrdersByUserAuth)


module.exports = router;