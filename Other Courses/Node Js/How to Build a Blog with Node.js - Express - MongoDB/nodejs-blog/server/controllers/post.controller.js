const {
  getPostsService, getPostService, searchPostsService, dashboardPostsService
} = require("../services/post.service");

const getPostsController = async (req, res) => {
  const locals = {
    title: "NodeJs Blog",
    description: "Simple Blog created with NodeJs, Express & MongoDb"
  };

  let perPage = 10;
  let page = req.query.page || 1;
  const { data, nextPage, current } = await getPostsService(page, perPage);

  res.render("index", { locals, data, current, nextPage });
};

const getPostController = async (req, res) => {
  const slug = req.params.id;
  const data = await getPostService(slug);

  const locals = {
    title: data.title,
    description: "Simple Blog created with NodeJs, Express & MongoDb"
  };

  res.render("post", { locals, data });
};

const searchPostsController = async (req, res) => {
  const locals = {
    title: "Search",
    description: "Simple Blog created with NodeJs, Express & MongoDb"
  };

  const searchTerm = req.body.searchTerm;
  const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");
  const data = await searchPostsService(searchNoSpecialChar);

  res.render("search", { locals, data })
}

module.exports = {
  getPostsController,
  getPostController,
  searchPostsController
}
