"use client";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Sidebar } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { ComponentRef } from "react";

function SidebarPrimary() {
  const isPathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizingRef = React.useRef(false);
  const sidebarRef = React.useRef<ComponentRef<"aside">>(null);
  const navbarRef = React.useRef<ComponentRef<"nav">>(null);

  const [isReseting, setIsResetting] = React.useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(isMobile);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) {
      return
    }
    let newWidth = e.clientX;
    
    if(newWidth < 240 ) newWidth = 240
    if(newWidth > 480 ) newWidth = 480
    
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
  };

  const mouseDownHandler = (
    e: React.MouseEvent<MouseEvent, HTMLDivElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar w-60 h-[100vh] relative z-[99999] flex-col overflow-y-auto bg-secondary",
          isReseting && "transition-all ease-in-out duration-300",
          isCollapsed && "w-0"
        )}
      >
        <div
          className={cn(
            "w-6 h-6 rounded-sm hover:bg-sky-600/20 text-primary absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 cursor-pointer transition",
            isMobile && "opacity-100"
          )}
          role="button"
        >
          <Sidebar className="p-0.5" />
        </div>
        <div>
          <p>Action items</p>
        </div>
        <div className="mt-4">
          <p>Documents</p>
        </div>
        <div
          className="opacity-0 group-hover/sidebar:opacity-100 
        transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <nav
        ref={navbarRef}
        className={cn(
          "absolute top-0 left-60 z-[99999] w-[calc(100%-240px)]",
          isReseting && "transition-all ease-in-out duration-300",
          isMobile && "w-full left-0"
        )}
      >
        <span className="bg-transparent w-full px-3 py-2">
          {isCollapsed && (
            <Sidebar className="p-0.5 text-muted-foreground" role="button" />
          )}
        </span>
      </nav>
    </>
  );
}

export default SidebarPrimary;
