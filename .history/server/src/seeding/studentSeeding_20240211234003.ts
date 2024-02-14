import mongoose from "mongoose";
import studentModel from "../models/Student";
const faker = require("faker");
import config from "../utils/config";

mongoose.set("strictQuery", false);
    mongoose.connect(config.TEST_MONGODB_URI as string).then(() => {
        console.log("Connected to db")
      }).catch((err)=>(
        console.log("Err", err)
      ));

const generateRandomStudent = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(config.TEST_MONGODB_URI as string).then(() => {
        console.log("Connected to db")
      }).catch((err)=>(
        console.log("Err", err)
      ));

  const startYear = faker.date.past(5).getFullYear(); // Random start year within the past 5 years
  const endYear = faker.date.between(startYear, new Date()).getFullYear(); // Random end year between start year and current year
  const student = {
    password: faker.internet.password(),
    email: faker.internet.email(),
    fullName: faker.name.findName(),
    phone: faker.phone.phoneNumber(),
    profileDescription: faker.lorem.sentence(),
    major: faker.lorem.word(),
    classYear: {
      start: startYear,
      end: endYear,
    },
    degree: faker.lorem.word(),
    accountType: "student",
  };
  return student;
};

const seedStudents = async () => {
    const seedcounts = 500;
  try {
    const students = [];
    for (let i = 0; i < seedcounts; i++) {
      students.push(generateRandomStudent());
    }
    await studentModel.insertMany(students);
    console.log("Students seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding students:", error);
    mongoose.connection.close();
  }
};

seedStudents();
