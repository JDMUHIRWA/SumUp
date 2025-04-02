import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const saveFormData = mutation({
  args: {
    username: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("formSubmissions", args);
    return id;
  },
});
