export interface BaseUser {
  id: string;
  password: string;
  token: string;
  email: string;
  fullName: string;
  phone: string;
  profileDescription?: string;
  profilePicture: FileAsset;
}

interface FileAsset {
  fileUrl: string;
  cloudinaryId: string;
  isDefault: boolean;
  id: string;
}

export interface Student extends BaseUser {
  accountType: "student";
  classYear: {
    start: number;
    end: number;
  };
  degree: string;
  resume?: Array<Resume>;
  transcript?: string;
  major: string;
}

export interface Resume {
  cloudinaryId: string;
  createdAt: string;
  fileUrl: string;
  id: string;
  isDefault: boolean;
  updatedAt: string;
}

export interface Employer extends BaseUser {
  accountType: "employer";
  department: string;
}

export type User = Student | Employer;

export type FileReadType = string | ArrayBuffer | null;

export interface ErrorType {
  data: {
    error: string;
  };
  status: string;
}

export interface JobPost {
  externalApplication: string;
  employer: string;
  title: string;
  jobDescription: string;
  location: string;
  salary: number;
  status: "open" | "close";
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Application {
  id: string;
  student: Student;
  resumeUrl: string;
  status: string;
  job: JobPost;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  members: Array<string>;
  messageCount: number;
}

export interface Message {
  id: string;
  content: string;
  sender: string;
  createdAt: Date;
}
