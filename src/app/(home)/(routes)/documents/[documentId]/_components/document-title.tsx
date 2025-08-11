"use client";

import React from "react";
import { Doc } from "../../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface DocumentTitleProps {
  data: Doc<"documents">;
}

function DocumentTitle({ data }: DocumentTitleProps) {
  const patchDoc = useMutation(api.documents.updateDocument);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [title, setTitle] = React.useState<string>(data.title || "Untitled");
  const [isEditingTitle, setIsEditingTitle] = React.useState<boolean>(false);

  const enableInput = () => {
    setTitle(data.title);
    setIsEditingTitle(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disabledInput = () => {
    setIsEditingTitle(false);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    patchDoc({
      id: data._id,
      title: e.target.value || "Untitled",
    });
  };

  //   If the user presses enter the title get saved.
  const onKeyDownUpdate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      disabledInput();
    }
  };

  return (
    <div className="text-[18px] text-primary flex w-full items-center gap-x-1.5">
      {!!data.iconUrl && <p>{data.iconUrl}</p>}
      {isEditingTitle ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disabledInput}
          onChange={onChangeInput}
          onKeyDown={onKeyDownUpdate}
          value={title}
          className="h-8 focus-visible:ring-transparent px-2"
        />
      ) : (
        <Button
          className="text-[18px] text-primary font-normal h-auto p-1"
          variant={"ghost"}
          onClick={enableInput}
        >
          <span className="truncate">{data.title}</span>
        </Button>
      )}
    </div>
  );
}

DocumentTitle.Skeleton = function DocumentTitleSkeleton() {
  return <Skeleton className="h-9 w-20 rounded-md" />;
};

export default DocumentTitle;
