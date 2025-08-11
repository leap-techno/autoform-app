"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import React from "react";
import { api } from "../../convex/_generated/api";
import { useGlobalSearch } from "@/hooks/store/use-global-search";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { FileIcon } from "lucide-react";

function GlobalSearch() {
  const { user } = useUser();
  const router = useRouter();
  const documents = useQuery(api.documents.fetchAll);
  const [mounted, setMounted] = React.useState<boolean>(false);

  const toggle = useGlobalSearch((state) => state.toggle);
  const isOpen = useGlobalSearch((state) => state.isOpen);
  const onClose = useGlobalSearch((state) => state.onClose);

  //   On select the document push
  const handleOnSelect = (id: string) => {
    router.push(`/documents/${id}`);
    onClose();
  };

  //   To prevent hydration errors
  React.useEffect(() => {
    setMounted(true);
  }, []);

  //   On key toggle to open the global search
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <CommandDialog open={isOpen} onOpenChange={onClose}>
        <CommandInput placeholder={`Search ${user?.firstName}'s documents`} />
        <CommandList>
          <CommandEmpty>No documents found.</CommandEmpty>
          <CommandGroup heading="Documents">
            {documents?.map((doc) => (
              <CommandItem
                onSelect={() => handleOnSelect(doc._id)}
                key={doc._id}
                title={doc.title}
                value={`${doc._id}-${doc.title}`}
              >
                <span className="text-sm flex gap-x-1 items-center">
                  <FileIcon className="mr-2 h-4 w-4" />
                  {doc.title}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default GlobalSearch;
