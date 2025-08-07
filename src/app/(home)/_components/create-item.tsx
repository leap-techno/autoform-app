"use clinet";

import { LucideIcon } from "lucide-react";
import React from "react";

interface CreateItemProps {
  label: string;
  onClick: () => void;
  icon: LucideIcon;
}

function CreateItem({ label, onClick, icon: Icon }: CreateItemProps) {
  return (
    <div
      role="button"
      style={{ paddingLeft: "12px" }}
      onClick={onClick}
      className="group min-h-[27px] 
      text-sm py-1.5 pr-3 w-full hover:bg-primary/5 
      flex items-center text-muted-foreground font-medium rounded-md cursor-pointer"
    >
      <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      <span className="truncate">{label}</span>
    </div>
  );
}

export default CreateItem;
