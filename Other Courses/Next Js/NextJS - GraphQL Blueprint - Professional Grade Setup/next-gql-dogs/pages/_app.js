import "../styles/globals.css";
import { Hydrate, QueryClientProvider } from "react-query";
import { queryClient } from "../src/api";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
