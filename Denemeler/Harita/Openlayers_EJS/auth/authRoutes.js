const {Router} = require("express");
const authController = require("./authController");
const adminRoutes = require("./admin/adminRoutes");
const authMiddleware = require("./authMiddleware");

const router = Router();

router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);
router.get("/otherLayers", authController.otherLayers_get);
router.get("/notAuthorized", authController.notAuthorized);
router.get("/addressLayers", authController.addressLayers_get);
router.get("/maps", authController.maps_get);

router.use("/admin", authMiddleware.requireAuth, adminRoutes);

module.exports = router;