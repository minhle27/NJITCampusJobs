import { User, LoginInfo, NewJobPost, Application, NewMessage } from "../types";
import { isEmail } from "validator";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isPhone = (phone: string): boolean => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};

const isPassword = (password: string): boolean => {
  const passwordRegex = /.{8,}/;
  return passwordRegex.test(password);
};

const isNumber = (value: unknown): value is number => {
  return !isNaN(Number(value));
};

const parseString = (value: unknown, what: string): string => {
  if (!isString(value)) {
    throw new Error(`Value of ${what} incorrect: ${value}`);
  }
  return value;
};

const parseEmail = (email: unknown): string => {
  if (!isString(email) || !isEmail(email)) {
    throw new Error(`Invalid email: ${email}`);
  }
  return email;
};

const parsePhone = (phone: unknown): string => {
  if (!isString(phone) || !isPhone(phone)) {
    throw new Error(`Invalid phone number: ${phone}`);
  }
  return phone;
};

const parseStringOptionalField = (object: unknown, what: string): string => {
  if (!object || typeof object !== "object" || !(what in object)) {
    return "";
  }
  return object[what as keyof typeof object] as string;
};

type classYearType = {
  start: number;
  end: number;
};

const parseClassYear = (classYear: unknown): classYearType => {
  if (!classYear || typeof classYear !== "object")
    throw new Error("invalid classYear");
  if (!("start" in classYear) || !isNumber(classYear.start)) {
    throw new Error("startYear missing or wrong type");
  }
  if (!("end" in classYear) || !isNumber(classYear.end)) {
    throw new Error("endYear missing or wrong type");
  }

  return {
    start: Number(classYear.start),
    end: Number(classYear.end),
  };
};

const parsePassword = (password: unknown): string => {
  if (!isString(password) || !isPassword(password))
    throw new Error(`Invalid password: ${password}`);
  return password;
};

const fieldValidate = {
  processNewUser: (object: unknown): User => {
    if (!object || typeof object !== "object") {
      throw new Error("Incorrect or missing data");
    }

    if (!("accountType" in object)) throw new Error("account type missing");
    if (!("password" in object)) throw new Error("password missing");
    if (!("email" in object)) throw new Error("email missing");
    if (!("fullName" in object)) throw new Error("fullName missing");
    if (!("phone" in object)) throw new Error("phone missing");

    const newUser = {
      password: parsePassword(object.password),
      email: parseEmail(object.email),
      fullName: parseString(object.fullName, "fullName"),
      phone: parsePhone(object.phone),
      profileDescription: parseStringOptionalField(
        object,
        "profileDescription"
      ),
      profilePicture: parseStringOptionalField(object, "profilePicture"),
    };

    switch (object.accountType) {
      case "student": {
        if (!("classYear" in object)) throw new Error("classYear missing");
        if (!("degree" in object)) throw new Error("degree missing");
        if (!("major" in object)) throw new Error("major missing");
        return {
          ...newUser,
          accountType: "student",
          classYear: parseClassYear(object.classYear),
          degree: parseString(object.degree, "degree"),
          major: parseString(object.major, "major"),
          resume: parseStringOptionalField(object, "resume"),
          transcript: parseStringOptionalField(object, "transcript"),
        };
      }
      case "employer": {
        if (!("department" in object)) throw new Error("department missing");
        return {
          ...newUser,
          accountType: "employer",
          department: parseString(object.department, "department"),
        };
      }
      default:
        throw new Error(`Incorrect type: ${object.accountType}`);
    }
  },

  processLoginInfo: (object: unknown): LoginInfo => {
    if (!object || typeof object !== "object") {
      throw new Error("Incorrect or missing data");
    }
    if (!("accountType" in object)) throw new Error("account type missing");
    if (!("password" in object)) throw new Error("password missing");
    if (!("email" in object)) throw new Error("email missing");
    if (object.accountType !== "student" && object.accountType !== "employer")
      throw new Error("invalid account type");
    return {
      email: parseEmail(object.email),
      password: parsePassword(object.password),
      accountType: object.accountType,
    };
  },

  processNewPost: (object: unknown): NewJobPost => {
    return object as NewJobPost;
  },

  processNewStatus: (object: unknown): { status: string } => {
    return object as { status: string };
  },

  processNewMessage: (object: unknown): NewMessage => {
    return object as NewMessage;
  },

  processNewApplication: (object: unknown): Application => {
    return object as Application;
  },
};

export default fieldValidate;
