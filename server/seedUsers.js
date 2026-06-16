import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

// 1. Connect MongoDB Atlas
await mongoose.connect(process.env.MONGO_URI);
console.log("✅ MongoDB Connected");

// 2. Users to seed
const users = [
  {
    email: "patient@test.com",
    password: "123456",
    role: "patient",
  },
  {
    email: "doctor@test.com",
    password: "123456",
    role: "doctor",
  },
];

// 3. Seed function
const seedUsers = async () => {
  try {
    for (const user of users) {
      const exists = await User.findOne({ email: user.email });

      if (exists) {
        console.log(`⚠️ Already exists: ${user.email}`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);

      await User.create({
        email: user.email,
        password: hashedPassword,
        role: user.role,
      });

      console.log(`✅ Created: ${user.email}`);
    }

    console.log("🎉 Seeding completed");
    process.exit();
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
};

seedUsers();