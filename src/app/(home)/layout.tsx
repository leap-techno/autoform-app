"use client";
import { useConvexAuth } from "convex/react";
import { Loader } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import SidebarPrimary from "./_components/sidebar-primary";
import GlobalSearch from "@/components/global-search";

interface HomeLayoutProps {
  children: Readonly<React.ReactNode>;
}
function HomeLayout({ children }: HomeLayoutProps) {
  // preload spinner
  const { isLoading, isAuthenticated } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center bg-white dark:bg-slate-800 text-primary/75">
        <span>
          <Loader size={28} className="animate-spin delay-100" />
        </span>
      </div>
    );
  }

  if (!isAuthenticated) redirect("/");

  return (
    <div className="h-full w-full flex">
      <SidebarPrimary />
      <main className="flex-1 flex h-full overflow-y-auto">
        <GlobalSearch />
        {children}
      </main>
    </div>
  );
}

export default HomeLayout;
