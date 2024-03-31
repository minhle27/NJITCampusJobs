import studentModel from "../models/Student";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import config from "../utils/config";
import mongoose from "mongoose";

async function seedStudents() {
  try {
    await mongoose.connect(config.TEST_MONGODB_URI as string);
    console.log("Seeding students...");
    const seedCounts = 150;
    const students = [];
    const hashedPassword = await bcrypt.hash("Leminh279#", 10);

    for (let i = 0; i < seedCounts; i++) {
      const startYear = 2022;
      const endYear = 2026;

      const student = {
        password: hashedPassword,
        email: faker.internet.email(),
        fullName: faker.person.fullName(),
        phone: Math.random().toString().slice(2, 12),
        profileDescription: faker.lorem.sentence(),
        resume: {
          fileUrl:
            "https://res.cloudinary.com/ddjybuw16/image/upload/v1707926556/Test/resume.pdf",
          cloudinaryId: "Test/resume.pdf",
          isDefault: false,
        },
        transcript: {
          fileUrl:
            "https://res.cloudinary.com/ddjybuw16/image/upload/v1707926808/Test/transcript.pdf",
          cloudinaryId: "Test/transcript.pdf",
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
    void mongoose.disconnect();
  }
}

export default seedStudents;
