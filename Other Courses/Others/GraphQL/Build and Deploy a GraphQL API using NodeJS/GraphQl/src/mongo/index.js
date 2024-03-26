import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

export async function setupDatabase() {
  try {
    await client.connect();
    const db = client.db("sample_movies_database");

    return {
      client,
      db,
      users: db.collection("users"),
      movies: db.collection("movies"),
      comments: db.collection("comments")
    };
  } catch (error) {
    console.log("Error connecting to the database");
    return {};
  }
}
