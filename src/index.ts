import { publicProcedure, router, createContext } from "./trpc";
import { PrismaClient } from "@prisma/client";
// import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { CandidateInput, PostNewJobInput } from "./server/schema";

const prisma = new PrismaClient();

const appRouter = router({
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
      // .output(SuccessResponse.or(ErrorResponse))
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
  login: publicProcedure
    .input(CandidateInput)
    // .output(SuccessResponse.or(ErrorResponse))
    .mutation(async ({ input }) => {
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
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

// Create Express server
const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
const port = 3000;

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// const server = createHTTPServer({
//   router: appRouter,
// });
// server.listen(3000);

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});

async function main() {
  const jobs = await trpc.job.list.query();
  // const newjob = await trpc.job.addJobPost.mutate({
  //   title: "test",
  //   description: "test",
  //   company: "test",
  //   location: "test",
  //   postedDate: "2024-02-13T10:40:00Z",
  //   requirements: "test",
  //   skills: "test",
  //   salaryRange: "test",
  // });
  console.log(
    "jobs",
    jobs
    // "newjob",
    // newjob
    // "hello",
    // await trpc.worldGreeting.query()
  );
}
main();
