import mongoose from "mongoose";
import studentModel, {studentSchemaType} from "../models/Student";
import faker from "faker";

mongoose.connect("mongodb://localhost:27017/your-database-name", {
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
This script will use faker to generate random data for each student object. Adjust the generateRandomStudent function as needed to fit your specific requirements for fake student data.

User
I want to create a folder to store this code: what name should it be
ChatGPT
You can name the folder something descriptive that reflects its content. Since it contains code for seeding student data into a database, you might consider a name like "student-seeding" or "student-data-seeder". Here's how you can create the folder and place the code inside:

bash
Copy code
mkdir student-seeding
cd student-seeding
Then create a file inside this folder, let's name it seed-students.js, and paste the seeding script into this file.

bash
Copy code
touch seed-students.js
You can then place the seeding script code inside this file. This way, you have a folder dedicated to this specific functionality, making it easier to organize and maintain your codebase.

User
write code in tsx
ChatGPT
If you want to write the code in TypeScript React (.tsx), assuming you're using a React project, you would typically organize your code into components. However, since you're asking for the seeding script to be in .tsx, I assume you want some JSX within it.

Here's a modification of the seeding script in TypeScript with some JSX:

tsx
Copy code
import mongoose from "mongoose";
import studentModel, { StudentSchemaType } from "./path/to/studentModel";
import faker from "faker";

mongoose.connect("mongodb://localhost:27017/your-database-name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const generateRandomStudent = (): StudentSchemaType => {
  const startYear = faker.date.past(5).getFullYear(); // Random start year within the past 5 years
  const endYear = faker.date.between(startYear, new Date()).getFullYear(); // Random end year between start year and current year
  const student: StudentSchemaType = {
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

const seedStudents = async (): Promise<void> => {
  try {
    const students: StudentSchemaType[] = [];
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
