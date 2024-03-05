import { publicProcedure, router, createContext } from "../../trpc";

export const jobRouter = router({
  getjobs: publicProcedure.query(async () => {
    return {
      id: 1,
      job: "fullstack developer",
    };
  }),
});
