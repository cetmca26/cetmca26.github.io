"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { useTheme } from "next-themes"

export function HeroSection() {
  const { theme } = useTheme()

  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <motion.h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Welcome to <span className="">CETMCA<span style={{ color: '#28cee3' }}>26</span></span>
              </motion.h1>
              <motion.p
                className="max-w-[600px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                The official website for the MCA batch of 2026 at the College of Engineering Trivandrum (CET)
              </motion.p>
            </div>
            <motion.div
              className="flex flex-col gap-2 min-[400px]:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/projects">
                <Button size="lg" className="bg-[#28cee3] hover:bg-[#28cee3]/90">
                  Explore Projects
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Join Us
                </Button>
              </Link>
            </motion.div>
          </div>


          <motion.div
  className="w-full flex flex-col items-center justify-center py-16 px-4"
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.3 }}
>
  <motion.p
    className="text-2xl md:text-3xl mt-4 text-cyan-300"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.6 }}
  >
    BATCH 2024 – 2026
  </motion.p>

  <motion.div
    className="mt-8 text-xl md:text-2xl text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.9 }}
  >
    <div>College of Engineering</div>
    <div>Trivandrum, Kerala</div>
  </motion.div>

  <motion.div
    className="mt-12 h-1 w-48 bg-[#28cee3] rounded-full"
    animate={{ width: [48, 96, 48] }}
    transition={{ repeat: Infinity, duration: 2 }}
  />

<a href="/admission">
<motion.button
    className="mt-10 px-6 py-3 bg-green-700 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-green-700 transition duration-300"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 1.2 }}
  >
    Admission Helpdesk 2025 – Join Now
  </motion.button>
  </a>
 
</motion.div>


        </div>
      </div>
    </section>
  )
}
