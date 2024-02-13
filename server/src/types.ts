interface User {
  password: string;
  email: string;
  fullname: string;
  phone: string;
  profileDescription?: string;
  profilePicture?: string;
}

export interface Student extends User {
  accountType: "student";
  classYear: {
    start: number;
    end: number;
  };
  degree: string;
  resume?: string;
  transcript?: string;
  major: string;
}

export interface Employer extends User {
  accountType: "employer";
  department: string;
}
