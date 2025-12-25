const express = require('express');
const router = express.Router();
const { addOrder, getMyOrders, toggleSkipDate } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addOrder);
router.get('/myorders', protect, getMyOrders);
router.put('/skip', protect, toggleSkipDate); // <--- NEW ROUTE

module.exports = router;