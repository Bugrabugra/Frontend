export type Post = {
  id: string;
  title: string;
  body: string;
  author: string;
  date: string;
  comments: PostComment[];
};

export type PostComment = {
  id: string;
  text: string;
  username: string;
};
