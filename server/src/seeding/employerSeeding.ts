import EmployerModel from "../models/Employer";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import config from "../utils/config";
import mongoose from "mongoose";

async function seedEmployer() {
  try {
    await mongoose.connect(config.TEST_MONGODB_URI as string);
    console.log("Seeding Employer...");
    const seedCounts = 15;
    const employers = [];
    const hashedPassword = await bcrypt.hash("Leminh279#", 10);
    const depts: string[] = [
      "Department of Biomedical Engineering",
      "Otto H. York Department of Chemical and Materials Engineering",
      "John A. Reif, Jr. Department of Civil and Environmental Engineering",
      "Helen and John C. Hartmann Department of Electrical and Computer Engineering",
      "School of Applied Engineering and Technology",
      "Department of Mechanical & Industrial Engineering",
      "Department of Aerospace Studies (AFROTC)",
      "Department of Chemistry and Environmental Science",
      "Department of Humanities and Social Sciences",
      "Department of Mathematical Sciences",
      "Department of Physics",
      "Federated Department of Biological Sciences",
      "Federated Department of History",
      "Rutgers/NJIT Theatre Arts Program",
      "NJ School of Architecture",
      "School of Art and Design",
      "Department of Computer Science",
      "Department of Data Science",
      "Department of Informatics",
    ];

    for (let i = 0; i < seedCounts; i++) {
      const employer = {
        password: hashedPassword,
        email: faker.internet.email(),
        fullName: faker.person.fullName(),
        phone: Math.random().toString().slice(2, 12),
        department: depts[Math.floor(Math.random() * depts.length)],
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
    void mongoose.disconnect();
  }
}

export default seedEmployer;
