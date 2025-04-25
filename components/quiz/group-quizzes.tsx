"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Clock, Calendar } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, orderBy } from "firebase/firestore"
import type { Quiz } from "@/types/quiz"
import Link from "next/link"
import { format, isPast, isFuture } from "date-fns"

interface GroupQuizzesProps {
  groupId: string
  isAdmin: boolean
}

export function GroupQuizzes({ groupId, isAdmin }: GroupQuizzesProps) {
  const { user } = useAuth()
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchQuizzes() {
      if (!user) return

      try {
        setLoading(true)

        const quizzesQuery = query(
          collection(db, "quizzes"),
          where("groupId", "==", groupId),
          orderBy("startTime", "desc"),
        )

        const quizzesSnapshot = await getDocs(quizzesQuery)

        const quizzesData = quizzesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Quiz[]

        setQuizzes(quizzesData)
      } catch (err: any) {
        console.error("Error fetching quizzes:", err)
        setError("Failed to load quizzes. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchQuizzes()
  }, [groupId, user])

  const getQuizStatus = (quiz: Quiz) => {
    const now = new Date()
    const startTime = new Date(quiz.startTime)
    const endTime = new Date(quiz.endTime)

    if (isFuture(startTime)) {
      return "upcoming"
    } else if (isPast(endTime)) {
      return "completed"
    } else {
      return "active"
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="ml-2">Loading quizzes...</p>
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

  if (quizzes.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">No quizzes available in this group yet.</p>
        {isAdmin && (
          <p className="text-sm text-muted-foreground mb-6">Create a new quiz using the "Create Quiz" button.</p>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.map((quiz) => {
        const status = getQuizStatus(quiz)

        return (
          <Card key={quiz.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{quiz.name}</CardTitle>
                  <CardDescription>
                    {status === "upcoming" && (
                      <Badge
                        variant="outline"
                        className="mt-1 bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      >
                        Upcoming
                      </Badge>
                    )}
                    {status === "active" && (
                      <Badge
                        variant="outline"
                        className="mt-1 bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                      >
                        Active
                      </Badge>
                    )}
                    {status === "completed" && (
                      <Badge
                        variant="outline"
                        className="mt-1 bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      >
                        Completed
                      </Badge>
                    )}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {quiz.description && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{quiz.description}</p>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(quiz.startTime), "MMM d, yyyy h:mm a")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{quiz.duration} minutes</span>
              </div>
            </CardContent>
            <CardFooter>
              {isAdmin ? (
                <Link href={`/quiz/groups/${groupId}/quizzes/${quiz.id}/edit`} className="w-full">
                  <Button variant="outline" className="w-full">
                    {status === "upcoming" ? "Edit Quiz" : "View Results"}
                  </Button>
                </Link>
              ) : (
                <Link href={`/quiz/groups/${groupId}/quizzes/${quiz.id}`} className="w-full">
                  <Button className="w-full" disabled={status === "upcoming"}>
                    {status === "upcoming" && "Not Available Yet"}
                    {status === "active" && "Take Quiz"}
                    {status === "completed" && "View Results"}
                  </Button>
                </Link>
              )}
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
