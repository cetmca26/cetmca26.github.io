"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Star, GitFork } from "lucide-react"
import { motion } from "framer-motion"

interface Repository {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string
  stargazers_count: number
  forks_count: number
  language: string
  topics: string[]
}

export function ProjectsList() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch("https://api.github.com/orgs/cetmca26/repos")

        if (!response.ok) {
          throw new Error("Failed to fetch repositories")
        }

        const data = await response.json()
        setRepos(data)
        setLoading(false)
      } catch (err) {
        setError("Failed to load projects. Please try again later.")
        setLoading(false)
        console.error("Error fetching repos:", err)
      }
    }

    fetchRepos()
  }, [])

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-muted-foreground">Loading projects...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">{error}</p>
        <div className="mt-4">
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  // If no repos are found but no error occurred
  if (repos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No projects found in the CETMCA26 GitHub organization.</p>
        <div className="mt-4">
          <a href="https://github.com/cetmca26" target="_blank" rel="noopener noreferrer">
            <Button>Visit GitHub Organization</Button>
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repos.map((repo, index) => (
        <motion.div
          key={repo.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{repo.name}</CardTitle>
              <CardDescription>
                {repo.language && (
                  <Badge variant="outline" className="mr-2">
                    {repo.language}
                  </Badge>
                )}
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="h-4 w-4" />
                    <span>{repo.forks_count}</span>
                  </div>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{repo.description || "No description provided"}</p>
              {repo.topics && repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <Badge key={topic} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                  {repo.topics.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{repo.topics.length - 3} more
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex gap-2 pt-2">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  <span>Repository</span>
                </Button>
              </a>
              {repo.homepage && (
                <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button className="w-full flex items-center gap-2 bg-[#28cee3] hover:bg-[#28cee3]/90">
                    <ExternalLink className="h-4 w-4" />
                    <span>Demo</span>
                  </Button>
                </a>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
