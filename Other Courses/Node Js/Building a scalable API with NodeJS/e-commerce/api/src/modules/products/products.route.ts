import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "./products.controller";
import { validateData } from "../../middlewares/validation.middleware";
import { createProductSchema, updateProductSchema } from "./products.schema";
import { verifySeller, verifyToken } from "../auth/auth.middleware";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProductById);
router.post(
  "/",
  verifyToken,
  verifySeller,
  validateData(createProductSchema),
  createProduct,
);
router.put(
  "/:id",
  verifyToken,
  verifySeller,
  validateData(updateProductSchema),
  updateProduct,
);
router.delete("/:id", deleteProduct);

export default router;
