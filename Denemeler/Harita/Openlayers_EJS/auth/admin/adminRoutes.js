const express = require("express");
const adminController = require("./adminController");
const authMiddleware = require("../authMiddleware");

const router = express.Router();

router.get("/users", authMiddleware.requireAuth, adminController.users_get);
router.get("/layers", authMiddleware.requireAuth, adminController.layers_get);
router.put("/layer/:id", authMiddleware.requireAuth, adminController.layer_update);
router.post("/layer", authMiddleware.requireAuth, adminController.layer_create);
router.delete("/layer/:id", authMiddleware.requireAuth, adminController.layer_delete);
router.get("/user/:id", authMiddleware.requireAuth, adminController.user_get);
router.put("/user/:id", authMiddleware.requireAuth, adminController.user_update);
router.put("/addressLayer/:id", authMiddleware.requireAuth, adminController.addressLayer_update);
router.put("/map/:id", authMiddleware.requireAuth, adminController.map_update);

module.exports = router;