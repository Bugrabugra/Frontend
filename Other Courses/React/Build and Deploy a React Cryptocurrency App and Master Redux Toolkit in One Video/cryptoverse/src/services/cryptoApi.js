import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": "088b9f8c5dmsh749d5763a4f2a86p149ccfjsn2e36a38e187d"
};
const baseUrl = "https://coinranking1.p.rapidapi.com/coins";
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

// const options = {
//   method: "GET",
//   url: "https://coinranking1.p.rapidapi.com/coins",
//   params: {
//     referenceCurrencyUuid: "yhjMzLPhuIDl",
//     timePeriod: "24h",
//     tiers: "1",
//     orderBy: "marketCap",
//     orderDirection: "desc",
//     limit: "50",
//     offset: "0"
//   },
//   headers: {
//     "x-rapidapi-host": "coinranking1.p.rapidapi.com",
//     "x-rapidapi-key": "088b9f8c5dmsh749d5763a4f2a86p149ccfjsn2e36a38e187d"
//   }
// };

export const cryptoApi = createApi({
  reducerPath: "crypto",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest("/")
    })
  })
});

export const { useGetCryptosQuery } = cryptoApi;
