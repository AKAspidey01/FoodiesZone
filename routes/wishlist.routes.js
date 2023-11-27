const router = require('express').Router();
const verifyUser = require('../middlewares/authentication')
const wishListController = require('../controllers/wishList.controller')


router.post('/createWish' , verifyUser , wishListController.createWishList);

router.get('/getWish' , verifyUser , wishListController.getWishListData);

router.delete('/deleteWish/:wishId' , verifyUser , wishListController.deleteWishList);


module.exports = router
