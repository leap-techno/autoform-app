"use client";

import React from "react";
import SettingsDialog from "../settings-dialog";

function DialogProvider() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <SettingsDialog />
    </>
  );
}

export default DialogProvider;
