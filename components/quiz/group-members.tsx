"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, UserX } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, doc, getDoc, deleteDoc } from "firebase/firestore"
import type { User } from "@/types/quiz"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface GroupMembersProps {
  groupId: string
  isAdmin: boolean
}

export function GroupMembers({ groupId, isAdmin }: GroupMembersProps) {
  const { user } = useAuth()
  const [members, setMembers] = useState<User[]>([])
  const [adminUser, setAdminUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [memberToRemove, setMemberToRemove] = useState<User | null>(null)
  const [removingMember, setRemovingMember] = useState(false)

  useEffect(() => {
    async function fetchMembers() {
      if (!user) return

      try {
        setLoading(true)

        // Get the group to find the admin
        const groupDoc = await getDoc(doc(db, "groups", groupId))

        if (!groupDoc.exists()) {
          setError("Group not found")
          setLoading(false)
          return
        }

        const groupData = groupDoc.data()
        const adminId = groupData.adminId

        // Get admin user details
        const adminUserDoc = await getDoc(doc(db, "users", adminId))

        if (adminUserDoc.exists()) {
          setAdminUser({
            id: adminUserDoc.id,
            ...adminUserDoc.data(),
          } as User)
        }

        // Get group members
        const membersQuery = query(collection(db, "groupMembers"), where("groupId", "==", groupId))

        const membersSnapshot = await getDocs(membersQuery)

        // Fetch user details for each member
        const memberPromises = membersSnapshot.docs.map(async (memberDoc) => {
          const memberData = memberDoc.data()
          const userDoc = await getDoc(doc(db, "users", memberData.userId))

          if (userDoc.exists()) {
            return {
              id: userDoc.id,
              ...userDoc.data(),
            } as User
          }

          return null
        })

        const memberUsers = (await Promise.all(memberPromises)).filter(Boolean) as User[]

        // Add admin if not already in the list
        if (adminUser && !memberUsers.some((m) => m.id === adminId)) {
          memberUsers.push(adminUser)
        }

        setMembers(memberUsers)
      } catch (err: any) {
        console.error("Error fetching members:", err)
        setError("Failed to load group members. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [groupId, user])

  const handleRemoveMember = async () => {
    if (!memberToRemove) return

    try {
      setRemovingMember(true)

      // Find the group member document
      const membersQuery = query(
        collection(db, "groupMembers"),
        where("groupId", "==", groupId),
        where("userId", "==", memberToRemove.id),
      )

      const membersSnapshot = await getDocs(membersQuery)

      if (!membersSnapshot.empty) {
        await deleteDoc(doc(db, "groupMembers", membersSnapshot.docs[0].id))

        // Update the UI
        setMembers((prev) => prev.filter((m) => m.id !== memberToRemove.id))
      }

      setMemberToRemove(null)
    } catch (err) {
      console.error("Error removing member:", err)
    } finally {
      setRemovingMember(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="ml-2">Loading members...</p>
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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <Card key={member.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${member.username}`}
                      alt={member.username}
                    />
                    <AvatarFallback>{member.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{member.username}</CardTitle>
                    {adminUser && member.id === adminUser.id && (
                      <Badge variant="outline" className="mt-1 bg-primary/10 text-primary">
                        Admin
                      </Badge>
                    )}
                  </div>
                </div>
                {isAdmin && member.id !== user?.uid && member.id !== adminUser?.id && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMemberToRemove(member)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <UserX className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{member.email}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!memberToRemove} onOpenChange={(open) => !open && setMemberToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {memberToRemove?.username} from this group? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemoveMember}
              disabled={removingMember}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {removingMember ? "Removing..." : "Remove"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
