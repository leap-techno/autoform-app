/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useQuery } from "convex/react";
import { Sidebar } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { ComponentRef } from "react";
import { api } from "../../../../convex/_generated/api";

function SidebarPrimary() {
  const isPathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const documents = useQuery(api.documents.fetchAll);

  console.log(documents);

  const isResizingRef = React.useRef(false);
  const sidebarRef = React.useRef<ComponentRef<"aside">>(null);
  const navbarRef = React.useRef<ComponentRef<"nav">>(null);

  const [isReseting, setIsResetting] = React.useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(isMobile);

  // Resize on mobile to the max
  React.useEffect(() => {
    if (isMobile) {
      sidebarCollapse();
    } else {
      onClickResize();
    }
  }, [isMobile]);

  React.useEffect(() => {
    if (isMobile) {
      sidebarCollapse();
    }
  }, [isPathname, isMobile]);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) {
      return;
    }
    let newWidth = e.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    // set sidebar into current format
    if (sidebarRef.current && navbarRef.current) {
      console.log(newWidth);

      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const mouseDownHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Resize back to the normal
  const onClickResize = () => {
    if (sidebarRef.current && navbarRef.current) {
      console.log("Value do not expand");
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");

      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  // Only if the collapse is needful otherwise archive this
  const sidebarCollapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";

      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0%");

      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
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
          onClick={sidebarCollapse}
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
          onMouseDown={mouseDownHandler}
          onClick={onClickResize}
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
            <Sidebar
              size={28}
              className="p-1 text-muted-foreground hover:bg-accent rounded-md"
              role="button"
              onClick={onClickResize}
            />
          )}
        </span>
      </nav>
    </>
  );
}

export default SidebarPrimary;
