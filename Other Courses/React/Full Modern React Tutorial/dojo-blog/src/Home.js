import {useState, useEffect} from "react";
import BlogList from "./BlogList";


const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:8000/blogsa")
        .then(res => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then(data => {
          setBlogs(data);
          setIsPending(false);
          setError(null);
        })
        .catch(error => {
          setIsPending(false);
          setError(error.message);
        })
    }, 1000)

  }, []); // [] var ise sadece bir kere çalışır

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title="All Blogs!"/>}
    </div>
  )
  // let name = "mario";
  // const [name, setName] = useState("mario");
  // const [age, setAge] = useState(25);
  //
  // const handleClick = () => {
  //   setName("luigi");
  //   setAge(30);
  // };

  // const handleClickAgain = (name, e) => {
  //   console.log("hello " + name, e.target);
  // };

  // return (
  //   <div className="home">
  //     <h2>Homepage</h2>
  //     <p>{name} is {age} years old</p>
  //     <button onClick={handleClick}>Click me</button>
  //     {/*<button onClick={(e) => handleClickAgain("mario", e)}>Click me again</button>*/}
  //   </div>
  // );
}

export default Home;