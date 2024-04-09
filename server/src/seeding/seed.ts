import seedEmployer from "./employerSeeding";
import seedJobs from "./JobSeeding";
import seedStudents from "./studentSeeding";
import seedApplications from "./applicationSeeding";

console.log("Seeding data to test database...");

const seed = async () => {
  await seedEmployer();
  await seedStudents();
  await seedJobs();
  await seedApplications();
};

void seed();
