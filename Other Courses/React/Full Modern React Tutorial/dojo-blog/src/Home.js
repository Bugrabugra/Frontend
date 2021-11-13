import {useState, useEffect} from "react";
import BlogList from "./BlogList";


const Home = () => {
  const [blogs, setBlogs] = useState([
    { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
    { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
    { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 }
  ]);

  const [name, setName] = useState("mario");

  const handleDelete = (id) => {
    const newBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(newBlogs);
  };

  useEffect(() => {
    console.log("use effect ran");
    console.log(name);
  }, [name]); // [] var ise sadece bir kere çalışır

  return (
    <div className="home">
      <BlogList blogs={blogs} title="All Blogs!" handleDelete={handleDelete}/>
      <button onClick={() => setName("luigi")}>change name</button>
      <p>{name}</p>
      {/*<BlogList blogs={blogs.filter((blog) => blog.author === "mario")} title="Mario's Blogs!"/>*/}
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