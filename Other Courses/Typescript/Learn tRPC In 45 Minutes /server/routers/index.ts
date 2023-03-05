import { adminProcedure, t } from "../trpc"
import { userRouter } from "./users";

const appRouter = t.router({
  sayHi: t.procedure.query(() => {
    return "Hi"
  }),
  log: t.procedure.input(v => {
    if (typeof v === "string") {
      return v
    }
    throw new Error("Invalid input: Expected string")
  }).mutation((req) => {
    console.log(`client saysL: ${req.input}`)
    return true
  }),
  users: userRouter,
  secretData: adminProcedure.query(({ ctx }) => {
    console.log(ctx.user)
    return "Super secret data"
  })
})

export const mergedRouter = t.mergeRouters(appRouter, userRouter)
