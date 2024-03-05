import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { z } from "zod";

// created for each request
export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  // Add context properties here if needed
  
});

type Context = Awaited<ReturnType<typeof createContext>>;

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
// const t = initTRPC.create();
const t = initTRPC.context<Context>().create();
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
