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
  resume?: { fileUrl: string; updatedAt: string }[]; 
  transcript?: { fileUrl: string; updatedAt: string }; 
  major: string;
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
  applicants: {
    accepted: Application[];
    pending: Application[];
    rejected: Application[];
  };
  externalApplication: string;
  employer: string;
  title: string;
  jobDescription: string;
  location: string;
  salary: number;
  status: "open" | "closed";
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Application {
  student: {
    id: string;
    fullName: string;
    profilePicture: FileAsset;
  };
  resumeUrl: string;
  id: string;
}

export interface ApplicationWithStatus extends Application {
  status: string;
}
