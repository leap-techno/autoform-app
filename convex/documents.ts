import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

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

// Archive the document
export const archiveDocument = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    // Check the security
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated user");
    }

    // Archive children
    const recursiveArchive = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocumentId", documentId)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, { isArchived: true });

        await recursiveArchive(child._id);
      }
    };

    // get the userId
    const userId = identity.subject;
    // find if the doument is available
    const document = await ctx.db.get(args.documentId);
    if (!document) {
      throw new Error("Document not found");
    }
    // check if the user is the owner
    if (document.userId !== userId) {
      throw new Error("Unauthrized user for this action");
    }
    // Update the document
    const updatedDocument = await ctx.db.patch(args.documentId, {
      isArchived: true,
    });

    recursiveArchive(args.documentId);

    return updatedDocument;
  },
});
