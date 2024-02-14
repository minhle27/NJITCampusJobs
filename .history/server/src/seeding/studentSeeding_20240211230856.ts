import mongoose from "mongoose";
import studentModel, {studentSchemaType} from "../models/Student";
import faker from "faker";

mongoose.connect(import config from "./utils/config";, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const generateRandomStudent = () => {
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
  try {
    const students = [];
    for (let i = 0; i < 500; i++) {
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
