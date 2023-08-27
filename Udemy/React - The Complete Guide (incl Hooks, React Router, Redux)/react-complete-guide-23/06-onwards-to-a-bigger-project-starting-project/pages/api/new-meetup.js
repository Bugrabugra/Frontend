import { MongoClient } from "mongodb";


const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect("mongodb+srv://username:password@cluster0.sehxn.mongodb.net/meetups-next?retryWrites=true&w=majority")
    const db = client.db();

    const meetupsCollection = db.collection("meetups-next");

    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    await client.close();

    res.status(201).json({ message: "Meetup inserted" });
  }
};

export default handler;
