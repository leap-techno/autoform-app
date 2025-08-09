"use client";

import React from "react";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import CreateItem from "./create-item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface DocumentsListProps {
  parentDoc?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
}

function DocumentsList({ parentDoc, level = 0 }: DocumentsListProps) {
  const params = useParams();
  const routers = useRouter();
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

  const onExpand = (docId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [docId]: !prev[docId],
    }));
  };

  const documents = useQuery(api.documents.fetchAllForSidebar, {
    parentDoc: parentDoc,
  });

  const onRedirect = (docId: string) => {
    routers.push(`/documents/${docId}`);
  };

  if (documents === undefined) {
    return (
      <>
        <CreateItem.Skeleton level={level} />
        {level === 0 && (
          <>
            <CreateItem.Skeleton level={level} />
            <CreateItem.Skeleton level={level} />
          </>
        )}
      </>
    );
  }
  return (
    <div>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
        className={cn(
          "capitalize hidden text-xs font-medium text-muted-foreground/80 my-1",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        empty
      </p>
      {documents.map((document) => (
        <div key={document._id}>
          <CreateItem
            id={document._id}
            label={document.title}
            onClick={() => onRedirect(document._id)}
            expanded={expanded[document._id]}
            onExpand={() => onExpand(document._id)}
            level={level}
            icon={FileIcon}
            active={params.documentId === document._id}
          />
          {expanded[document._id] && (
            <DocumentsList parentDoc={document._id} level={level + 1} />
          )}
        </div>
      ))}
    </div>
  );
}

export default DocumentsList;
