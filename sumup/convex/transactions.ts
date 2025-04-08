import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// get all transactions

export const getTransactionsByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    // 1. Get all transactions by user
    const transactions = await ctx.db
      .query("transactions")
      .withIndex("byUserId", (q) => q.eq("userId", args.userId))
      .collect();

    // 2. Get all categories by user
    const categories = await ctx.db
      .query("categories")
      .withIndex("byUserId", (q) => q.eq("userId", args.userId))
      .collect();

    // 3. Extract unique account IDs
    const uniqueAccountIds = new Set(
      transactions.map((txn) => txn.accountId).filter(Boolean)
    );

    // 4. Fetch accounts using ctx.db.get for each ID
    const accounts = await Promise.all(
      Array.from(uniqueAccountIds).map((id) => ctx.db.get(id))
    );

    // 5. Create maps for lookup
    const categoryMap = Object.fromEntries(
      categories.map((cat) => [cat._id, cat.name])
    );

    const accountMap = new Map(
      accounts.filter(Boolean).map((acc) => [acc._id, acc.name])
    );

    // 6. Return enriched transactions
    return transactions.map((txn) => ({
      ...txn,
      categoryName: categoryMap[txn.category] ?? "Unknown Category",
      accountName: accountMap.get(txn.accountId) ?? "Unknown Account",
    }));
  },
});

// create new transaction
export const createTransaction = mutation({
  args: {
    amount: v.number(),
    accountId: v.id("accounts"),
    category: v.id("categories"),
    recepient: v.string(),
    date: v.string(),
    type: v.union(v.literal("income"), v.literal("expense")),
    invoiceNumber: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Look up the user from your users table using Clerk ID
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", (q) => q.eq("clerkUserId", identity.subject))
      .first();

    if (!user) throw new Error("User not found in Convex");

    const account = await ctx.db.get(args.accountId);
    if (!account) throw new Error("Account not found");
    if (account.balance < args.amount) {
      throw new Error("Insufficient funds");
    }

    await ctx.db.patch(args.accountId, {
      balance: account.balance - args.amount,
    });

    const transaction = await ctx.db.insert("transactions", {
      amount: args.amount,
      accountId: args.accountId,
      category: args.category,
      recepient: args.recepient,
      date: args.date,
      invoice: args.invoiceNumber,
      type: args.type,
      userId: user._id, // Securely added here
    });

    return transaction;
  },
});
