import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const todos = pgTable('todos', {
  id: uuid("id").primaryKey().defaultRandom().primaryKey(),
  name: text("name").notNull(),
  isCompleted: boolean().notNull(),
  createdAt: timestamp({withTimezone: true}).defaultNow().notNull(),
  updatedAt: timestamp({withTimezone: true}).defaultNow().notNull().$onUpdate(() => new Date()),
})
