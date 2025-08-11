"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import useSettingsStore from "@/hooks/store/use-settings";
import { Label } from "./ui/label";
import ThemeModal from "./theme-modal";
import { DialogTitle } from "@radix-ui/react-dialog";

function SettingsDialog() {
  const { isOpen, onClose } = useSettingsStore();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <DialogTitle className="sr-only">Settings</DialogTitle>
          <h2>Are you absolutely sure?</h2>
        </DialogHeader>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-y-1">
            <Label>Appearance</Label>
            <span>Customize your workspace</span>
          </div>
          <ThemeModal />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;
