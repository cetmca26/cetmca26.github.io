"use client"

import { motion } from "framer-motion"
import  HapplleLogo  from "@/public/credits.png"
import Image from "next/image";

export function CreditsBadge() {
  return (
    <motion.div
      className="fixed left-4 bottom-4 z-50 flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 0.6 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <a
        href="https://www.linkedin.com/company/happlle/?viewAsMember=true"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 group"
        aria-label="Happlle Software Solutions"
      >
       <Image
          src={HapplleLogo}
          alt="Happlle Logo"
          className="h-5 w-5"
          width={40}
          height={40}
        />
        <div className="flex flex-col">
          <span className="text-xs font-medium">
            <span className="text-orange-600">Hap</span>
            <span className="text-blue-500">plle</span>
          </span>
          <span className="text-[10px] text-muted-foreground -mt-1 dark:text-white text-black">Software Solutions</span>
        </div>
      </a>
    </motion.div>
  )
}
