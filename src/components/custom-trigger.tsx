"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { ChevronLeft } from "lucide-react";

export function CustomTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <button onClick={toggleSidebar} className="p-2">
      <ChevronLeft className="h-4 w-4 rotate-0 transition-transform group-data-[collapsible=icon]:rotate-180" />
    </button>
  );
}
