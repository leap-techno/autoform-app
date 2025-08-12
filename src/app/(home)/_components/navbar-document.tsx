"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { MenuIcon } from "lucide-react";
import DocumentTitle from "../(routes)/documents/[documentId]/_components/document-title";
import Banner from "../(routes)/documents/[documentId]/_components/banner";
import QuickMenu from "./quick-menu";

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
    return (
      <nav className="bg-background dark:bg-neutral-800 px-3 py-2 flex items-center justify-between gap-x-2">
        <DocumentTitle.Skeleton />
        <div className="flex items-center gap-x-2">
          <QuickMenu.Skeleton />
        </div>
      </nav>
    );
  }

  if (document === null) {
    return null;
  }
  return (
    <>
      <div className="bg-background dark:bg-neutral-800 px-3 py-2 flex items-center gap-x-2">
        {isCollapsed && (
          <MenuIcon
            size={20}
            onClick={onResetWidth}
            className="text-foreground/50 hover:text-foreground cursor-pointer"
            role="button"
          />
        )}
        <div className="flex items-center w-full justify-between gap-x-4">
          <DocumentTitle data={document} />
          <QuickMenu documentId={document._id} />
        </div>
      </div>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
}

export default NavbarDocument;
