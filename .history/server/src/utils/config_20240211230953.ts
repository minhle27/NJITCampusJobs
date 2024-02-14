// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const TEST_MONGODB_URI = process.env

export default {
  MONGODB_URI,
  PORT,
};
