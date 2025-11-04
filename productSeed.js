// seed.js
const mongoose = require("mongoose");
const productModel = require("./models/productModel.js");
const dummyData = require("./productDummyData.js");

const MONGO_URI = "mongodb://localhost:27017/shoppyGlobal-RestAPI";

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URL);
    console.log(`✅ Connected to DB: ${mongoose.connection.name}`);

    // Check if collection already has data
    const count = await productModel.countDocuments();
    if (count === 0) {
      await productModel.insertMany(dummyData);
      console.log("🌱 Dummy data inserted successfully!");
    } else {
      console.log(`⚠️ Collection already has ${count} documents. Skipping insert.`);
    }
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Database connection closed");
  }
}

seedDatabase();
