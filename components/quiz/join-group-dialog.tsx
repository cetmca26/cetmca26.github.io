"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore"

interface JoinGroupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function JoinGroupDialog({ open, onOpenChange }: JoinGroupDialogProps) {
  const { user } = useAuth()
  const [groupCode, setGroupCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      // Check if group exists
      const groupsRef = collection(db, "groups")
      const q = query(groupsRef, where("code", "==", groupCode))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        setError("Invalid group code. Please check and try again.")
        setLoading(false)
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
        setLoading(false)
        return
      }

      // Add user to group
      await addDoc(collection(db, "groupMembers"), {
        groupId,
        userId: user.uid,
        joinedAt: serverTimestamp(),
      })

      setGroupCode("")
      onOpenChange(false)
    } catch (err: any) {
      setError(err.message || "Failed to join group. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join a Group</DialogTitle>
          <DialogDescription>Enter the group code to join an existing group.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="group-code">Group Code</Label>
              <Input
                id="group-code"
                placeholder="Enter group code"
                value={groupCode}
                onChange={(e) => setGroupCode(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  Joining...
                </>
              ) : (
                "Join Group"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
