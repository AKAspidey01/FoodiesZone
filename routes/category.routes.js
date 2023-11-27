const router = require('express').Router();
const categoryController = require('../controllers/category.controller');
// const uploads = require("../middlewares/upload")

router.post('/' , categoryController.createOrUpdateCategory);
router.get('/',  categoryController.getAll);
router.delete('/:categoryId', categoryController.deleteById);


module.exports = router;