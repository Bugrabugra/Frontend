import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


const POSTS = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" }
];

function Example01() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS])
  });

  const newPostMutation = useMutation({
    mutationFn: (title) => {
      return wait(1000).then(() => POSTS.push({ id: crypto.randomUUID(), title }))
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    }
  });

  if (postsQuery.isLoading) {
    return <h1>Loading...</h1>
  }

  if (postsQuery.isError) {
    return <pre>{JSON.stringify(postsQuery.error)}</pre>
  }

  return (
    <div className="App">
      {postsQuery.data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}

function wait(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

export default Example01
