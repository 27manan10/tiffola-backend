const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// 1. REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    if (!name || !phone || !password) return res.status(400).json({ message: 'Please add all fields' });

    const userExists = await User.findOne({ phone });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, phone, password: hashedPassword });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        phone: user.phone,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// 2. LOGIN
const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        phone: user.phone,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// 3. GET ME
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      id: user._id,
      name: user.name,
      phone: user.phone,
      addresses: user.addresses || []
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// 4. ADD ADDRESS
const addAddress = async (req, res) => {
  try {
    const { label, fullAddress } = req.body;
    if (!label || !fullAddress) return res.status(400).json({ message: 'Please provide label and address' });

    const user = await User.findById(req.user._id);
    user.addresses.push({ label, fullAddress });
    await user.save();

    res.status(200).json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// 5. UPDATE PROFILE (NEW!)
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      // Update name if provided
      user.name = req.body.name || user.name;
      
      // Save
      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        phone: updatedUser.phone,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = { registerUser, loginUser, getMe, addAddress, updateProfile };
