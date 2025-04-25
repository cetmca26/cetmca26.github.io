"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc, collection, addDoc, deleteDoc, query, where, getDocs } from "firebase/firestore"
import type { Quiz, Question } from "@/types/quiz"
import { format } from "date-fns"
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

export default function QuizEditPage() {
  const { groupId, quizId } = useParams() as { groupId: string; quizId: string }
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("details")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    async function fetchQuizAndQuestions() {
      if (!user || !quizId) return

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

        // Check if user is admin
        const groupDoc = await getDoc(doc(db, "groups", quizData.groupId))

        if (!groupDoc.exists() || groupDoc.data().adminId !== user.uid) {
          router.push(`/quiz/groups/${groupId}`)
          return
        }

        setQuiz(quizData)

        // Fetch questions
        const questionsQuery = query(collection(db, "questions"), where("quizId", "==", quizId))

        const questionsSnapshot = await getDocs(questionsQuery)

        const questionsData = questionsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Question[]

        setQuestions(questionsData)
      } catch (err: any) {
        console.error("Error fetching quiz:", err)
        setError("Failed to load quiz details. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    if (!authLoading) {
      fetchQuizAndQuestions()
    }
  }, [quizId, user, authLoading, router, groupId])

  const handleAddQuestion = async () => {
    if (!quiz) return

    const newQuestion: Omit<Question, "id"> = {
      quizId,
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "A",
    }

    try {
      const questionRef = await addDoc(collection(db, "questions"), newQuestion)

      setQuestions([...questions, { id: questionRef.id, ...newQuestion }])
    } catch (err) {
      console.error("Error adding question:", err)
    }
  }

  const handleUpdateQuestion = (index: number, field: keyof Question, value: string) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value }
    setQuestions(updatedQuestions)
  }

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      await deleteDoc(doc(db, "questions", questionId))
      setQuestions(questions.filter((q) => q.id !== questionId))
    } catch (err) {
      console.error("Error deleting question:", err)
    }
  }

  const handleSaveQuiz = async () => {
    if (!quiz) return

    try {
      setSaving(true)

      // Save all questions
      for (const question of questions) {
        await updateDoc(doc(db, "questions", question.id), {
          question: question.question,
          optionA: question.optionA,
          optionB: question.optionB,
          optionC: question.optionC,
          optionD: question.optionD,
          correctAnswer: question.correctAnswer,
        })
      }

      setSaving(false)
      router.push(`/quiz/groups/${groupId}`)
    } catch (err) {
      console.error("Error saving quiz:", err)
      setSaving(false)
    }
  }

  const handleDeleteQuiz = async () => {
    if (!quiz) return

    try {
      setDeleting(true)

      // Delete all questions
      for (const question of questions) {
        await deleteDoc(doc(db, "questions", question.id))
      }

      // Delete quiz
      await deleteDoc(doc(db, "quizzes", quizId))

      setDeleting(false)
      router.push(`/quiz/groups/${groupId}`)
    } catch (err) {
      console.error("Error deleting quiz:", err)
      setDeleting(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="ml-2">Loading quiz details...</p>
      </div>
    )
  }

  if (error || !quiz) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Error</h1>
        <p className="text-muted-foreground mb-8">{error || "Quiz not found"}</p>
        <Button onClick={() => router.push(`/quiz/groups/${groupId}`)}>Go Back</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="ghost" className="mb-4" onClick={() => router.push(`/quiz/groups/${groupId}`)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Group
        </Button>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">{quiz.name}</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Quiz
            </Button>
            <Button onClick={handleSaveQuiz} disabled={saving} className="flex items-center gap-2">
              {saving ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Quiz
                </>
              )}
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground mt-2">Created on {format(new Date(quiz.createdAt), "MMMM d, yyyy")}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="details">Quiz Details</TabsTrigger>
          <TabsTrigger value="questions">Questions ({questions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Information</CardTitle>
              <CardDescription>Basic information about the quiz.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Time</Label>
                  <div className="p-2 border rounded-md bg-muted">
                    {format(new Date(quiz.startTime), "MMMM d, yyyy h:mm a")}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>End Time</Label>
                  <div className="p-2 border rounded-md bg-muted">
                    {format(new Date(quiz.endTime), "MMMM d, yyyy h:mm a")}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <div className="p-2 border rounded-md bg-muted">{quiz.duration} minutes</div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <div className="p-2 border rounded-md bg-muted min-h-[100px]">
                  {quiz.description || "No description provided."}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions">
          <div className="space-y-6">
            {questions.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground mb-4">No questions added yet.</p>
                  <Button onClick={handleAddQuestion}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Question
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {questions.map((question, index) => (
                  <Card key={question.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`question-${index}`}>Question</Label>
                        <Textarea
                          id={`question-${index}`}
                          value={question.question}
                          onChange={(e) => handleUpdateQuestion(index, "question", e.target.value)}
                          placeholder="Enter your question here"
                          rows={2}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`option-a-${index}`}>Option A</Label>
                          <Input
                            id={`option-a-${index}`}
                            value={question.optionA}
                            onChange={(e) => handleUpdateQuestion(index, "optionA", e.target.value)}
                            placeholder="Option A"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`option-b-${index}`}>Option B</Label>
                          <Input
                            id={`option-b-${index}`}
                            value={question.optionB}
                            onChange={(e) => handleUpdateQuestion(index, "optionB", e.target.value)}
                            placeholder="Option B"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`option-c-${index}`}>Option C</Label>
                          <Input
                            id={`option-c-${index}`}
                            value={question.optionC}
                            onChange={(e) => handleUpdateQuestion(index, "optionC", e.target.value)}
                            placeholder="Option C"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`option-d-${index}`}>Option D</Label>
                          <Input
                            id={`option-d-${index}`}
                            value={question.optionD}
                            onChange={(e) => handleUpdateQuestion(index, "optionD", e.target.value)}
                            placeholder="Option D"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Correct Answer</Label>
                        <RadioGroup
                          value={question.correctAnswer}
                          onValueChange={(value) =>
                            handleUpdateQuestion(index, "correctAnswer", value as "A" | "B" | "C" | "D")
                          }
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="A" id={`correct-a-${index}`} />
                            <Label htmlFor={`correct-a-${index}`}>A</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="B" id={`correct-b-${index}`} />
                            <Label htmlFor={`correct-b-${index}`}>B</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="C" id={`correct-c-${index}`} />
                            <Label htmlFor={`correct-c-${index}`}>C</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="D" id={`correct-d-${index}`} />
                            <Label htmlFor={`correct-d-${index}`}>D</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <div className="flex justify-center">
                  <Button onClick={handleAddQuestion} variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Another Question
                  </Button>
                </div>
              </>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSaveQuiz} disabled={saving} className="flex items-center gap-2">
              {saving ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Quiz
                </>
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Quiz</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this quiz? This action cannot be undone. All questions and attempts will
              be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteQuiz}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
