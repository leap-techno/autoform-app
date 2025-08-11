import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

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
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated user");
    }

    const userId = identity.subject;

    // Get all the documents regardles
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

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

// Get all archived documents
export const fetchArchived = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated user");
    }

    const userId = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return documents;
  },
});

// restore from trash
export const restoreDocument = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated user");
    }

    const userId = identity.subject;

    // get exsiting document
    const document = await ctx.db.get(args.documentId);
    if (!document) {
      throw new Error("Document not found");
    }

    if (document.userId !== userId) {
      throw new Error("Unauthrized user for this action");
    }

    const recursiveArchive = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocumentId", documentId)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, { isArchived: false });

        await recursiveArchive(child._id);
      }
    };

    // options of partial
    const options: Partial<Doc<"documents">> = {
      isArchived: false,
    };

    if (document.parentDocumentId) {
      const parent = await ctx.db.get(document.parentDocumentId);
      if (parent?.isArchived) {
        options.parentDocumentId = undefined;
      }
    }

    const restoredDocument = await ctx.db.patch(args.documentId, options);

    recursiveArchive(args.documentId);

    return restoredDocument;
  },
});

// Delete document permenently
export const deleteDocument = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated user");
    }

    const userId = identity.subject;

    const exsitingDocument = await ctx.db.get(args.id);
    if (!exsitingDocument) {
      throw new Error("Document not found");
    }

    if (exsitingDocument.userId !== userId) {
      throw new Error("Unauthrized user for this action");
    }

    const document = ctx.db.delete(args.id);

    return document;
  },
});
