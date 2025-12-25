const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`\n✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`   Database Name: ${conn.connection.name}`);
  } catch (error) {
    console.error(`\n❌ MongoDB Connection Error: ${error.message}`);
    console.error('   Hint: Check your .env file and ensure your IP is whitelisted in MongoDB Atlas.');
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;