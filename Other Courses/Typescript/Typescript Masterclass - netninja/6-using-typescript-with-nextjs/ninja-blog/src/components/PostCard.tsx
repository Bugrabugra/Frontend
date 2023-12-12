interface PostCardProps {
  post: Post
}

const PostCard = ({post}: PostCardProps) => {
  return (
    <div className="card">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
};

export default PostCard;
