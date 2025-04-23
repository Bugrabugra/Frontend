import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/items.tsx"),
  route("new", "routes/newItem.tsx"),
  route("items/:id", "routes/item.tsx"),
] satisfies RouteConfig;
