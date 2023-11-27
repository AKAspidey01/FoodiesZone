const router = require('express').Router();
const cardController = require('../controllers/cards.controller');
const verifyUser = require('../middlewares/authentication')


router.post('/createUpdate' , verifyUser , cardController.createUpdateCard);

router.get('/getCardByAuthId' , verifyUser , cardController.getCardsByUserId);

router.delete('/delCardById' , verifyUser , cardController.deleteCardById);

module.exports = router