const express = require("express");
const router = express.Router();
const {
  getPostsController, getPostController, searchPostsController
} = require("../controllers/post.controller");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  createPostPageController, dashboardPageController, createPostController, editPostController,
  editPostPageController, deletePostController
} = require("../controllers/admin.controller");

router.get("", getPostsController);
router.get("/post/:id", getPostController);
router.post("/search", searchPostsController);
router.get("/dashboard", authMiddleware, dashboardPageController);
router.get("/add-post", authMiddleware, createPostPageController);
router.post("/add-post", authMiddleware, createPostController);
router.get("/edit-post/:id", authMiddleware, editPostPageController);
router.put("/edit-post/:id", authMiddleware, editPostController);
router.delete("/delete-post/:id", authMiddleware, deletePostController);

module.exports = router
