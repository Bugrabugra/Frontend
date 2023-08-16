const { authMiddlewareService } = require("../services/admin.service");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { decoded, error } = await authMiddlewareService(token);

  if (error) {
    res.status(error.code).json({ message: error.message });
  }

  if (decoded) {
    req.userId = decoded.userId;
    next();
  }
};

module.exports = {
  authMiddleware
}
