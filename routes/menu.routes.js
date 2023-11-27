const router = require('express').Router();
const menuController = require('../controllers/menu.controller');
const fileUpload = require("../middlewares/upload");
const veifyUser = require('../middlewares/authentication')

router.post('/', fileUpload.single('itemImage'), menuController.createOrUpdateMenu);
router.get('/:restaurantId' , menuController.getMenuByRestaurantId);
router.delete('/:itemId', menuController.deleteById);
router.post("/update",menuController.update_despfield)


module.exports = router;    