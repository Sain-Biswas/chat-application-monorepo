import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { userSchema } from "./users.schema";

export const friendsSchema = pgTable("friends", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull().references(() => userSchema.id),
  friendId: text("friend_id").notNull().references(() => userSchema.id),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull()
    .$onUpdateFn(() => /* @__PURE__ */ new Date()),
});

export const friendsRelation = relations(friendsSchema, ({ one }) => ({
  user: one(userSchema, {
    fields: [friendsSchema.userId],
    references: [userSchema.id],
  }),
  friend: one(userSchema, {
    fields: [friendsSchema.friendId],
    references: [userSchema.id],
  }),
}));
