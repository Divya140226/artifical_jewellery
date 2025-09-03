const express = require('express');
const router = express.Router();
const featuredinController = require('../controllers/featuredinController');

router.get('/', featuredinController.getAllFeaturedin);
router.post('/add', featuredinController.addFeaturedin);
router.get('/:id', featuredinController.getFeaturedinById);
router.put('/update/:id', featuredinController.updateFeaturedin);
router.delete('/delete/:id', featuredinController.deleteFeaturedin);

module.exports = router;