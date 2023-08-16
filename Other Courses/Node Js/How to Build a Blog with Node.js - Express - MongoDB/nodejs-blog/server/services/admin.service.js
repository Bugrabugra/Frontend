const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Post");

const jwtSecret = process.env.JWT_SECRET;

const loginService = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return { token: null, error: { code: 401, message: "Invalid credentials" } };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { token: null, error: { code: 401, message: "Invalid credentials" } };
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    return { token };
  } catch(error) {
    console.log(error);
  }
};

const registerService = async (username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    return { user, error: null };
  } catch(error) {
    if (error.code === 11000) {
      return { user: null, error: { code: 409, message: "User already in use" } };
    }
    return { user: null, error: { code: 500, message: "Internal server error" } };
  }
};

const authMiddlewareService = (token) => {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return { decoded, error: null };
  } catch(error) {
    return { decoded: null, error: { code: 401, message: "Unauthorized" } };
  }
}

const dashboardPostsService = async () => {
  try {
    const data = await Post.find();
    return data;
  } catch(error) {
    console.log(error);
  }
}

const createPostService = async (title, body) => {
  try {
    const newPost = new Post({
      title,
      body
    });

    const response = await Post.create(newPost);
    return response;
  } catch(error) {
    console.log(error);
  }
}

const editPostService = async (id, { title, body }) => {
  try {
    const response = await Post.findByIdAndUpdate(id, { title, body, updatedAt: Date.now() })
    return response;
  } catch(error) {
    console.log(error);
  }
}

const editPostPageService = async (id) => {
  try {
    const data = await Post.findOne({ _id: id });
    return data;
  } catch(error) {
    console.log(error);
  }
}

const deletePostService = async (id) => {
  try {
    const response = await Post.deleteOne({ _id: id });
    return response;
  } catch(error) {
    console.log(error);
  }
}

module.exports = {
  loginService,
  registerService,
  authMiddlewareService,
  dashboardPostsService,
  createPostService,
  editPostService,
  editPostPageService,
  deletePostService
}
