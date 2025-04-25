"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { useRouter } from "next/navigation"

interface CreateQuizDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  groupId: string
}

export function CreateQuizDialog({ open, onOpenChange, groupId }: CreateQuizDialogProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [quizData, setQuizData] = useState({
    name: "",
    description: "",
    startTime: "",
    endTime: "",
    duration: 20, // Default duration in minutes
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setQuizData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      // Validate dates
      const startTime = new Date(quizData.startTime)
      const endTime = new Date(quizData.endTime)

      if (startTime >= endTime) {
        setError("End time must be after start time")
        setLoading(false)
        return
      }

      const quizRef = await addDoc(collection(db, "quizzes"), {
        groupId,
        name: quizData.name,
        description: quizData.description,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration: Number(quizData.duration),
        createdBy: user.uid,
        createdAt: serverTimestamp(),
      })

      onOpenChange(false)
      router.push(`/quiz/groups/${groupId}/quizzes/${quizRef.id}/edit`)
    } catch (err: any) {
      setError(err.message || "Failed to create quiz. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Create a New Quiz</DialogTitle>
          <DialogDescription>Set up a new quiz for your group members.</DialogDescription>
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
              <Label htmlFor="name">Quiz Title</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Midterm Review Quiz"
                value={quizData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Provide details about the quiz"
                value={quizData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  name="startTime"
                  type="datetime-local"
                  value={quizData.startTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  name="endTime"
                  type="datetime-local"
                  value={quizData.endTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                min="1"
                max="180"
                value={quizData.duration}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-muted-foreground">
                Time allowed for each participant to complete the quiz once started.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  Creating...
                </>
              ) : (
                "Create Quiz"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
