"use clinet";

import { useTheme } from "next-themes";
import React from "react";
import { Laptop, Moon, Sun } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

function ThemeModal() {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="p-1 rounded-lg bg-muted-foreground/15 flex items-center justify-center">
      <ToggleGroup type="single">
        <ToggleGroupItem value="light" onClick={() => setTheme("light")}>
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-100 dark:-rotate-90" />
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" onClick={() => setTheme("dark")}>
          <Moon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-100 dark:rotate-0" />
        </ToggleGroupItem>
        <ToggleGroupItem value="c" onClick={() => setTheme("system")}>
          <Laptop className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-100 dark:rotate-0" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

export default ThemeModal;
