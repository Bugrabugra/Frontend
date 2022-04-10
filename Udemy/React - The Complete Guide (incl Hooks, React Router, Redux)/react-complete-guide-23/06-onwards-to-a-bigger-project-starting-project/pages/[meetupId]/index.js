import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";


const MeetupDetails = ({ meetupData }) => {
  return (
    <Fragment>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description}/>
      </Head>
      <MeetupDetail
        image={meetupData.image}
        title={meetupData.title}
        address={meetupData.address}
        description={meetupData.description}
      />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect("mongodb+srv://bugra:buura6630@cluster0.sehxn.mongodb.net/meetups-next?retryWrites=true&w=majority")
  const db = client.db();

  const meetupsCollection = db.collection("meetups-next");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  await client.close();

  return {
    fallback: false,
    paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } }))
  }
};

export const getStaticProps = async (context) => {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect("mongodb+srv://bugra:buura6630@cluster0.sehxn.mongodb.net/meetups-next?retryWrites=true&w=majority")
  const db = client.db();

  const meetupsCollection = db.collection("meetups-next");
  const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });

  console.log(meetupId, selectedMeetup)

  await client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description
      }
    }
  }
}

export default MeetupDetails;
