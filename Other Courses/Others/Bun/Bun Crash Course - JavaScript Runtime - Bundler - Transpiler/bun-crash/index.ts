import { Server } from "bun";

const server = Bun.serve({
  port: Bun.env.PORT ?? 8000,
  fetch(request: Request, server: Server): Response | Promise<Response> {
    const url = new URL(request.url)
    if (url.pathname === "/") {
      return new Response("Homepage")
    }
    if (url.pathname === "/blog") {
      return new Response("Blog")
    }
    return new Response("404!")
  }
})

console.log(`Listening on port ${server.port}`)
