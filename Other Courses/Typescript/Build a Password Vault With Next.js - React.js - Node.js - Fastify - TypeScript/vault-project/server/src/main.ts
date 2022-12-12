import createServer from "./utils/createServer";
import logger from "./utils/logger";
import { FastifyInstance } from "fastify";
import { disconnectFromDb } from "./utils/db";

function gracefulShutdown(signal: string, app: FastifyInstance) {
  process.on(signal, async () => {
    logger.info(`Goodbye, got signal ${signal}`);
    app.close();

    await disconnectFromDb();
    logger.info("My work here is done");

    process.exit(0);
  });
}

async function main() {
  const app = createServer();

  try {
    const url = await app.listen(4000, "0.0.0.0");
    logger.info(`Server is ready at ${url}`)
  } catch (error) {
    logger.error(error)
    process.exit(1);
  }

  const signals = ["SIGTERM", "SIGINT"];

  for (const element of signals) {
    gracefulShutdown(element, app);
  }
}

main();
