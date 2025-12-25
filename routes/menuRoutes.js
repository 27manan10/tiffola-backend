const express = require('express');
const router = express.Router();
const { getMenu, seedMenu } = require('../controllers/menuController');

router.get('/', getMenu);
router.post('/seed', seedMenu);

module.exports = router;