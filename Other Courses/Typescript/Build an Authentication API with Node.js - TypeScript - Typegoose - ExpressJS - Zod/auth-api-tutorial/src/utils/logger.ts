import logger from "pino";
import dayjs from "dayjs";
import config from "config";

const level = config.get<string>("logLevel");

const log = logger({
  transport: {
    target: "pino-pretty"
  },
  level,
  base: {
    pid: true
  },
  timestamp: () => `,"time":"${dayjs().format()}"`
});

export default log;
