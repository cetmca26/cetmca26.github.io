"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { db } from "@/lib/firebase"
import { doc, getDoc, collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore"
import type { Quiz, Question, QuizAttempt } from "@/types/quiz"
import { format, differenceInSeconds, addMinutes, isPast, isFuture } from "date-fns"
import { QuizLeaderboard } from "@/components/quiz/quiz-leaderboard"

export default function QuizPage() {
  const { id, quizId } = useParams() as { id: string; quizId: string }
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  const [quizStarted, setQuizStarted] = useState(false)
  const [quizEnded, setQuizEnded] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [endTime, setEndTime] = useState<Date | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ questionId: string; selectedAnswer: "A" | "B" | "C" | "D" | null }[]>([])
  const [score, setScore] = useState<number | null>(null)
  const [previousAttempt, setPreviousAttempt] = useState<QuizAttempt | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [quizExpired, setQuizExpired] = useState(false)
  

  useEffect(() => {
    async function fetchQuizAndQuestions() {
      if (!quizId) return

      try {
        setLoading(true)

        // Fetch quiz
        const quizDoc = await getDoc(doc(db, "quizzes", quizId))

        if (!quizDoc.exists()) {
          setError("Quiz not found")
          setLoading(false)
          return
        }

        const quizData = {
          id: quizDoc.id,
          ...quizDoc.data(),
        } as Quiz

        setQuiz(quizData)

        // Check if quiz is active
        const now = new Date()
        const startTime = new Date(quizData.startTime)
        const endTime = new Date(quizData.endTime)

        if (isFuture(startTime)) {
          setError("This quiz is not available yet.")
          setLoading(false)
          return
        }

        // Fetch questions regardless of quiz status to show them in the results
        const questionsQuery = query(collection(db, "questions"), where("quizId", "==", quizId))
        const questionsSnapshot = await getDocs(questionsQuery)
        const questionsData = questionsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Question[]
        setQuestions(questionsData)

        // Check if user is logged in
        if (user) {
          // Check if user is an admin
          const userDoc = await getDoc(doc(db, "users", user.uid))
          if (userDoc.exists() && userDoc.data().role === "admin") {
            setIsAdmin(true)
          }

          // Check if user has attempted this quiz
          const attemptsQuery = query(
            collection(db, "quizAttempts"),
            where("quizId", "==", quizId),
            where("userId", "==", user.uid),
          )

          const attemptsSnapshot = await getDocs(attemptsQuery)

          if (!attemptsSnapshot.empty) {
            const attemptData = {
              id: attemptsSnapshot.docs[0].id,
              ...attemptsSnapshot.docs[0].data(),
            } as QuizAttempt

            setPreviousAttempt(attemptData)
          }
        }

        // Check if quiz has ended
        if (isPast(endTime)) {
          setQuizExpired(true)
          setLoading(false)
          return
        }

        // Initialize answers array
        setAnswers(
          questionsData.map((q) => ({
            questionId: q.id,
            selectedAnswer: null,
          })),
        )
      } catch (err: any) {
        console.error("Error fetching quiz:", err)
        setError("Failed to load quiz. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    if (!authLoading) {
      fetchQuizAndQuestions()
    }
  }, [quizId, user, authLoading, router])

  // Timer effect
  useEffect(() => {
    if (!quizStarted || !quiz || !startTime || quizEnded) return

    const timerInterval = setInterval(() => {
      const now = new Date()
      const quizEndTime = endTime || addMinutes(startTime, quiz.duration)
      const remainingSeconds = Math.max(0, differenceInSeconds(quizEndTime, now))

      setTimeRemaining(remainingSeconds)

      if (remainingSeconds <= 0) {
        clearInterval(timerInterval)
        handleEndQuiz()
      }
    }, 1000)

    return () => clearInterval(timerInterval)
  }, [quizStarted, quiz, startTime, endTime, quizEnded])

  const handleStartQuiz = () => {
    // Check if user is logged in before starting the quiz
    if (!user) {
      setError("Please log in to take the quiz")
      return
    }
    
    const now = new Date()
    setStartTime(now)
    setEndTime(addMinutes(now, quiz?.duration || 0))
    setTimeRemaining((quiz?.duration || 0) * 60)
    setQuizStarted(true)
  }

  const handleSelectAnswer = (answer: "A" | "B" | "C" | "D") => {
    const updatedAnswers = [...answers]
    updatedAnswers[currentQuestionIndex].selectedAnswer = answer
    setAnswers(updatedAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleEndQuiz = async () => {
    if (!quiz || !user || submitting) return

    try {
      setSubmitting(true)
      setQuizEnded(true)

      // Calculate score
      let totalScore = 0

      for (let i = 0; i < questions.length; i++) {
        const question = questions[i]
        const answer = answers[i]

        if (answer.selectedAnswer === question.correctAnswer) {
          totalScore += 1
        }
      }

      setScore(totalScore)

      // Save attempt to database
      await addDoc(collection(db, "quizAttempts"), {
        quizId,
        userId: user.uid,
        startTime: startTime?.toISOString(),
        endTime: new Date().toISOString(),
        score: totalScore,
        answers,
        createdAt: serverTimestamp(),
      })

      setSubmitting(false)
    } catch (err) {
      console.error("Error ending quiz:", err)
      setSubmitting(false)
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="ml-2">Loading quiz...</p>
      </div>
    )
  }

  if (error || !quiz) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Error</h1>
        <p className="text-muted-foreground mb-8">{error || "Quiz not found"}</p>
        <Button onClick={() => router.push(`/quiz/groups/${id}`)}>Go Back</Button>
      </div>
    )
  }

  // Show previous attempt or expired quiz results
  if (previousAttempt || (quizExpired && !isAdmin) || (quizExpired && isAdmin)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-4" onClick={() => router.push(`/quiz/groups/${id}`)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Group
        </Button>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>{quiz.name}</CardTitle>
            <CardDescription>
              {isAdmin && !previousAttempt 
                ? "Admin View - Quiz Results" 
                : previousAttempt 
                  ? "You have already completed this quiz." 
                  : "This quiz has ended."}
            </CardDescription>
            {isAdmin && !previousAttempt && (
              <p className="text-xs text-muted-foreground mt-1">
                You are viewing this as an administrator
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {previousAttempt ? (
              <div className="flex items-center justify-center p-6 bg-primary/5 rounded-md">
                <div className="text-center">
                  <p className="text-lg font-medium mb-2">Your Score</p>
                  <p className="text-4xl font-bold text-primary">
                    {previousAttempt.score} / {questions.length}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Completed on {format(new Date(previousAttempt.endTime), "MMMM d, yyyy h:mm a")}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center p-6 bg-primary/5 rounded-md">
                <div className="text-center">
                  <p className="text-lg font-medium mb-2">Quiz Ended</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    This quiz ended on {format(new Date(quiz.endTime), "MMMM d, yyyy h:mm a")}
                  </p>
                </div>
              </div>
            )}

            {questions.length > 0 && previousAttempt && (
              <div className="space-y-4 mt-6">
                <h3 className="text-lg font-medium">Question Summary</h3>
                {questions.map((question, index) => {
                  const answer = previousAttempt.answers.find((a) => a.questionId === question.id)
                  const isCorrect = answer?.selectedAnswer === question.correctAnswer

                  return (
                    <div key={question.id} className="border rounded-md p-4">
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                        )}
                        <div>
                          <p className="font-medium mb-2">
                            {index + 1}. {question.question}
                          </p>
                          <div className="space-y-1 text-sm">
                            <p className={question.correctAnswer === "A" ? "text-green-600 font-medium" : ""}>
                              A: {question.optionA}
                              {question.correctAnswer === "A" && " (Correct)"}
                            </p>
                            <p className={question.correctAnswer === "B" ? "text-green-600 font-medium" : ""}>
                              B: {question.optionB}
                              {question.correctAnswer === "B" && " (Correct)"}
                            </p>
                            <p className={question.correctAnswer === "C" ? "text-green-600 font-medium" : ""}>
                              C: {question.optionC}
                              {question.correctAnswer === "C" && " (Correct)"}
                            </p>
                            <p className={question.correctAnswer === "D" ? "text-green-600 font-medium" : ""}>
                              D: {question.optionD}
                              {question.correctAnswer === "D" && " (Correct)"}
                            </p>
                          </div>
                          {answer?.selectedAnswer && answer.selectedAnswer !== question.correctAnswer && (
                            <p className="text-red-500 text-sm mt-2">You selected: {answer.selectedAnswer}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Show questions for expired quiz without user attempt or for admin */}
            {questions.length > 0 && ((quizExpired && !previousAttempt) || (isAdmin && !previousAttempt)) && (
              <div className="space-y-4 mt-6">
                <h3 className="text-lg font-medium">Quiz Questions</h3>
                {questions.map((question, index) => (
                  <div key={question.id} className="border rounded-md p-4">
                    <div className="flex items-start gap-2">
                      <div>
                        <p className="font-medium mb-2">
                          {index + 1}. {question.question}
                        </p>
                        <div className="space-y-1 text-sm">
                          <p className={question.correctAnswer === "A" ? "text-green-600 font-medium" : ""}>
                            A: {question.optionA}
                            {question.correctAnswer === "A" && " (Correct)"}
                          </p>
                          <p className={question.correctAnswer === "B" ? "text-green-600 font-medium" : ""}>
                            B: {question.optionB}
                            {question.correctAnswer === "B" && " (Correct)"}
                          </p>
                          <p className={question.correctAnswer === "C" ? "text-green-600 font-medium" : ""}>
                            C: {question.optionC}
                            {question.correctAnswer === "C" && " (Correct)"}
                          </p>
                          <p className={question.correctAnswer === "D" ? "text-green-600 font-medium" : ""}>
                            D: {question.optionD}
                            {question.correctAnswer === "D" && " (Correct)"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push(`/quiz/groups/${id}`)} className="w-full">
              Return to Group
            </Button>
          </CardFooter>
        </Card>

        {/* Render leaderboard for logged in users and admins */}
        <div className="mt-8">
          {user || isAdmin ? (
            <QuizLeaderboard quizId={quizId} />
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">Please login to view the leaderboard</h2>
              <p className="text-muted-foreground">You must be logged in to see quiz rankings.</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (!quizStarted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-4" onClick={() => router.push(`/quiz/groups/${id}`)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Group
        </Button>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>{quiz.name}</CardTitle>
            <CardDescription>{quiz.description}</CardDescription>
            {isAdmin && (
              <p className="text-xs text-muted-foreground mt-1">
                You are viewing this as an administrator
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Duration: {quiz.duration} minutes</p>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Questions: {questions.length}</p>
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Once you start the quiz, you will have {quiz.duration} minutes to complete it. You cannot pause or
                restart the quiz once it has begun.
              </AlertDescription>
            </Alert>

            {/* Show login message if user is not logged in and not admin */}
            {!user && (
              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-700">
                  Please log in to take this quiz and view the leaderboard.
                </AlertDescription>
              </Alert>
            )}
            
            {/* Special message for admins */}
            {isAdmin && (
              <Alert className="bg-blue-50 border-blue-200">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-700">
                  As an administrator, you can view the quiz questions and leaderboard without taking the quiz.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button 
              onClick={handleStartQuiz} 
              className="w-full" 
              disabled={questions.length === 0 || !user}
            >
              {user ? "Start Quiz" : "Login Required to Start"}
            </Button>
            
            {/* Special button for admins to view results without taking the quiz */}
            {isAdmin && (
              <Button 
                onClick={() => setQuizExpired(true)} 
                variant="outline"
                className="w-full"
              >
                View Quiz Results (Admin)
              </Button>
            )}
          </CardFooter>
        </Card>
        
        {/* Show leaderboard for admins even before taking the quiz */}
        {isAdmin && (
          <div className="mt-8">
            <QuizLeaderboard quizId={quizId} />
          </div>
        )}
      </div>
    )
  }

  if (quizEnded) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>{quiz.name}</CardTitle>
            <CardDescription>Quiz completed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center p-6 bg-primary/5 rounded-md">
              <div className="text-center">
                <p className="text-lg font-medium mb-2">Your Score</p>
                <p className="text-4xl font-bold text-primary">
                  {score} / {questions.length}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {Math.round(((score || 0) / questions.length) * 100)}% correct
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Question Summary</h3>
              {questions.map((question, index) => {
                const answer = answers[index]
                const isCorrect = answer.selectedAnswer === question.correctAnswer

                return (
                  <div key={question.id} className="border rounded-md p-4">
                    <div className="flex items-start gap-2">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium mb-2">
                          {index + 1}. {question.question}
                        </p>
                        <div className="space-y-1 text-sm">
                          <p className={question.correctAnswer === "A" ? "text-green-600 font-medium" : ""}>
                            A: {question.optionA}
                            {question.correctAnswer === "A" && " (Correct)"}
                          </p>
                          <p className={question.correctAnswer === "B" ? "text-green-600 font-medium" : ""}>
                            B: {question.optionB}
                            {question.correctAnswer === "B" && " (Correct)"}
                          </p>
                          <p className={question.correctAnswer === "C" ? "text-green-600 font-medium" : ""}>
                            C: {question.optionC}
                            {question.correctAnswer === "C" && " (Correct)"}
                          </p>
                          <p className={question.correctAnswer === "D" ? "text-green-600 font-medium" : ""}>
                            D: {question.optionD}
                            {question.correctAnswer === "D" && " (Correct)"}
                          </p>
                        </div>
                        {answer.selectedAnswer && answer.selectedAnswer !== question.correctAnswer && (
                          <p className="text-red-500 text-sm mt-2">You selected: {answer.selectedAnswer}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push(`/quiz/groups/${id}`)} className="w-full">
              Return to Group
            </Button>
          </CardFooter>
        </Card>
        
        {/* Render leaderboard for logged in users and admins */}
        <div className="mt-8">
          {user || isAdmin ? (
            <QuizLeaderboard quizId={quizId} />
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">Please login to view the leaderboard</h2>
              <p className="text-muted-foreground">You must be logged in to see quiz rankings.</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const currentAnswer = answers[currentQuestionIndex]

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{quiz.name}</CardTitle>
              <CardDescription>
                Question {currentQuestionIndex + 1} of {questions.length}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-mono font-bold">{formatTime(timeRemaining)}</div>
              <p className="text-xs text-muted-foreground">Time Remaining</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="h-2" />

          <div className="space-y-4">
            <h3 className="text-xl font-medium">{currentQuestion.question}</h3>

            <RadioGroup
              value={currentAnswer.selectedAnswer || ""}
              onValueChange={(value) => handleSelectAnswer(value as "A" | "B" | "C" | "D")}
              className="space-y-3"
            >
              <div className="flex items-start space-x-2 border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="A" id="option-a" className="mt-1" />
                <Label htmlFor="option-a" className="flex-1 cursor-pointer">
                  {currentQuestion.optionA}
                </Label>
              </div>
              <div className="flex items-start space-x-2 border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="B" id="option-b" className="mt-1" />
                <Label htmlFor="option-b" className="flex-1 cursor-pointer">
                  {currentQuestion.optionB}
                </Label>
              </div>
              <div className="flex items-start space-x-2 border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="C" id="option-c" className="mt-1" />
                <Label htmlFor="option-c" className="flex-1 cursor-pointer">
                  {currentQuestion.optionC}
                </Label>
              </div>
              <div className="flex items-start space-x-2 border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="D" id="option-d" className="mt-1" />
                <Label htmlFor="option-d" className="flex-1 cursor-pointer">
                  {currentQuestion.optionD}
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
            Previous
          </Button>

          <div className="flex gap-2">
            {currentQuestionIndex === questions.length - 1 ? (
              <Button onClick={handleEndQuiz} disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Quiz"}
              </Button>
            ) : (
              <Button onClick={handleNextQuestion}>Next</Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}