import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a document
export const create = mutation({
  args: {
    title: v.string(),
    parentDocumentId: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated user");
    }

    const userId = identity.subject;

    const newDocument = await ctx.db.insert("documents", {
      title: args.title,
      userId: userId,
      parentDocumentId: args.parentDocumentId,
      isArchived: false,
      isPublished: false,
    });

    return newDocument;
  },
});

// Fetch a documents
export const fetchAll = query({
  handler: async (ctx) => {
    // check authentication
    const identity = ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated user");
    }
    // Get all the documents regardles
    const documents = await ctx.db.query("documents").collect();
    return documents;
  },
});

// get documents for sidebar
export const fetchAllForSidebar = query({
  args: {
    parentDoc: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated user");
    }

    const userId = identity.subject;
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocumentId", args.parentDoc)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});
