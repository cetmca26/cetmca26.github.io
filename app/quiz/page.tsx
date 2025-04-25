import { Suspense } from "react"
import { QuizDashboard } from "@/components/quiz/quiz-dashboard"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Quiz Platform | CETMCA26",
  description: "Participate in quizzes and compete with other students",
}

export default function QuizPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Quiz Platform</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Create groups, post quizzes, and participate in timed quizzes. Compete with other students and track your
          progress.
        </p>
      </div>

      <Suspense fallback={<QuizDashboardSkeleton />}>
        <QuizDashboard />
      </Suspense>
    </div>
  )
}

function QuizDashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="border rounded-lg p-6 space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
