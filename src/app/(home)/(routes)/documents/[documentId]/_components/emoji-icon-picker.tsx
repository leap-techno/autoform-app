"use client";

import { useTheme } from "next-themes";
import React from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EmojiIconPickerProps {
  children: Readonly<React.ReactNode>;
  onChange: (icon: string) => void;
  asChild?: boolean;
}

function EmojiIconPicker({
  children,
  onChange,
  asChild,
}: EmojiIconPickerProps) {
  const { resolvedTheme } = useTheme();

  const themeMap = {
    light: Theme.LIGHT,
    dark: Theme.DARK,
  };

  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;
  const theme = themeMap[currentTheme];

  return (
    <>
      <Popover>
        <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
        <PopoverContent sideOffset={4}>
          <EmojiPicker
            theme={theme}
            onEmojiClick={(data) => onChange(data.emoji)}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}

export default EmojiIconPicker;
