import NewMeetupForm from "../components/meetups/NewMeetupForm";
import {useNavigate} from "react-router-dom";


const url = "https://react-course-ba29d-default-rtdb.europe-west1.firebasedatabase.app";

const NewMeetup = (props) => {
  const history = useNavigate();

  const addMeetupHandler = (meetupData) => {
    fetch(url + "/meetups.json", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {"Content-Type": "application/json"}
    }).then(() => history("/"))
  };

  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    </section>
  );
};

export default NewMeetup;