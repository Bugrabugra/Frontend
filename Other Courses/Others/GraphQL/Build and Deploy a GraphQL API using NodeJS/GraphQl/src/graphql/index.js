import { createSchema } from "graphql-yoga";
import { resolvers as userResolvers, typeDef as User } from "./models/user.js";
import {
  resolvers as commentResolvers,
  typeDef as Comment
} from "./models/comment.js";
import _ from "lodash";

const queries = /* GraphQL */ `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello from Yoga!"
  }
};

export const schema = createSchema({
  typeDefs: [queries, User, Comment],
  resolvers: _.merge(resolvers, userResolvers, commentResolvers)
});
