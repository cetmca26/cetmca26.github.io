// app/layout.tsx


import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CET MCA 26 - College of Engineering Trivandrum",
  description:
    "CET MCA 26 provides high-quality resources for MCA students, including lab programs, notes, previous year question papers, and much more.",
  keywords: [
    "CET MCA 26",
    "MCA Notes",
    "MCA Lab Programs",
    "Previous Year Question Papers",
    "MCA Resources",
    "CET MCA Content Sharing",
    "MCA Study Materials",
  ],
  authors: [{ name: "CET MCA 26" }],
  generator: "v0.dev",
  openGraph: {
    title: "CET MCA 26 - MCA Notes, Lab Programs & P.Y.Qs",
    description:
      "Access curated MCA resources including lab programs, notes, and previous year question papers. Exclusively for CET MCA batch 26!",
    url: "https://cetmca26.live",
    type: "website",
    images: [
      {
        url: "https://raw.githubusercontent.com/cetmca26/MCA-Laboratory/refs/heads/main/assets/images/logo.jpg",
        width: 400,
        height: 400,
        alt: "CET MCA 26 Logo",
      },
    ],
  },
  icons: {
    icon: "/../public/logonobg.png",
    shortcut: "https://raw.githubusercontent.com/cetmca26/MCA-Laboratory/refs/heads/main/assets/images/logo.jpg",
  },
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
  metadataBase: new URL("https://cetmca26.live"),
  other: {
    // JSON-LD will be injected in layout below
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
 

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "CET MCA 26",
              url: "https://cetmca26.live",
              logo:
                "https://raw.githubusercontent.com/cetmca26/MCA-Laboratory/refs/heads/main/assets/images/logo.jpg",
              description:
                "CET MCA 26 provides high-quality resources for MCA students, including lab programs, notes, previous year question papers, and much more.",
              sameAs: ["https://cetmca26.github.io"],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
      
        </ThemeProvider>
      </body>
    </html>
  )
}
