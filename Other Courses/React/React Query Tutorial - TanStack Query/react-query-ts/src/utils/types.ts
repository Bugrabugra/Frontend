export type UserResponseHttpData = {
  id: number;
  name: string;
  email: string;
  username: string;
};

export type CreatePostRequestBody = {
  title: string;
  body: string;
  userId: number;
};

export type PostsResponseHttpData = {
  id: number;
  title: string;
  body: string;
  userId: number;
};
