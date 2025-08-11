"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface NavbarDocumentProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

function NavbarDocument({ isCollapsed, onResetWidth }: NavbarDocumentProps) {
  const params = useParams();
  const document = useQuery(api.documents.getDocumentById, {
    id: params.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return <div>Loading...</div>;
  }

  if (document === null) {
    return null;
  }
  return (
    <>
      <nav className="bg-background"></nav>
    </>
  );
}

export default NavbarDocument;
