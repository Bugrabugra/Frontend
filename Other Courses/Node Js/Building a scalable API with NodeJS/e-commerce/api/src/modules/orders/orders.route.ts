import { Router } from "express";
import { verifyToken } from "../auth/auth.middleware";
import { validateData } from "../../middlewares/validation.middleware";
import { insertOrderWithItemsSchema, updateOrderSchema } from "./orders.schema";
import {
  createOrder,
  getOrder,
  listOrders,
  updateOrder,
} from "./orders.controller";

const router = Router();

router.post(
  "/",
  verifyToken,
  validateData(insertOrderWithItemsSchema),
  createOrder,
);

router.get("/", verifyToken, listOrders);
router.get("/:id", verifyToken, getOrder);
router.put("/:id", verifyToken, validateData(updateOrderSchema), updateOrder);

export default router;
