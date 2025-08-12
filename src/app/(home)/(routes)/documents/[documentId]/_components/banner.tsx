"use client";

import React from "react";
import { Id } from "../../../../../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { api } from "../../../../../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteConfirmDialog from "@/app/(home)/_components/delete-confirm-dialog";

interface BannerProps {
  documentId: Id<"documents">;
}
function Banner({ documentId }: BannerProps) {
  const router = useRouter();

  const remove = useMutation(api.documents.deleteDocument);
  const restore = useMutation(api.documents.restoreDocument);

  const onRemove = () => {
    const removeDocument = remove({ id: documentId });

    toast.promise(removeDocument, {
      loading: "Removing Document",
      success: "Document Removed",
      error: "Failed to remove document",
    });

    router.push("/documents");
  };

  const onRestore = () => {
    const restoreDocument = restore({ documentId: documentId });

    toast.promise(restoreDocument, {
      loading: "Restoring Document",
      success: "Document Restored",
      error: "Failed to restore document",
    });
  };

  return (
    <div className="w-full flex px-4 py-2">
      <Alert
        variant="destructive"
        className="flex justify-between items-center bg-rose-500 text-white"
      >
        <span className="flex items-center gap-3 mb-0">
          <AlertCircle />
          <AlertTitle>This document has been moved to trash</AlertTitle>
        </span>
        <div className="flex gap-2">
          <Button
            variant={"outline"}
            className="bg-transparent hover:bg-rose-600 hover:text-white cursor-pointer"
            onClick={onRestore}
          >
            Restore
          </Button>
          <DeleteConfirmDialog onConfirm={onRemove}>
            <Button
              variant={"outline"}
              className="bg-transparent hover:bg-rose-600 hover:text-white cursor-pointer"
            >
              Delete
            </Button>
          </DeleteConfirmDialog>
        </div>
      </Alert>
    </div>
  );
}

export default Banner;
