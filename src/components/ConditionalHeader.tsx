
"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function ConditionalHeader() {
  const pathname = usePathname();

  if (pathname === "/links" || pathname.startsWith("/links/")) {
    return null;
  }

  return <Header />;
}
