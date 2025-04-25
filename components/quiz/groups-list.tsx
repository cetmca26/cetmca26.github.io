"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, ClipboardCopy, Share2, AlertCircle } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore"
import type { Group } from "@/types/quiz"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export function GroupsList() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGroups() {
      if (!user) return

      try {
        setLoading(true)

        // Get groups where user is admin
        const adminGroupsQuery = query(collection(db, "groups"), where("adminId", "==", user.uid))
        const adminGroupsSnapshot = await getDocs(adminGroupsQuery)

        // Get groups where user is a member
        const memberGroupsQuery = query(collection(db, "groupMembers"), where("userId", "==", user.uid))
        const memberGroupsSnapshot = await getDocs(memberGroupsQuery)

        // Fetch group details for member groups
        const memberGroupIds = memberGroupsSnapshot.docs.map((doc) => doc.data().groupId)
        const memberGroups: Group[] = []

        for (const groupId of memberGroupIds) {
          const groupDoc = await getDoc(doc(db, "groups", groupId))
          if (groupDoc.exists()) {
            memberGroups.push({
              id: groupDoc.id,
              ...groupDoc.data(),
            } as Group)
          }
        }

        // Combine admin and member groups
        const adminGroups = adminGroupsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Group[]

        // Remove duplicates
        const allGroups = [...adminGroups]
        memberGroups.forEach((group) => {
          if (!allGroups.some((g) => g.id === group.id)) {
            allGroups.push(group)
          }
        })

        setGroups(allGroups)
      } catch (err: any) {
        console.error("Error fetching groups:", err)
        setError("Failed to load groups. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchGroups()
  }, [user])

  const copyGroupCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Group code copied",
      description: "You can now share this code with others to join your group.",
    })
  }
  const shareGroupLink = (code: string) => {
    const joinUrl = `${window.location.origin}/quiz/join?code=${code}`

    if (navigator.share) {
      navigator
        .share({
          title: "Join my quiz group",
          text: "Click this link to join my quiz group!",
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="ml-2">Loading groups...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <p className="text-destructive">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  if (groups.length === 0) {
    return (
      <div className="text-center py-8">
        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">You haven't joined any groups yet.</p>
        <p className="text-sm text-muted-foreground mb-6">
          Create a new group or join an existing one using a group code.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group) => (
        <Card key={group.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{group.name}</CardTitle>
                <CardDescription>
                  {group.adminId === user?.uid ? (
                    <Badge variant="outline" className="mt-1">
                      Admin
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="mt-1">
                      Member
                    </Badge>
                  )}
                </CardDescription>
              </div>
              {group.adminId === user?.uid && (
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => shareGroupLink(group.code)}
                    title="Share join link"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => copyGroupCode(group.code)} title="Copy group code">
                    <ClipboardCopy className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {group.adminId === user?.uid && (
              <p className="text-sm text-muted-foreground mb-2">
                Group Code: <span className="font-mono">{group.code}</span>
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Link href={`/quiz/groups/${group.id}`} className="w-full">
              <Button className="w-full">View Group</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
