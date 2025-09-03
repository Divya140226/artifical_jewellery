const express = require('express');
const router = express.Router();
const giftcardsController = require('../controllers/giftcardsController');

router.get('/', giftcardsController.getAllGiftcards);
router.post('/add', giftcardsController.addGiftcards);
router.get('/:id', giftcardsController.getGiftcardsById);
router.put('/update/:id', giftcardsController.updateGiftcards);
router.delete('/delete/:id', giftcardsController.deleteGiftcards);

module.exports = router;