import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    clerkUserId: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  }).index("byClerkUserId", ["clerkUserId"]),

  accounts: defineTable({
    userId: v.optional(v.id("users")),
    name: v.string(),
    balance: v.float64(),
    visible: v.optional(v.boolean()),
  }).index("byUserId", ["userId"]),

  transactions: defineTable({
    userId: v.id("users"),
    accountId: v.id("accounts"),
    type: v.union(v.literal("income"), v.literal("expense")),
    amount: v.float64(),
    description: v.optional(v.string()),
    categoryId: v.optional(v.id("categories")),
  })
    .index("byUserId", ["userId"])
    .index("byAccountId", ["accountId"]),

  budgets: defineTable({
    accounts: v.string(),
    categoryId: v.string(),
    limit: v.float64(),
    remaining: v.float64(),
    spent: v.float64(),
    date: v.string(),
    userId: v.id("users"),
  })
    .index("byCategoryId", ["categoryId"])
    .index("byUserId", ["userId"]),

  categories: defineTable({
    userId: v.id("users"),
    name: v.string(),
    parentCategoryId: v.optional(v.id("categories")), // For subcategories
  }).index("byUserId", ["userId"]),

  notifications: defineTable({
    userId: v.id("users"),
    message: v.string(),
    type: v.union(v.literal("budget"), v.literal("transaction")),
    read: v.boolean(),
  }).index("byUserId", ["userId"]),

  formSubmissions: defineTable({
    username: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
  }).index("byEmail", ["email"]),
});
