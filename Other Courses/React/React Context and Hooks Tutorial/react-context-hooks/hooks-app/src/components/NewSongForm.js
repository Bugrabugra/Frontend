import {useState} from "react";


const NewSongForm = ({addSong}) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addSong(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="song">Song name:</label>
      <input
        onChange={(e) => {setTitle(e.target.value)}}
        value={title}
        type="text"
        id="song"
        required
      />
      <input type="submit" value="add song"/>
    </form>
  );
};

export default NewSongForm;