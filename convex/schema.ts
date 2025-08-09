import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
  documents: defineTable({
    title: v.string(),
    userId: v.string(),
    isArchived: v.boolean(),
    parentDocumentId: v.optional(v.id("documents")),
    content: v.optional(v.string()),
    coverImageUrl: v.optional(v.string()),
    iconUrl: v.optional(v.string()),
    isPublished: v.boolean(),
  })
    .index("by_user_id", ["userId"])
    .index("by_parent_document_id", ["parentDocumentId"])
    .index("by_user_parent", ["userId", "parentDocumentId"]),
});
