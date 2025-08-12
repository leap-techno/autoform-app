"use client";

import React from "react";
import { Doc } from "../../../../../../../convex/_generated/dataModel";
import EmojiIconPicker from "./emoji-icon-picker";
import { Button } from "@/components/ui/button";
import { Smile, X } from "lucide-react";

interface DocumentToolbarProps {
  data: Doc<"documents">;
  preview?: boolean;
}

function DocumentToolbar({ data, preview }: DocumentToolbarProps) {
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
      <div className="opacity-100 flex items-center py-4 gap-x-1">
        {!data.iconUrl && !preview && (
          <EmojiIconPicker onChange={() => {}} asChild>
            <Button variant={"outline"} size={"sm"}>
              <Smile className="w-4 h-4 mr-2" />
              Add Icon
            </Button>
          </EmojiIconPicker>
        )}
      </div>
    </div>
  );
}

export default DocumentToolbar;
