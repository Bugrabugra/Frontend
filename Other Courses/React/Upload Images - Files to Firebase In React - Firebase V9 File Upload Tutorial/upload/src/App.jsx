import './App.css'
import { useEffect, useState } from "react";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "images/");

  const uploadImage = () => {
    if (imageUpload == null) {
      return;
    }
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url])
      })
    })
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then(url => {
          setImageList((prev) => [...prev, url]);
        })
      })
    })
  }, []);

  return (
    <div className="App">
      <input type="file" onChange={(e) => setImageUpload(e.target.files[0])}/>
      <button onClick={uploadImage}>Upload image</button>
      {imageList.map((url) => {
        return <img key={url} src={url} alt=""/>
      })}
    </div>
  )
}

export default App
