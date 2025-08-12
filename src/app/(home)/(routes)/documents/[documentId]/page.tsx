/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import DocumentToolbar from "./_components/document-toolbar";
import { useParams } from "next/navigation";

function DocumentsIdPage() {
  const { documentId } = useParams();
  console.log(documentId);

  const document = useQuery(api.documents.getDocumentById, {
    id: documentId as Id<"documents">,
  });

  if (document === undefined) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (document === null) {
    return (
      <div>
        <h1>Document not found</h1>
      </div>
    );
  }

  return (
    <div className="w-full h-full pb-40">
      <div className="container mx-auto">
        <div className="h-28 pt-16" />
        <DocumentToolbar data={document} />
      </div>
    </div>
  );
}

export default DocumentsIdPage;
