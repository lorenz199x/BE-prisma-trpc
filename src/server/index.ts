import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { PrismaClient } from "@prisma/client";
import { publicProcedure, router, createContext } from "../trpc";
import { appRouter } from "./routers";

export const prisma = new PrismaClient();

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
