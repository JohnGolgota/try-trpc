import fastify from "fastify"
import * as trpc from "@trpc/server"
import {
  FastifyTRPCPluginOptions,
  fastifyTRPCPlugin,
} from "@trpc/server/adapters/fastify"
import { router } from "./trpc"
import { createContext } from "./context"
import { notesRouter } from "./routes/notes"

const server = fastify({
  logger: true,
})

const appRouter = router({
  notes: notesRouter,
})
type AppRouter = typeof appRouter
server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: {
    router: appRouter,
    createContext,
    onError({ path, error }) {
      // report to error monitoring
      console.error(`Error in tRPC handler on path '${path}':`, error)
    },
  } satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
})

server.get("/ping", async (request, reply) => {
  return "pong\n"
})

export default server
