const {
  registerService, loginService, authMiddlewareService, dashboardPostsService, createPostService,
  editPostService, editPostPageService, deletePostService
} = require("../services/admin.service");
const { raw } = require("express");
const adminLayout = "../views/layouts/admin";

const locals = {
  title: "Admin",
  description: "Simple Blog created with NodeJs, Express & MongoDb"
};

const adminPageController = async (req, res) => {
  res.render("admin/index", { locals, layout: adminLayout });
};

const loginController = async (req, res) => {
  const { username, password } = req.body;

  const { token, error } = await loginService(username, password);

  if (error) {
    res.status(error.code).json({ message: error.message });
  }
  res.cookie("token", token, { httpOnly: true });
  res.redirect("./dashboard");
};

const registerController = async (req, res) => {
  const { username, password } = req.body;
  const { user, error } = await registerService(username, password);
  if (user) {
    res.status(201).json({ message: "User created", user });
  } else if (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const dashboardPageController = async (req, res) => {
  const locals = {
    title: "Dashboard",
    description: "Simple Blog created with NodeJs, Express & MongoDb"
  };

  const data = await dashboardPostsService();

  res.render("admin/dashboard", { locals, data, layout: adminLayout });
};

const createPostPageController = async (req, res) => {
  const locals = {
    title: "Add Post",
    description: "Simple Blog created with NodeJs, Express & MongoDb"
  };

  res.render("admin/add-post", { locals, layout: adminLayout })
}

const editPostPageController = async (req, res) => {
  const locals = {
    title: "Edit Post",
    description: "Simple Blog created with NodeJs, Express & MongoDb"
  };

  const { id } = req.params
  const data = await editPostPageService(id);

  if (data) {
    res.render("admin/edit-post", { locals, data, layout: adminLayout })
  }
}

const createPostController = async (req, res) => {
  const { title, body } = req.body;
  const response = await createPostService(title, body);

  if (response) {
    res.redirect("/dashboard");
  }
}

const editPostController = async (req, res) => {
  const { title, body } = req.body;
  const { id } = req.params;
  const response = await editPostService(id, { title, body });

  if (response) {
    res.redirect(`/edit-post/${id}`);
  }
}

const deletePostController = async (req, res) => {
  const { id } = req.params;
  const response = await deletePostService(id);

  if (response) {
    res.redirect("/dashboard");
  }
}

const logoutController = async (req, res) => {
  res.clearCookie("token");
  res.redirect("/")
}


module.exports = {
  adminPageController,
  loginController,
  registerController,
  dashboardPageController,
  createPostPageController,
  createPostController,
  editPostController,
  editPostPageController,
  deletePostController,
  logoutController
}
