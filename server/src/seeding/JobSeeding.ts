import jobModel from "../models/Job";
import employerModel from "../models/Employer";
import studentModel from "../models/Student";
import { faker } from "@faker-js/faker";
import config from "../utils/config";
import mongoose from "mongoose";

async function getIdEmployer(): Promise<string | null> {
  try {
    const randomDocument = await employerModel.aggregate([
      { $sample: { size: 1 } },
    ]);

    if (randomDocument && randomDocument.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
      return randomDocument[0]._id.toString();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving _id:", error);
    throw error;
  }
}

const get18RandomStudents = async (): Promise<
  { student: string; resumeUrl: string }[] | null
> => {
  try {
    const randomList: { _id: string }[] = await studentModel.aggregate([
      { $sample: { size: 18 } },
    ]);

    if (randomList && randomList.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
      return randomList.map((student) => {
        return {
          student: student._id.toString(),
          resumeUrl:
            "https://res.cloudinary.com/ddjybuw16/image/upload/v1707926556/Test/resume.pdf",
        };
      });
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving _id:", error);
    throw error;
  }
};

async function seedJobs() {
  try {
    await mongoose.connect(config.TEST_MONGODB_URI as string);
    console.log("Seeding Jobs...");

    const seedCounts = 200;

    for (let i = 0; i < seedCounts; i++) {
      const employerId = await getIdEmployer();
      const employer = await employerModel.findById(employerId);
      if (!employer) {
        console.log("employer not available");
        return;
      }
      const studentList = await get18RandomStudents();
      if (!studentList) {
        console.log("studentList not available");
        return;
      }

      const newJob = new jobModel({
        employer: employerId,
        title: faker.person.jobTitle(),
        externalApplication:
          Math.round(Math.random()) > 0 ? faker.internet.url() : "",
        jobDescription: faker.lorem.paragraph(),
        location: faker.location.city(),
        applicants: {
          accepted: studentList.slice(0, 6),
          pending: studentList.slice(6, 12),
          rejected: studentList.slice(12, 18),
        },
        salary: faker.number.int({ min: 10, max: 1000 }),
        status: Math.round(Math.random()) > 0 ? "open" : "close",
      });

      const savedJob = await newJob.save();
      employer.jobPosts = employer.jobPosts.concat(savedJob._id);

      for (let i = 0; i < studentList.length; i++) {
        const curStudent = await studentModel.findById(studentList[i].student);
        if (!curStudent || !curStudent.appliedJobs) {
          return;
        }
        if (0 <= i && i <= 5) {
          curStudent.appliedJobs.accepted = curStudent?.appliedJobs?.accepted.concat(savedJob._id);
        } else if (6 <= i && i <= 11) {
          curStudent.appliedJobs.pending = curStudent?.appliedJobs?.pending.concat(savedJob._id);
        } else {
          curStudent.appliedJobs.rejected = curStudent?.appliedJobs?.rejected.concat(savedJob._id);
        }
        await curStudent?.save();
      }

      await employer.save();
    }
    console.log("Jobs seeded successfully!");
  } catch (error) {
    console.error(error);
  } finally {
    void mongoose.disconnect();
  }
}

export default seedJobs;
