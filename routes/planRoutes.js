const express = require('express');
const router = express.Router();
const { getPlans, seedPlans } = require('../controllers/planController');

router.get('/', getPlans);
router.post('/seed', seedPlans); // We will hit this once to create data

module.exports = router;