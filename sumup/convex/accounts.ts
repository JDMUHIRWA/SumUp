import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Fetch all accounts
export const getAccountsByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("accounts")
      .withIndex("byUserId", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Create new account
export const createAccount = mutation({
  args: {
    name: v.string(),
    balance: v.float64(),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("accounts", args);
  },
});

// Toggle visibility
export const toggleAccountVisibility = mutation({
  args: { id: v.id("accounts"), visible: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { visible: args.visible });
  },
});

// delete account
export const deleteAccount = mutation({
  args: { id: v.id("accounts") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
