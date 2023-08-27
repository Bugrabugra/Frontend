import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import { MongoClient } from "mongodb";
import { Fragment } from "react";


const HomePage = ({ meetups }) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list" />
      </Head>
      <MeetupList meetups={meetups} />
    </Fragment>
  )
};

// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;
//
//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// };

export const getStaticProps = async () => {
  // fetch data from an API
  const client = await MongoClient.connect("mongodb+srv://username:password@cluster0.sehxn.mongodb.net/meetups-next?retryWrites=true&w=majority")
  const db = client.db();

  const meetupsCollection = db.collection("meetups-next");
  const meetups = await meetupsCollection.find().toArray();

  await client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 1
  }
};

export default HomePage;
