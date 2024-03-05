import { publicProcedure, router, createContext } from "./trpc";
import { PrismaClient } from "@prisma/client";
// import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";

const prisma = new PrismaClient();

const appRouter = router({
  job: {
    list: publicProcedure.query(async () => {
      // Retrieve users from a datasource, this is an imaginary database
      const jobs = await prisma.job.findMany();
      return jobs;
    }),
  },
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
  console.log("jobs", jobs, "hello", await trpc.worldGreeting.query());
}
main();

/**
 * this is working as of 2-16-24, 6:17pm
 * http://localhost:3000/trpc/job.list
 * http://localhost:3000/trpc/worldGreeting
 */
