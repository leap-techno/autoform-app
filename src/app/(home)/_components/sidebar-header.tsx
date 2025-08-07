"use clinet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import React from "react";

function SidebarHeader() {
  return (
    <div className="p-1.5 w-full flex justify-between items-center min-h-5">
      <DropdownHeader />
      <span>
        <Bell size={20} />
      </span>
    </div>
  );
}

function DropdownHeader() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer flex flex-row gap-x-1.5">
          opan
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default SidebarHeader;
