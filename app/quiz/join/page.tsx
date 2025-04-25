"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, Users } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore"

export default function JoinGroupPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get("code")

  const [joining, setJoining] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [groupName, setGroupName] = useState<string | null>(null)

  useEffect(() => {
    async function checkGroup() {
      if (!code || !user) return

      try {
        // Check if group exists
        const groupsRef = collection(db, "groups")
        const q = query(groupsRef, where("code", "==", code))
        const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
          setError("Invalid group code. This group doesn't exist.")
          return
        }

        const groupDoc = querySnapshot.docs[0]
        const groupData = groupDoc.data()
        setGroupName(groupData.name)

        // Check if user is already a member
        const membersRef = collection(db, "groupMembers")
        const memberQuery = query(membersRef, where("groupId", "==", groupDoc.id), where("userId", "==", user.uid))
        const memberSnapshot = await getDocs(memberQuery)

        if (!memberSnapshot.empty) {
          setError("You are already a member of this group.")
          return
        }
      } catch (err: any) {
        console.error("Error checking group:", err)
        setError("Failed to check group. Please try again.")
      }
    }

    if (!authLoading) {
      checkGroup()
    }
  }, [code, user, authLoading])

  const handleJoinGroup = async () => {
    if (!code || !user) return

    try {
      setJoining(true)
      setError(null)

      // Get group ID
      const groupsRef = collection(db, "groups")
      const q = query(groupsRef, where("code", "==", code))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        setError("Invalid group code. This group doesn't exist.")
        setJoining(false)
        return
      }

      const groupDoc = querySnapshot.docs[0]
      const groupId = groupDoc.id

      // Check if user is already a member
      const membersRef = collection(db, "groupMembers")
      const memberQuery = query(membersRef, where("groupId", "==", groupId), where("userId", "==", user.uid))
      const memberSnapshot = await getDocs(memberQuery)

      if (!memberSnapshot.empty) {
        setError("You are already a member of this group.")
        setJoining(false)
        return
      }

      // Add user to group
      await addDoc(collection(db, "groupMembers"), {
        groupId,
        userId: user.uid,
        joinedAt: serverTimestamp(),
      })

      setSuccess(true)
      setTimeout(() => {
        router.push(`/quiz/groups/${groupId}`)
      }, 2000)
    } catch (err: any) {
      console.error("Error joining group:", err)
      setError(err.message || "Failed to join group. Please try again.")
    } finally {
      setJoining(false)
    }
  }

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="ml-2">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Join Group</CardTitle>
            <CardDescription>You need to be logged in to join a group</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Please log in or register to join this group.</AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/quiz")} className="w-full">
              Go to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (!code) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Join Group</CardTitle>
            <CardDescription>No group code provided</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No group code was provided in the link. Please ask for a valid join link.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/quiz")} className="w-full">
              Go to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Join Group</CardTitle>
          <CardDescription>
            {groupName ? `You're about to join "${groupName}"` : `Join group with code: ${code}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4 bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Successfully joined the group! Redirecting...</AlertDescription>
            </Alert>
          )}

          {!error && !success && (
            <div className="flex items-center justify-center py-6">
              <Users className="h-16 w-16 text-primary/50 mb-4" />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/quiz")} disabled={joining || success}>
            Cancel
          </Button>
          <Button onClick={handleJoinGroup} disabled={!!error || joining || success} className="ml-2">
            {joining ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                Joining...
              </>
            ) : (
              "Join Group"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
