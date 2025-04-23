import { Suspense } from "react"
import { ContributorsList } from "@/components/contributors-list"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Contributors | CETMCA26",
  description: "Meet the contributors of CETMCA26 GitHub organization",
}

export default function ContributorsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Contributors</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Meet the people who contribute to CETMCA26 projects and see their contribution statistics.
        </p>
      </div>

      <Suspense fallback={<ContributorsListSkeleton />}>
        <ContributorsList />
      </Suspense>
    </div>
  )
}

function ContributorsListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="border rounded-lg p-6 space-y-4 flex flex-col items-center text-center">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
    </div>
  )
}
