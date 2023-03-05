import {
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  loggerLink, splitLink,
  wsLink
} from "@trpc/client";
import { AppRouter } from "../../server/api"

const wsClient = createWSClient({
  url: "ws://localhost:3000/trpc"
})

const client = createTRPCProxyClient<AppRouter>({
  links: [
    splitLink({
      condition: op => {
        return op.type === "subscription"
      },
      true: wsLink({
        client: wsClient
      }),
      false: httpBatchLink({ // ending link
        url: "http://localhost:3000/trpc"
      })
    }),
    // loggerLink(),
  ],
  transformer: undefined
})

document.addEventListener("click", () => {
  client.users.updateUser.mutate({ userId: "1", name: "Kyle" })
})

async function main() {
  // const result = await client.sayHi.query()
  // console.log(result)

  // const result = await client.log.mutate("Hi from client")
  // console.log(result)

  // const result = await client.getUser.query({ userId: "2134" })
  // console.log(result)

  // const result = await client.updateUser.mutate({ userId: "2323", name: "Kyle" })
  // console.log(result)

  // const result = await client.secretData.query()
  // console.log(result)

  // WS
  const connection = client.users.onUpdate.subscribe(undefined, {
    onData: id => {
      console.log("updated", id)
    }
  })

  wsClient.close()
}

main()

