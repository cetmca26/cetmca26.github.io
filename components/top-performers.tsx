"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Trophy, ArrowRight, AlertCircle } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, getDocs, doc, getDoc } from "firebase/firestore"
import type { LeaderboardEntry } from "@/types/quiz"
import Link from "next/link"

export function TopPerformers() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    async function fetchTopPerformers() {
      try {
        setLoading(true)

        // Check if Firebase is initialized
        if (!db) {
          setError("Firebase is not initialized")
          setLoading(false)
          return
        }

        // Get all quiz attempts
        const attemptsSnapshot = await getDocs(collection(db, "quizAttempts"))

        // Aggregate scores by user
        const userScores: Record<string, { totalScore: number; quizzesTaken: number }> = {}

        attemptsSnapshot.docs.forEach((doc) => {
          const attempt = doc.data()
          const userId = attempt.userId

          if (!userScores[userId]) {
            userScores[userId] = { totalScore: 0, quizzesTaken: 0 }
          }

          userScores[userId].totalScore += attempt.score
          userScores[userId].quizzesTaken += 1
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

        // Limit to top 5
        setLeaderboard(leaderboardEntries.slice(0, 5))
      } catch (err: any) {
        console.error("Error fetching top performers:", err)
        setError("Failed to load top performers.")
      } finally {
        setLoading(false)
      }
    }

    fetchTopPerformers()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Top Quiz Performers
          </CardTitle>
          <CardDescription>Loading top performers...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Top Quiz Performers
          </CardTitle>
          <CardDescription className="flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            <span>Quiz data unavailable</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-6">
          <Link href="/quiz">
            <Button>
              Go to Quiz Platform
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  if (leaderboard.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Top Quiz Performers
          </CardTitle>
          <CardDescription>No quiz attempts yet. Be the first to take a quiz!</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-6">
          <Link href="/quiz">
            <Button>
              Go to Quiz Platform
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Top Quiz Performers
        </CardTitle>
        <CardDescription>Students with the highest scores across all quizzes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboard.map((entry, index) => (
            <div key={entry.userId} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 text-center">
                  {index === 0 ? (
                    <span className="text-yellow-500 font-bold text-xl">🥇</span>
                  ) : index === 1 ? (
                    <span className="text-gray-500 font-bold text-xl">🥈</span>
                  ) : index === 2 ? (
                    <span className="text-amber-700 font-bold text-xl">🥉</span>
                  ) : (
                    <span className="text-muted-foreground font-medium">{index + 1}</span>
                  )}
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${entry.username}`}
                    alt={entry.username}
                  />
                  <AvatarFallback>{entry.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{entry.username}</p>
                  <p className="text-xs text-muted-foreground">{entry.quizzesTaken} quizzes taken</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{entry.totalScore}</p>
                <p className="text-xs text-muted-foreground">points</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <div className="px-6 pb-4">
        <Link href="/quiz">
          <Button variant="outline" className="w-full">
            View All Rankings
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Card>
  )
}
