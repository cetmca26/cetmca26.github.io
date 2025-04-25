"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Download } from "lucide-react"
import  QRCode  from "qrcode"

interface QRCodeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  groupName: string
  joinUrl: string
}

export function QRCodeDialog({ open, onOpenChange, groupName, joinUrl }: QRCodeDialogProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const generateQRCode = async () => {
      if (open && joinUrl) {
        setLoading(true)
        try {
          const qr = await QRCode.toDataURL(joinUrl)
          setQrCodeUrl(qr)
        } catch (err) {
          console.error("QR Code generation failed", err)
        } finally {
          setLoading(false)
        }
      }
    }
  
    generateQRCode()
  }, [open, joinUrl])

  const downloadQRCode = () => {
    if (!qrCodeUrl) return

    const link = document.createElement("a")
    link.href = qrCodeUrl
    link.download = `${groupName.replace(/\s+/g, "-").toLowerCase()}-qr-code.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Group QR Code</DialogTitle>
          <DialogDescription>
            Share this QR code to let others join your group. They can scan it with their phone camera.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-4">
          {loading ? (
            <div className="h-[300px] w-[300px] flex items-center justify-center bg-muted rounded-md">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            </div>
          ) : (
            <div className="p-4 bg-white rounded-md">
              <img src={qrCodeUrl || ""} alt={`QR Code for joining ${groupName}`} className="h-[300px] w-[300px]" />
            </div>
          )}
          <p className="mt-4 text-sm text-center text-muted-foreground">
            Scan this QR code to join <strong>{groupName}</strong>
          </p>
        </div>
        <DialogFooter>
          <Button onClick={downloadQRCode} className="w-full" disabled={loading}>
            <Download className="mr-2 h-4 w-4" />
            Download QR Code
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
