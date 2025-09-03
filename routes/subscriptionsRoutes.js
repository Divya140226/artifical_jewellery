const express = require('express');
const router = express.Router();
const subscriptionsController = require('../controllers/subscriptionsController');

router.get('/', subscriptionsController.getAllSubscriptions);
router.post('/add', subscriptionsController.addSubscriptions);
router.get('/:id', subscriptionsController.getSubscriptionsById);
router.put('/update/:id', subscriptionsController.updateSubscriptions);
router.delete('/delete/:id', subscriptionsController.deleteSubscriptions);

module.exports = router;