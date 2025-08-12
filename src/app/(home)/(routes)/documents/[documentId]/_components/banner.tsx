"use client";

import React, { use } from "react";
import { Id } from "../../../../../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { api } from "../../../../../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";

interface BannerProps {
  documentId: Id<"documents">;
}
function Banner({ documentId }: BannerProps) {
  const router = useRouter();

  const remove = useMutation(api.documents.deleteDocument);
  const restore = useMutation(api.documents.restoreDocument);

  const onRemove = () => {
    const removeDocument = remove({ id: documentId }).finally(() => {
      router.push("/documents");
    });

    toast.promise(removeDocument, {
      loading: "Removing Document",
      success: "Document Removed",
      error: "Failed to remove document",
    });
  };

  const onRestore = () => {
    const restoreDocument = restore({ documentId: documentId });

    toast.promise(restoreDocument, {
      loading: "Restoring Document",
      success: "Document Restored",
      error: "Failed to restore document",
    });
  };

  return <div>Banner</div>;
}

export default Banner;
