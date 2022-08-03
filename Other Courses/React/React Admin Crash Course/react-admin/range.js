module.exports = (req, res, next) => {
  res.header("Access-Control-Expose-Headers", 'Content-Range');
  res.header("Content-Range", "posts 0-4/20");
  next();
};
