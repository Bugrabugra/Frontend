import {
  doublePrecision,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { usersTable } from "../users/users.schema";
import { productsTable } from "../products/products.schema";

export const ordersTable = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().notNull().defaultNow(),
  status: varchar({ length: 50 }).notNull().default("New"),

  userId: integer()
    .references(() => usersTable.id)
    .notNull(),

  stripePaymentIntentId: varchar({ length: 255 }),
});

export const orderItemsTable = pgTable("order_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer()
    .references(() => ordersTable.id)
    .notNull(),
  productId: integer()
    .references(() => productsTable.id)
    .notNull(),

  quantity: integer().notNull(),
  price: doublePrecision().notNull(),
});

export const insertOrderSchema = createInsertSchema(ordersTable).omit({
  userId: true,
  status: true,
  createdAt: true,
});

export const insertOrderItemSchema = createInsertSchema(orderItemsTable).omit({
  orderId: true,
});

export const insertOrderWithItemsSchema = z.object({
  order: insertOrderSchema,
  items: z.array(insertOrderItemSchema),
});

export const updateOrderSchema = createInsertSchema(ordersTable).pick({
  status: true,
});
