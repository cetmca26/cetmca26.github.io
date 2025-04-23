import { Suspense } from "react"
import { StudentsList } from "@/components/students-list"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Students | CETMCA26",
  description: "Browse through the portfolios of CETMCA26 students",
}

export default function StudentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Students</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse through the portfolios of CETMCA26 students and learn about their skills, projects, and experiences.
        </p>
      </div>

      <Suspense fallback={<StudentsListSkeleton />}>
        <StudentsList />
      </Suspense>
    </div>
  )
}

function StudentsListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="border rounded-lg p-6 space-y-4">
            <Skeleton className="h-32 w-32 rounded-full mx-auto" />
            <Skeleton className="h-6 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
    </div>
  )
}
