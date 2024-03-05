import { z } from "zod";
import { publicProcedure, router, createContext } from "../../trpc";
import { prisma } from "../index";
import { jobRouter } from "./jobs";
import { CandidateInput, PostNewJobInput } from "../schema";

export const appRouter = router({
  job: {
    list: publicProcedure.query(async () => {
      try {
        const jobs = await prisma.job.findMany();
        return {
          success: true,
          message: "Job list retrieved successfully.",
          data: jobs,
        };
      } catch (error) {
        return {
          success: false,
          message: "An error occurred.",
          data: [],
        };
      }
    }),
    addJobPost: publicProcedure
      .input(PostNewJobInput)
      .mutation(async ({ input }) => {
        try {
          const newJob = await prisma.job.create({
            data: {
              // id: input.id,
              title: input.title,
              description: input.description,
              company: input.company,
              location: input.location,
              postedDate: input.postedDate,
              requirements: input.requirements,
              skills: input.skills,
              salaryRange: input.salaryRange,
            },
          });
          return {
            success: true,
            message: "Job post added successfully.",
            data: newJob,
          };
        } catch (error) {
          return {
            success: false,
            message: "An error occurred.",
            data: "Failed to add job post.",
          };
        }
      }),
  },
  candidate: {
    list: publicProcedure.query(async () => {
      try {
        const candidate = await prisma.candidate.findMany();
        return {
          success: true,
          message: "Candidates retrieved successfully.",
          data: candidate,
        };
      } catch (error) {
        return {
          success: false,
          message: "An error occurred.",
          data: [],
        };
      }
    }),
  },
  login: publicProcedure.input(CandidateInput).mutation(async ({ input }) => {
    try {
      const user = await prisma.candidate.create({
        data: {
          // id: input.id,
          name: input.name,
          email: input.email,
          skills: input.skills,
          experience: input.experience,
          resumeUrl: input.resumeUrl,
        },
      });
      return {
        success: true,
        message: "Signup successful.",
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        error: "Login failed.",
        message: "Invalid credentials.",
      };
    }
  }),
  worldGreeting: publicProcedure.query(async () => {
    return {
      message: "Hello World!",
    };
  }),
  hello: publicProcedure.query(async () => {
    return {
      message: "Hello!",
    };
  }),
  jobs: jobRouter,
});
