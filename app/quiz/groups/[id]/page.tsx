"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle, Users, Trophy, Clock, Share2, QrCode, Copy } from "lucide-react"
import { GroupQuizzes } from "@/components/quiz/group-quizzes"
import { GroupMembers } from "@/components/quiz/group-members"
import { GroupLeaderboard } from "@/components/quiz/group-leaderboard"
import { CreateQuizDialog } from "@/components/quiz/create-quiz-dialog"
import { QRCodeDialog } from "@/components/quiz/qr-code-dialog"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import type { Group } from "@/types/quiz"
import { useToast } from "@/hooks/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function GroupDetailPage() {
  const { id } = useParams() as { id: string }
  const { user, loading: authLoading } = useAuth()
  const { toast } = useToast()
  const [group, setGroup] = useState<Group | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreateQuizOpen, setIsCreateQuizOpen] = useState(false)
  const [isQrCodeOpen, setIsQrCodeOpen] = useState(false)

  useEffect(() => {
    async function fetchGroup() {
      if (!user || !id) return

      try {
        setLoading(true)

        const groupDoc = await getDoc(doc(db, "groups", id))

        if (!groupDoc.exists()) {
          setError("Group not found")
          setLoading(false)
          return
        }

        const groupData = {
          id: groupDoc.id,
          ...groupDoc.data(),
        } as Group

        setGroup(groupData)
        setIsAdmin(groupData.adminId === user.uid)
      } catch (err: any) {
        console.error("Error fetching group:", err)
        setError("Failed to load group details. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    if (!authLoading) {
      fetchGroup()
    }
  }, [id, user, authLoading])
  const getJoinUrl = () => {
    if (!group) return ""
    return `${window.location.origin}/quiz/join?code=${group.code}`
  }

  const shareGroupLink = () => {
    if (!group) return

    const joinUrl = getJoinUrl()

    if (navigator.share) {
      navigator
        .share({
          title: `Join ${group.name}`,
          text: `Click this link to join the "${group.name}" quiz group!`,
          url: joinUrl,
        })
        .catch((error) => {
          console.log("Error sharing:", error)
          copyShareLink(joinUrl)
        })
    } else {
      copyShareLink(joinUrl)
    }
  }

  const copyShareLink = (url: string) => {
    navigator.clipboard.writeText(url)
    toast({
      title: "Join link copied",
      description: "Share this link with others to join your group.",
    })
  }

  const showQrCode = () => {
    setIsQrCodeOpen(true)
  }

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="ml-2">Loading group details...</p>
      </div>
    )
  }

  if (error || !group) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Error</h1>
        <p className="text-muted-foreground mb-8">{error || "Group not found"}</p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">{group.name}</h1>
          <div className="flex gap-2">
            {isAdmin && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share Group
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => copyShareLink(getJoinUrl())}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={shareGroupLink}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Link
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={showQrCode}>
                    <QrCode className="h-4 w-4 mr-2" />
                    Show QR Code
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          {isAdmin && (
            <Button onClick={() => setIsCreateQuizOpen(true)} className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Create Quiz
            </Button>
          )}
        </div>
        </div>
        <p className="text-muted-foreground mt-2">
          Group Code: <span className="font-mono">{group.code}</span>
        </p>
      </div>

      <Tabs defaultValue="quizzes">
        <TabsList className="mb-6">
          <TabsTrigger value="quizzes" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Quizzes
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Leaderboard
          </TabsTrigger>
          <TabsTrigger value="members" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Members
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quizzes">
          <GroupQuizzes groupId={id} isAdmin={isAdmin} />
        </TabsContent>

        <TabsContent value="leaderboard">
          <GroupLeaderboard groupId={id} />
        </TabsContent>

        <TabsContent value="members">
          <GroupMembers groupId={id} isAdmin={isAdmin} />
        </TabsContent>
      </Tabs>

      <CreateQuizDialog open={isCreateQuizOpen} onOpenChange={setIsCreateQuizOpen} groupId={id} />
      {group && (
        <QRCodeDialog
          open={isQrCodeOpen}
          onOpenChange={setIsQrCodeOpen}
          groupName={group.name}
          joinUrl={getJoinUrl()}
        />
      )}
    </div>
  )
}
