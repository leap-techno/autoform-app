"use client";

import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { toast } from "sonner";
import { Loader, Search, Trash2, Undo2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import DeleteConfirmDialog from "./delete-confirm-dialog";

function TrashBox() {
  const router = useRouter();
  const params = useParams();

  // get the convex api for archive and delete document
  const documents = useQuery(api.documents.fetchArchived);
  const restore = useMutation(api.documents.restoreDocument);
  const deleteDocument = useMutation(api.documents.deleteDocument);

  const [search, setSearch] = React.useState<string>("");

  const onClickNavigation = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  //   filter the documents on search by title
  const filteredDocuments = documents?.filter((doc) => {
    return doc.title.toLowerCase().includes(search.toLowerCase());
  });

  //   Onrestoring the document
  const onRestoreDocument = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    event.stopPropagation();
    const restoreDocument = restore({ documentId: documentId });

    toast.promise(restoreDocument, {
      loading: "Restoring Document",
      success: "Document Restored",
      error: "Failed to restore document",
    });
  };

  const onDeleteDocument = (documentId: Id<"documents">) => {
    const removeDocument = deleteDocument({ id: documentId });

    toast.promise(removeDocument, {
      loading: "Removing Document",
      success: "Document Removed",
      error: "Failed to remove document",
    });

    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  if (documents === undefined) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <Loader className="animate-spin delay-150" size={16} />
      </div>
    );
  }
  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-2 p-2">
        <Search className="h-4 w-4" />
        <Input
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter trash"
        />
      </div>
      <div className="mt-2 px-4 pb-1.5">
        <p className="hidden last:block text-muted-foreground text-xs pb-2">
          No documents found
        </p>
        {/* get the filered documents */}
        {filteredDocuments?.map((document) => (
          <div
            key={document._id}
            onClick={() => onClickNavigation(document._id)}
            role="button"
            className="text-sm rounded-sm w-full hover:bg-primary/5 text-center text-primary flex items-center justify-between p-0.5"
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex items-center gap-x-1">
              <div
                role="button"
                onClick={(event) => onRestoreDocument(event, document._id)}
                className="rounded p-2 hover:bg-neutral-200"
              >
                <Undo2 className="h-4 w-4 text-muted-foreground" />
              </div>
              <DeleteConfirmDialog
                onConfirm={() => onDeleteDocument(document._id)}
              >
                <div role="button" className="rounded p-2 hover:bg-neutral-200">
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </div>
              </DeleteConfirmDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrashBox;
