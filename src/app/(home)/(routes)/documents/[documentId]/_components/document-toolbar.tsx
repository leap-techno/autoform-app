"use client";

import React, { ComponentRef } from "react";
import { Doc } from "../../../../../../../convex/_generated/dataModel";
import EmojiIconPicker from "./emoji-icon-picker";
import { Button } from "@/components/ui/button";
import { ImageIcon, SmilePlus, X } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";

interface DocumentToolbarProps {
  data: Doc<"documents">;
  preview?: boolean;
}

function DocumentToolbar({ data, preview }: DocumentToolbarProps) {
  const inputRef = React.useRef<ComponentRef<"textarea">>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [value, setValue] = React.useState(data.title);

  const updateTitle = useMutation(api.documents.updateDocument);

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(data.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disabledInput = () => setIsEditing(false);

  const onInput = (value: string) => {
    setValue(value);
    updateTitle({ id: data._id, title: value || "Untitled" });
  };

  const onKeyDownText = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      disabledInput();
    }
  };

  return (
    <div className="pl-[54px] group relative">
      {!!data.iconUrl && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <EmojiIconPicker
            onChange={() => {
              alert("changed");
            }}
          >
            <p className="text-6xl hover:opacity-75 transition">
              {data.iconUrl}
            </p>
          </EmojiIconPicker>
          <Button
            variant={"outline"}
            size={"icon"}
            type="button"
            onClick={() => {}}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
      {/* In preview mode, show the icon */}
      {!!data.iconUrl && preview && (
        <p className="text-6xl pt-6">{data.iconUrl}</p>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center py-4 gap-x-1.5">
        {!data.iconUrl && !preview && (
          <EmojiIconPicker
            onChange={() => {
              alert("Add emoji to document");
            }}
            asChild
          >
            <Button
              variant={"outline"}
              size={"sm"}
              className="cursor-pointer text-muted-foreground text-xs"
            >
              <SmilePlus className="w-4 h-4 mr-1" />
              Add Icon
            </Button>
          </EmojiIconPicker>
        )}
        {!data.coverImageUrl && !preview && (
          <Button
            variant={"outline"}
            size={"sm"}
            className="cursor-pointer text-muted-foreground text-xs"
            onClick={() => {
              alert("Add cover image to document");
            }}
          >
            <ImageIcon className="w-4 h-4 mr-1" />
            Add Cover Image
          </Button>
        )}
      </div>
      {!isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          value={value}
          onBlur={disabledInput}
          onKeyDown={onKeyDownText}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl w-full bg-transparent shadow-none border-0 font-bold break-words text-slate-800 dark:text-slate-500 outline-none resize-none"
        />
      ) : (
        <div
          role="button"
          onClick={enableInput}
          className="pb-3 text-5xl font-bold break-words text-slate-800 dark:text-slate-500 outline-none"
        >
          {data.title}
        </div>
      )}
    </div>
  );
}

export default DocumentToolbar;
