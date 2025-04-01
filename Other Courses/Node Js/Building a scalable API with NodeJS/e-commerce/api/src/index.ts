import express, { json, urlencoded } from "express";
import productsRoutes from "./modules/products/products.route";
import authRoutes from "./modules/auth/auth.route";
import ordersRoutes from "./modules/orders/orders.route";

const port = 3000;
const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

// products endpoints
app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
