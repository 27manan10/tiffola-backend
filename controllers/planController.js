const Plan = require('../models/Plan');

// @desc    Get all plans
// @route   GET /api/plans
// @access  Public
const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find({});
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Seed initial plans (Run this once to populate DB)
// @route   POST /api/plans/seed
const seedPlans = async (req, res) => {
  const initialPlans = [
    {
      name: 'Standard Dabba',
      price: 2500,
      duration: 'Monthly',
      type: 'KITCHEN',
      color: '#FFF3CD',
      // Dal Roti Image
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
      features: ['5 Roti', 'Dal & Rice', '1 Sabzi', 'Buttermilk'],
      description: 'Perfect for students and daily office goers.'
    },
    {
      name: 'Premium Feast',
      price: 4000,
      duration: 'Monthly',
      type: 'KITCHEN',
      color: '#D1E7DD',
      // NEW WORKING IMAGE (Indian Thali)
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80', 
      features: ['5 Butter Roti', 'Jeera Rice', '2 Sabzi (1 Paneer)', 'Sweet Dish', 'Salad'],
      description: 'A royal meal for those who love variety.'
    },
    {
      name: 'Just Logistics',
      price: 1200,
      duration: 'Monthly',
      type: 'LOGISTICS',
      color: '#E2E3E5',
      // Tiffin Box Image
      image: 'https://images.unsplash.com/photo-1616645258469-ec681c17f3ee?w=600&q=80',
      features: ['Pickup from Home', 'Deliver to Office', 'Return Empty Box', 'On-time Guarantee'],
      description: 'Your food, our delivery network.'
    }
  ];

  try {
    await Plan.deleteMany(); // Clears old plans
    const createdPlans = await Plan.insertMany(initialPlans);
    res.json(createdPlans);
  } catch (error) {
    res.status(500).json({ message: 'Seed Failed', error: error.message });
  }
};

module.exports = { getPlans, seedPlans };