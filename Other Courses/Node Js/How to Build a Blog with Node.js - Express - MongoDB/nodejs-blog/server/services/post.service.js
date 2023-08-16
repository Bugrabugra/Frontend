const Post = require("../models/Post");

const getPostsService = async (page, perPage) => {
  try {
    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.count();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    return { data, current: page, nextPage: hasNextPage ? nextPage : null };
  } catch(error) {
    console.log(error);
  }
};

const getPostService = async (id) => {
  try {
    const data = await Post.findById({ _id: id });
    return data;
  } catch(error) {
    console.log(error);
  }
}

const searchPostsService = async (searchTerm) => {
  try {
    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchTerm, "i") } },
        { body: { $regex: new RegExp(searchTerm, "i") } }
      ]
    });
    return data;
  } catch(error) {
    console.log(error);
  }
}

module.exports = {
  getPostsService,
  getPostService,
  searchPostsService
}
