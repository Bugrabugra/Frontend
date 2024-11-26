import { initQueryClient } from "@ts-rest/react-query";
import { contract } from "api-contract";

const client = initQueryClient(contract, {
  baseHeaders: {},
  baseUrl: "",
});

export default client;
