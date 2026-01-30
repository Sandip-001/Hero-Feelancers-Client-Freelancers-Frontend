"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const LaunchCountdownModal = dynamic(
  () => import("./LaunchCountDownModal"),
  { ssr: false }
);

export default function LaunchModalWrapper() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("hf_launch_modal_seen");

    if (!seen) {
      const timer = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem("hf_launch_modal_seen", "true");
      }, 1500); // ⏳ delay for LCP

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <LaunchCountdownModal open={open} onOpenChange={setOpen} />
  );
}
