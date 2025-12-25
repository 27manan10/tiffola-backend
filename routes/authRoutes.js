const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, addAddress, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.post('/address', protect, addAddress);
router.put('/profile', protect, updateProfile); // <--- NEW ROUTE

module.exports = router;