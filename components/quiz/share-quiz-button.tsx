"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Copy, QrCode } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { QRCodeDialog } from "@/components/quiz/qr-code-dialog"
import { useToast } from "@/hooks/use-toast"

interface ShareQuizButtonProps {
  quizId: string
  quizName: string
  groupId: string
}

export function ShareQuizButton({ quizId, quizName, groupId }: ShareQuizButtonProps) {
  const { toast } = useToast()
  const [isQrCodeOpen, setIsQrCodeOpen] = useState(false)

  const getShareUrl = () => {
    return `${window.location.origin}/quiz/groups/${groupId}/quizzes/${quizId}`
  }

  const handleShare = () => {
    const url = getShareUrl()

    if (navigator.share) {
      navigator
        .share({
          title: `CETMCA26 Quiz: ${quizName}`,
          text: `Join me in taking the "${quizName}" quiz on CETMCA26 Quiz Platform!`,
          url: url,
        })
        .catch((error) => {
          console.log("Error sharing:", error)
          copyToClipboard(url)
        })
    } else {
      copyToClipboard(url)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Link copied",
      description: "Quiz link copied to clipboard",
    })
  }

  const showQrCode = () => {
    setIsQrCodeOpen(true)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => copyToClipboard(getShareUrl())}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Link
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </DropdownMenuItem>
          <DropdownMenuItem onClick={showQrCode}>
            <QrCode className="h-4 w-4 mr-2" />
            Show QR Code
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <QRCodeDialog open={isQrCodeOpen} onOpenChange={setIsQrCodeOpen} groupName={quizName} joinUrl={getShareUrl()} />
    </>
  )
}
