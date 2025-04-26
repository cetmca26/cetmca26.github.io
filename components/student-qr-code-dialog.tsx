"use client"

import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Share2, Copy, Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface StudentQRCodeDialogProps {
  studentId: string
  studentName: string
}

export function StudentQRCodeDialog({ studentId, studentName }: StudentQRCodeDialogProps) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  // Generate the portfolio URL
  const portfolioUrl =
    typeof window !== "undefined" ? `${window.location.origin}/students/${studentId}` : `/students/${studentId}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portfolioUrl)
    toast({
      title: "Link copied!",
      description: "Portfolio link has been copied to clipboard",
    })
  }

  const handleDownloadQR = () => {
    const canvas = document.getElementById("student-qr-code") as HTMLCanvasElement
    if (!canvas) return

    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")

    const downloadLink = document.createElement("a")
    downloadLink.href = pngUrl
    downloadLink.download = `${studentName.replace(/\s+/g, "-").toLowerCase()}-portfolio-qr.png`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)

    toast({
      title: "QR Code downloaded!",
      description: "The QR code has been downloaded as an image",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Share portfolio">
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Share Portfolio</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Portfolio</DialogTitle>
          <DialogDescription>Share {studentName}'s portfolio with others using this QR code or link.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-4">
          <div className="bg-white p-4 rounded-lg mb-4">
            <QRCodeSVG
              id="student-qr-code"
              value={portfolioUrl}
              size={200}
              level="H"
              includeMargin
              imageSettings={{
                src: "/placeholder.png?height=40&width=40",
                height: 40,
                width: 40,
                excavate: true,
              }}
            />
          </div>
          <p className="text-sm text-muted-foreground mb-4 text-center">
            Scan this QR code to view {studentName}'s portfolio
          </p>
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button variant="outline" className="flex-1 flex items-center gap-2" onClick={handleCopyLink}>
              <Copy className="h-4 w-4" />
              <span>Copy Link</span>
            </Button>
            <Button variant="outline" className="flex-1 flex items-center gap-2" onClick={handleDownloadQR}>
              <Download className="h-4 w-4" />
              <span>Download QR</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
