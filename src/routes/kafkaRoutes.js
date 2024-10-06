const express = require('express');
const router = express.Router();
const pubController = require('../controllers/pubController');
const subController = require('../controllers/subController');

router.post('/publish', pubController.publishMessage);
router.post('/consume', subController.consumeMessages);

module.exports = router;
