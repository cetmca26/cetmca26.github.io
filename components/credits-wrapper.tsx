"use client"

import { CreditsBadge } from "./credits-badge"
import { usePathname } from "next/navigation"

export function CreditsWrapper() {
  const pathname = usePathname()

  // Don't show on portfolio pages if we want to hide it there
  // Uncomment the next line if you want to hide it on portfolio pages
  if (pathname.startsWith('/students/')) return null;

  return <CreditsBadge />
}
