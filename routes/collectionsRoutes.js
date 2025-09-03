const express = require('express');
const router = express.Router();
const collectionsController = require('../controllers/collectionsController');
router.get('/', collectionsController.getAllCollections);

router.post('/add', collectionsController.addCollections);
router.get('/:id', collectionsController.getCollectionsById);
router.put('/update/:id', collectionsController.updateCollections);
router.delete('/delete/:id', collectionsController.deleteCollections);

module.exports = router;