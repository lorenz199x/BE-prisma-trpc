import { z } from "zod";

export const PostNewJobInput = z.object({
  // id: z.number(),
  title: z.string(),
  description: z.string(),
  company: z.string(),
  location: z.string(),
  postedDate: z.string(),
  requirements: z.string(),
  skills: z.string(),
  salaryRange: z.string(),
  // applicant: z.array(
  //   z.object({
  //     name: z.string(),
  //     email: z.string(),
  //     skills: z.string(),
  //     experience: z.string(),
  //     resumeUrl: z.string(),
  //   })
  // ),
});

export const CandidateInput = z.object({
  // id: z.number(),
  name: z.string(),
  email: z.string(),
  skills: z.string(),
  experience: z.string(),
  resumeUrl: z.string(),
});

const SuccessResponse = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.object({}),
  // data: z.union([PostNewJobInput, CandidateInput])
});

const ErrorResponse = z.object({
  success: z.literal(false),
  message: z.string(),
  error: z.string(),
});
