const router = require('express').Router();
const userController = require('../controllers/user.controller');
const fileUpload = require("../middlewares/upload")

router.post('/signup',  userController.userSignUp);
router.post('/signin',  userController.userSignIn);
// router.post('/profile',  fileUpload.single('image') , userController.createOrUpdateUser);
router.post('/profile', userController.createOrUpdateUser);
router.get('/',  userController.getAll);
router.post('/otp',  userController.createUser);
router.get('/:userId', userController.getById);

module.exports = router;