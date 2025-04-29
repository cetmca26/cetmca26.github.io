"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { AlertCircle, Trophy } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore"
import type { LeaderboardEntry } from "@/types/quiz"
import { motion } from "framer-motion"

interface QuizLeaderboardProps {
  quizId: string
}

export function QuizLeaderboard({ quizId }: QuizLeaderboardProps) {
  const { user } = useAuth()
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quizName, setQuizName] = useState<string>("")

  useEffect(() => {
    async function fetchLeaderboard() {
      if (!quizId) return

      try {
        setLoading(true)

        // Get quiz details
        const quizDoc = await getDoc(doc(db, "quizzes", quizId))
        if (quizDoc.exists()) {
          setQuizName(quizDoc.data().name)
        }

        // Get all attempts for this quiz
        const attemptsQuery = query(collection(db, "quizAttempts"), where("quizId", "==", quizId))
        const attemptsSnapshot = await getDocs(attemptsQuery)

        if (attemptsSnapshot.empty) {
          setLeaderboard([])
          setLoading(false)
          return
        }

        // Aggregate scores by user
        const userScores: Record<string, { totalScore: number; quizzesTaken: number; timestamp: string }> = {}

        attemptsSnapshot.docs.forEach((doc) => {
          const attempt = doc.data()
          const userId = attempt.userId

          if (!userScores[userId] || new Date(attempt.endTime) > new Date(userScores[userId].timestamp)) {
            userScores[userId] = {
              totalScore: attempt.score,
              quizzesTaken: 1,
              timestamp: attempt.endTime,
            }
          }
        })

        // Get user details for each user
        const userPromises = Object.keys(userScores).map(async (userId) => {
          const userDoc = await getDoc(doc(db, "users", userId))

          if (userDoc.exists()) {
            return {
              userId,
              username: userDoc.data().username,
              totalScore: userScores[userId].totalScore,
              quizzesTaken: userScores[userId].quizzesTaken,
            } as LeaderboardEntry
          }

          return null
        })

        const leaderboardEntries = (await Promise.all(userPromises)).filter(Boolean) as LeaderboardEntry[]

        // Sort by total score (descending)
        leaderboardEntries.sort((a, b) => b.totalScore - a.totalScore)

        setLeaderboard(leaderboardEntries)
      } catch (err: any) {
        console.error("Error fetching leaderboard:", err)
        setError("Failed to load leaderboard. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [quizId])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="ml-2">Loading leaderboard...</p>
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

  if (leaderboard.length === 0) {
    return (
      <div className="text-center py-8">
        <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">No quiz attempts yet.</p>
        <p className="text-sm text-muted-foreground">
          Leaderboard will be available once users start taking this quiz.
        </p>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            {quizName} Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((entry, index) => (
                <TableRow key={entry.userId} className={entry.userId === user?.uid ? "bg-primary/5" : ""}>
                  <TableCell className="font-medium">
                    {index === 0 ? (
                      <span className="text-yellow-500 font-bold">🥇 1</span>
                    ) : index === 1 ? (
                      <span className="text-gray-500 font-bold">🥈 2</span>
                    ) : index === 2 ? (
                      <span className="text-amber-700 font-bold">🥉 3</span>
                    ) : (
                      index + 1
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${entry.username}`}
                          alt={entry.username}
                        />
                        <AvatarFallback>{entry.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className={entry.userId === user?.uid ? "font-medium" : ""}>
                        {entry.username}
                        {entry.userId === user?.uid && " (You)"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">{entry.totalScore}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}
