"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
// In quick menu:
// 1. Delete document
// 2. Archive document
// 3. Publish document

interface QuickMenuProps {
  documentId: Id<"documents">;
}

function QuickMenu({ documentId }: QuickMenuProps) {
  const document = useQuery(api.documents.getDocumentById, { id: documentId });

  if (document === null) {
    return null;
  }

  return (
    <div className="flex gap-x-1 items-center justify-end">
      {!document?.isArchived && (
        <>
          <Button variant={"outline"} size={"sm"}>
            Delete
          </Button>
          <Button variant={"secondary"} size={"sm"}>
            <Trash2 className="mr-1" />
            Move to Trash
          </Button>
        </>
      )}
      <Button disabled={document?.isArchived} size={"sm"}>
        Publish
      </Button>
    </div>
  );
}

QuickMenu.Skeleton = function QuickMenuSkeleton() {
  return <Skeleton className="h-9 w-20 rounded-md" />;
};

export default QuickMenu;
