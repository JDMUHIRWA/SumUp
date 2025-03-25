import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    name: v.string(),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("categories", args);
  },
});

// getting the categories by user id
export const getCategoriesByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("categories")
      .withIndex("byUserId", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

//delete category by id
export const deleteCategory = mutation({
  args: { _id: v.id("categories") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args._id);
  },
});
