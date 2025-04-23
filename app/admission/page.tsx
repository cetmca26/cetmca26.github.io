"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export default function AdmissionHelpSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <motion.h2
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                MCA Entrance Helpdesk
              </motion.h2>
              <motion.p
                className="max-w-[600px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                We are here to help you with everything related to the LBS MCA entrance – doubts, admissions, fees,
                accommodation, travel, and more.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col gap-2 min-[400px]:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="https://chat.whatsapp.com/examplegroup" target="_blank">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Join WhatsApp Helpdesk
                </Button>
              </Link>
              <Link href="https://forms.gle/exampleform" target="_blank">
                <Button size="lg" variant="outline">
                  Show Interest in Crash Course
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="mt-6 text-muted-foreground md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p>
                📢 <strong>Coming Soon:</strong> Join our <strong>7-day Crash Course</strong> for just ₹250 – includes 3hr/day live
                interactive sessions by 2024 LBS MCA rank holders.
              </p>
              <p className="mt-2">
                💡 All doubts cleared, syllabus covered with PYQ practice. Join single classes for ₹50 each if you prefer.
              </p>
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
              LBS MCA 2025
            </motion.p>

            <motion.div
              className="mt-8 text-xl md:text-2xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <div>Full Entrance Support</div>
              <div>Crash Course + Live Mentorship</div>
            </motion.div>

            <motion.div
              className="mt-12 h-1 w-48 bg-[#28cee3] rounded-full"
              animate={{ width: [48, 96, 48] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
