"use clinet";

import { ChevronDown, ChevronRight, LucideIcon, PlusIcon } from "lucide-react";
import React from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CreateItemProps {
  id?: Id<"documents">;
  label: string;
  onClick: () => void;
  icon: LucideIcon;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
}

function CreateItem({
  id,
  label,
  onClick,
  icon: Icon,
  documentIcon,
  active,
  expanded,
  isSearch,
  level = 0,
  onExpand,
}: CreateItemProps) {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  const createDocument = useMutation(api.documents.create);
  const router = useRouter();

  const hanldeItemExpanded = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const onCreateNewDocument = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (!id) return;
    // else create the new document
    const newChildDocument = createDocument({
      title: "Untitled",
      parentDocumentId: id,
    }).then((documentId) => {
      if (!expanded) {
        onExpand?.();
      }
      // router.push(`/documents/${documentId}`);
    });

    toast.promise(newChildDocument, {
      loading: "Creating a New Document",
      success: "Document Created",
      error: "Document Creation Failed",
    });
  };

  return (
    <div
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      onClick={onClick}
      className={cn(
        "group min-h-[27px] text-sm py-1.5 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium rounded-md cursor-pointer",
        active && "bg-primary/10 text-primary"
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-md hover:bg-neutral-300 dark:bg-neutral-700 mr-1"
          onClick={hanldeItemExpanded}
        >
          <ChevronIcon className="h-4 w-4 shrink-0" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">ctrl +</span>K
        </kbd>
      )}
      {!!id && (
        <div
          role="button"
          onClick={onCreateNewDocument}
          className="ml-auto flex gap-x-2 items-center"
        >
          <div className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-700">
            <PlusIcon className="h-4 w-4 text-muted-foreground" size={16} />
          </div>
        </div>
      )}
    </div>
  );
}

CreateItem.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      className="flex flex-row gap-x-2 py-[3px]"
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};

export default CreateItem;
