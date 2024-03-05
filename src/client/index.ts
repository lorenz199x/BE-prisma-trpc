import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../server";

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});

async function main() {
  const jobs = await trpc.job.list.query();
  const test = await trpc.jobs.getjobs.query();
  console.log("jobs", jobs, "hello", await trpc.worldGreeting.query(), test);
}
main();
