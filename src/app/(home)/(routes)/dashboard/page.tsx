"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";

function DashbaordPage() {
  const { user, isSignedIn } = useUser();
  const createDocument = useMutation(api.documents.create);

  if (!isSignedIn) {
    redirect("/");
  }

  // document in create actions
  const documentCreateHandler = () => {
    const data = createDocument({
      title: "Untitled",
    });

    toast.promise(data, {
      loading: "Creating a New Document",
      success: "Document Created",
      error: "Document Creation Failed",
    });
  };

  return (
    <div className="w-full min-h-[100vh]">
      <div className="container mx-auto h-full">
        <div className="flex flex-col gap-y-4 lg:px-16 px-8 w-full h-full">
          <div className="flex flex-1 flex-col justify-center items-center">
            <>
              {/* Image goes here */}
              <Image
                src={"/images/autoforms-first-time-user.png"}
                alt="auto-new"
                width={1536}
                height={1024}
                className="w-[400px] object-cover"
              />
              {/* Title of first timer creates the document */}
              <div className="flex flex-col flex-wrap gap-y-1.5 justify-center items-center">
                <h2 className="text-2xl font-semibold">
                  Welcome, {user?.firstName}&apos;s Workspace
                </h2>
                <p className="text-slate-600">
                  Create your first document here...
                </p>
                <div className="mt-5">
                  <Button
                    className=""
                    size={"lg"}
                    type="button"
                    onClick={documentCreateHandler}
                  >
                    <PlusCircle className="mr-1" />
                    Create Document
                  </Button>
                </div>
              </div>
            </>
            {/* Continue user: Dash view of the documents that created */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashbaordPage;
