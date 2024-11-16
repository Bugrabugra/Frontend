import "./App.css";
import { usePostsStore, useUserStore } from "./store.ts";
import { useState } from "react";

function UpdateUserForm() {
  const { username, email, setUsername, setEmail } = useUserStore();

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
}

function App() {
  const { username, email } = useUserStore();
  const { posts, addPost, removePost } = usePostsStore();
  const [postIdCounter, setPostIdCounter] = useState(0);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <>
      <div>{username}</div>
      <div>{email}</div>

      <UpdateUserForm />

      <div>
        <b>Create New Post</b>
      </div>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={() => {
          addPost({ title, content, id: postIdCounter.toString() });
          setPostIdCounter((prev) => prev + 1);
          setTitle("");
          setContent("");
        }}
      >
        Add Post
      </button>

      <div>
        <h1>Posts</h1>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => removePost(post.id)}>Delete Post</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
