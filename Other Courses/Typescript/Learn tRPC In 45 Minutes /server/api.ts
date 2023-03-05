import express from "express"
import cors from "cors"
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { mergedRouter } from "./routers";
import { createContext } from "./context";
import ws from "ws"

const app = express()
app.use(cors({ origin: "http://localhost:5173" }))
app.use("/trpc", createExpressMiddleware({
  router: mergedRouter, createContext
}))

const server = app.listen(3000)

applyWSSHandler({
  wss: new ws.Server({ server }),
  router: mergedRouter,
  createContext
})

export type AppRouter = typeof mergedRouter
