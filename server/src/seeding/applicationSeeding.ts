import applicationModel from "../models/Application";
import jobModel from "../models/Job";
import studentModel from "../models/Student";
import config from "../utils/config";
import mongoose, { Model } from "mongoose";

async function getAllIdList<T>(model: Model<T>) {
  try {
    const randomList: { _id: string }[] = await model.find({});

    if (randomList && randomList.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
      return randomList.map((student) => student._id);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving _id:", error);
    throw error;
  }
}

export async function getRandomIdList<T>(quantity: number, model: Model<T>) {
  try {
    const randomList: { _id: string }[] = await model.aggregate([
      { $sample: { size: quantity } },
    ]);

    if (randomList && randomList.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
      return randomList.map((student) => student._id);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving _id:", error);
    throw error;
  }
}

function getRandomStatus() {
  const options = ["accepted", "pending", "rejected"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

async function seedApplications() {
  try {
    await mongoose.connect(config.TEST_MONGODB_URI as string);
    console.log("Seeding applications...");
    const applications = [];
    const postIdList = await getAllIdList(jobModel);

    let studentIdList;
    if (!postIdList) {
      console.log("Failed to fetch posts and students");
      return;
    }

    for (let i = 0; i < postIdList.length; i++) {
      studentIdList = await getRandomIdList(20, studentModel);
      if (!studentIdList) {
        console.log("Failed to fetch students");
        return;
      }
      for (let j = 0; j < studentIdList.length; j++) {
        const newApplication = {
          student: studentIdList[j],
          resumeUrl:
            "https://res.cloudinary.com/ddjybuw16/image/upload/v1707926556/Test/resume.pdf",
          job: postIdList[i],
          status: getRandomStatus(),
        };
        applications.push(newApplication);
      }
    }

    await applicationModel.insertMany(applications);
    console.log("Applications seeded successfully!");
  } catch (error) {
    console.error(error);
  } finally {
    void mongoose.disconnect();
  }
}

export default seedApplications;
