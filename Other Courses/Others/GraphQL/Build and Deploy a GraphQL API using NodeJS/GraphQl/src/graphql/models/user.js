import { ObjectId } from "mongodb";

export const typeDef = /* GraphQL */ `
  extend type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(data: NewUserInput!): User
    deleteUser(id: ID!): Boolean
    updateUser(id: ID!, data: UpdateUserInput): User
  }

  input NewUserInput {
    name: String!
    email: String!
  }

  input UpdateUserInput {
    name: String!
  }

  type User {
    id: ID!
    name: String
    email: String

    comments: [Comment]
  }
`;

export const resolvers = {
  Query: {
    users: (_, args, { mongo }) => {
      return mongo.users.find().toArray();
    },
    user: (_, args, { mongo }) => {
      return mongo.users.findOne({ _id: new ObjectId(args.id) });
    }
  },
  Mutation: {
    createUser: async (_, { data }, { mongo }) => {
      const user = await mongo.users.insertOne(data);

      return {
        id: user.insertedId,
        ...data
      };
    },
    deleteUser: async (_, { id }, { mongo }) => {
      const response = await mongo.users.deleteOne({ _id: new ObjectId(id) });

      return true;
    },
    updateUser: async (_, { id, data }, { mongo }) => {
      const updatedUser = await mongo.users.updateOne(
        { _id: new ObjectId(id) },
        { $set: { name: data.name } }
      );

      return mongo.users.findOne({ _id: new ObjectId(id) });
    }
  },
  User: {
    id: (obj) => {
      return obj._id || obj.id;
    },
    name: (obj) => {
      return obj.name.toUpperCase();
    },
    comments: async ({ email }, args, { mongo }) => {
      return mongo.comments.find({ email }).toArray();
    }
  }
};
