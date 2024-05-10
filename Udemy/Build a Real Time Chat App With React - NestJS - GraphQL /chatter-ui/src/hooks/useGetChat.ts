import { graphql } from "../gql";
import { ChatQueryVariables } from "../gql/graphql.ts";
import { useQuery } from "@apollo/client";

const getChatDocument = graphql(`
  query Chat($_id: String!) {
    chat(_id: $_id) {
      ...ChatFragment
    }
  }
`);

const useGetChat = (variables: ChatQueryVariables) => {
  return useQuery(getChatDocument, { variables });
};

export { useGetChat };
