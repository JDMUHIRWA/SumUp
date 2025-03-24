import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    categoryId: v.string(),
    limit: v.float64(),
    remaining: v.float64(),
    spent: v.float64(),
    date: v.string(),
    accounts: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("budgets", args);
  },
});

// getting the budget by user id
export const getBudgetsByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("budgets")
      .withIndex("byUserId", (q) => q.eq("userId", args.userId))
      .collect();
  },
});


