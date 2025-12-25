const Menu = require('../models/Menu');

// @desc    Get Weekly Menu
// @route   GET /api/menu
const getMenu = async (req, res) => {
  try {
    const menu = await Menu.find({});
    // Custom sort to ensure order: Mon, Tue, Wed...
    const sorter = { "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6, "Sunday": 7 };
    menu.sort((a, b) => sorter[a.day] - sorter[b.day]);
    
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Seed Menu Data (Run once)
// @route   POST /api/menu/seed
const seedMenu = async (req, res) => {
  const weeklyMenu = [
    {
      day: "Monday",
      lunch: "Rajma Chawal Special",
      lunchItems: ["Rajma Masala", "Steamed Rice", "Mix Veg Raita", "Fryums"],
      lunchImage: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600",
      dinner: "Aloo Gobhi & Dal",
      dinnerItems: ["Aloo Gobhi Dry", "Dal Tadka", "4 Phulka", "Salad"],
      dinnerImage: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600"
    },
    {
      day: "Tuesday",
      lunch: "Paneer Butter Masala",
      lunchItems: ["Paneer Gravy", "Jeera Rice", "3 Butter Roti", "Gulab Jamun"],
      lunchImage: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600",
      dinner: "Bhindi Masala",
      dinnerItems: ["Bhindi Fry", "Dal Fry", "4 Chapati", "Buttermilk"],
      dinnerImage: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600"
    },
    {
      day: "Wednesday",
      lunch: "Chole Bhature Treat",
      lunchItems: ["Amritsari Chole", "2 Bhature", "Pickle", "Onion Salad"],
      lunchImage: "https://images.unsplash.com/photo-1626077213093-e3798b71d9e0?w=600",
      dinner: "Egg Curry / Paneer Bhurji",
      dinnerItems: ["Curry", "Rice", "3 Paratha", "Sweet"],
      dinnerImage: "https://images.unsplash.com/photo-1585937421612-70a008356f36?w=600"
    },
    {
      day: "Thursday",
      lunch: "Kadhi Pakoda",
      lunchItems: ["Punjabi Kadhi", "Rice", "Aloo Jeera", "Papad"],
      lunchImage: "https://images.unsplash.com/photo-1605478371310-a9f1e96b4ff4?w=600",
      dinner: "Dal Makhani",
      dinnerItems: ["Dal Makhani", "Naan", "Rice", "Salad"],
      dinnerImage: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600"
    },
    {
      day: "Friday",
      lunch: "Veg Biryani Special",
      lunchItems: ["Hyderabadi Veg Biryani", "Mirchi Salan", "Raita", "Sweet"],
      lunchImage: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600",
      dinner: "Malai Kofta",
      dinnerItems: ["Malai Kofta", "3 Kulcha", "Rice", "Green Salad"],
      dinnerImage: "https://images.unsplash.com/photo-1585937421612-70a008356f36?w=600"
    },
    {
      day: "Saturday",
      lunch: "Gujarati Thali",
      lunchItems: ["Undhiyu", "Puri", "Shrikhand", "Dal Rice"],
      lunchImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600",
      dinner: "Pav Bhaji Night",
      dinnerItems: ["Bhaji", "4 Pav", "Chopped Onion", "Lemon"],
      dinnerImage: "https://images.unsplash.com/photo-1606491956689-2ea28c674675?w=600"
    },
    {
      day: "Sunday",
      lunch: "Sunday Feast",
      lunchItems: ["Special Pulao", "Paneer Tikka", "Dal Fry", "Ice Cream"],
      lunchImage: "https://images.unsplash.com/photo-1567188040754-5835e0d07816?w=600",
      dinner: "Light Khichdi",
      dinnerItems: ["Masala Khichdi", "Kadhi", "Papad", "Pickle"],
      dinnerImage: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600"
    }
  ];

  try {
    await Menu.deleteMany();
    await Menu.insertMany(weeklyMenu);
    res.json({ message: "Menu Seeded Successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Seed Failed' });
  }
};

module.exports = { getMenu, seedMenu };