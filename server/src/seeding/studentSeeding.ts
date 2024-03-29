import mongoose from "mongoose";
import studentModel from "../models/Student";
const faker = require("faker");
import bcrypt from "bcrypt";
//import config from "../utils/config";

async function seedStudents() {
  try {
    // Connect to MongoDB
    //await mongoose.connect(config.TEST_MONGODB_URI as string);
    await mongoose.connect(
      "mongodb+srv://qminh279:leminh279@cluster1.67dtx5d.mongodb.net/testNcjApp?retryWrites=true&w=majority"
    );
    console.log("Connected to Test MongoDB");

    const seedCounts = 1;
    const students = [];
    const hashedPassword = await bcrypt.hash("Minhle279#", 10)

    for (let i = 0; i < seedCounts; i++) {
      const startYear = faker.date.past(5).getFullYear();
      const endYear = faker.date.between(startYear, 2024).getFullYear();

      const student = {
        password: hashedPassword,
        email: faker.internet.email(),
        fullName: faker.name.findName(),
        phone: faker.phone.phoneNumberFormat().replace(/-/g, ""),
        profileDescription: faker.lorem.sentence(),
        profilePicture:{
          fileUrl: 'https://res.cloudinary.com/ddjybuw16/image/upload/v1707926230/Test/avatarMabu.png',
          cloudinaryId: 'Test/avatarMabu.png',
          isDefault: false,
        }, 
        resume: {
          fileUrl: 'https://res.cloudinary.com/ddjybuw16/image/upload/v1707926556/Test/resume.pdf',
          cloudinaryId: 'Test/resume.pdf',
          isDefault: false,
        },
        transcript:{
          fileUrl: 'https://res.cloudinary.com/ddjybuw16/image/upload/v1707926808/Test/transcript.pdf',
          cloudinaryId: 'Test/transcript.pdf',
          isDefault: false,
        },
        major: faker.lorem.words(10),
        classYear: {
          start: startYear,
          end: endYear,
        },
        degree: faker.lorem.words(10),
        accountType: "student",
      };

      students.push(student);
    }

    await studentModel.insertMany(students);
    console.log("Students seeded successfully!");
  } catch (error) {
    console.error(error);
  } finally {
    // Close MongoDB connection
    mongoose.disconnect();
  }
}

seedStudents();
