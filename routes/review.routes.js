const router = require('express').Router();
const reviewController = require('../controllers/review.controller');
const verifyUser = require("../middlewares/authentication")


router.post('/', verifyUser, reviewController.createOrUpdateReview);
router.get('/',  reviewController.getAll);
router.get('/:restaurantId', reviewController.getReviewsByRestaurantId);

module.exports = router;