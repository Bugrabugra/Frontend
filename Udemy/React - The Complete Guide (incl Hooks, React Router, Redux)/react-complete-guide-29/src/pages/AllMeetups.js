import MeetupList from "../components/meetups/MeetupList";
import {useEffect, useState} from "react";


const url = "https://react-course-ba29d-default-rtdb.europe-west1.firebasedatabase.app";

const AllMeetups = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    fetch(url + "/meetups.json")
      .then(response => {
        return response.json();
      }).then(data => {
      setIsLoading(false);

      const meetups = [];
      for (const dataKey in data) {
        meetups.push({
          id: dataKey,
          ...data[dataKey]
          // image: data[dataKey].image,
          // title: data[dataKey].title,
          // address: data[dataKey].address,
          // description: data[dataKey].description
        })
      }
      setLoadedMeetups(meetups);
    })

    if (isLoading) {
      return (
        <section>
          <p>Loading...</p>
        </section>
      )
    }
  }, []);


  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups}/>
    </section>
  );
};

export default AllMeetups;