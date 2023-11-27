const cardsModel = require("../models/cards.model");
const mongoose = require('mongoose');


exports.createUpdateCard = async (req , res) => {
    try {
        const card = req.body;
        card.userId = req.userAuthId;
        const cardIdData = req.body.cardId && mongoose.isValidObjectId(req.body.cardId) ? req.body.cardId : mongoose.Types.ObjectId();
        const cardData = await cardsModel.findOneAndUpdate({_id: cardIdData} , card , {new:true , upsert: true}).lean();
        
        let cardMessage
        if(req.body.cardId) {
            cardMessage = "Card Data Updated Successfully"
        }else {
            cardMessage = 'Card Created Successfully'
        }

        res.status(200).send({
            data: cardData,
            error: null,
            status: 1,
            message: cardMessage,
        }) 
    } catch (error) {
        console.log(error);
        res.status(400).send({
            error: error,
            data: null,
            status: 0,
            message: 'Error In Creating or Updating Card'
        })
    }
}

exports.getCardsByUserId = async (req ,res) => {
    try {
        const CardData = await cardsModel.find({userId: req.userAuthId});
        res.status(200).send({
            data: CardData,
            error: null,
            status: 0,
            message: "Got The Cards Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            error: error,
            data: null,
            status: 0,
            message: "Error In Getting Card Data"
        })
    }
}

exports.deleteCardById = async (req , res) => {
    try {
        const deletedCard = await cardsModel.findOneAndDelete({_id: req.params.cardId});
        res.status(200).send({
            data: deletedCard,
            status: 1,
            error: null,
            message: 'Successfully Deleted The Card'
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            error: error,
            data: null,
            status: 0,
            message: "Error In Deleting Card"
        })
    }
}