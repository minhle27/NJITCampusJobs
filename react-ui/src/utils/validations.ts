import { z } from 'zod';

import depts from '@/constants/departments';

const formValidation = {
  email: z
    .string({
      required_error: 'Email is required.',
    })
    .email(),
  password: z
    .string({ required_error: 'Password is required.' })
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character.' }),
  accountType: z.enum(['student', 'employer'], { errorMap: () => ({ message: 'Please choose account type' }) }),
  name: z.string().min(3),
  phone: z
    .string({ required_error: 'Phone number is required.' })
    .regex(/^\d{10}$/, { message: 'Phone number must be 10 consecutive digits.' }),
  department: z.enum(depts as [string, ...string[]], {
    errorMap: () => ({ message: 'Please choose a valid department' }),
  }),

  jobTitle: z.string().min(3),
  jobDescription: z.string().min(10),
  location: z.string().min(3),
  salary: z.string(),
  externalApplication: z.string().url().optional(),
  jobStatus: z.enum(['open', 'close']),

  fileInput: z.instanceof(File),

  applicationStatus: z.string().min(3),
};

export default formValidation;
