import mongoose from "mongoose";
import EmployerModel from "../models/Employer";
const faker = require("faker");
import bcrypt from "bcrypt";
//import config from "../utils/config";

async function seedEmployers() {
  try {
    // Connect to MongoDB
    //await mongoose.connect(config.TEST_MONGODB_URI as string);
    await mongoose.connect(
      "mongodb+srv://qminh279:leminh279@cluster1.67dtx5d.mongodb.net/testNcjApp?retryWrites=true&w=majority"
    );
    console.log("Connected to Test MongoDB");

    const seedCounts = 1;
    const employers = [];
    const hashedPassword = await bcrypt.hash("Minhle279", 10)

    for (let i = 0; i < seedCounts; i++) {

      const employer = {
        password: hashedPassword,
        email: faker.internet.email(),
        fullName: faker.name.findName(),
        phone: faker.phone.phoneNumberFormat().replace(/-/g, ""),
        department: faker.lorem.words(10),
        profileDescription: faker.lorem.sentence(),
        accountType: "employer",
      };

      employers.push(employer);
    }

    await EmployerModel.insertMany(employers);
    console.log("Employers seeded successfully!");
  } catch (error) {
    console.error(error);
  } finally {
    // Close MongoDB connection
    mongoose.disconnect();
  }
}

seedEmployers();
