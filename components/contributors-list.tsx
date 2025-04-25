"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Github, GitCommit } from "lucide-react"
import { motion } from "framer-motion"

interface Contributor {
  id: number
  login: string
  avatar_url: string
  html_url: string
  contributions: number
  name?: string
  bio?: string
}

export function ContributorsList() {
  const [contributors, setContributors] = useState<Contributor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchContributors() {
      try {
        // First, get all repos
        const reposResponse = await fetch("https://api.github.com/orgs/cetmca26/repos")

        if (!reposResponse.ok) {
          throw new Error("Failed to fetch repositories")
        }

        const repos = await reposResponse.json()

        // Then, get contributors for each repo
        const contributorsPromises = repos.map(async (repo: any) => {
          try {
            const response = await fetch(`https://api.github.com/repos/cetmca26/${repo.name}/contributors`)

            // Check if response is ok and not empty
            if (response.ok) {
              const text = await response.text()
              // Only parse if there's actual content
              return text ? JSON.parse(text) : []
            }
            return []
          } catch (error) {
            console.error(`Error fetching contributors for ${repo.name}:`, error)
            return []
          }
        })

        const contributorsArrays = await Promise.all(contributorsPromises)

        // Flatten and combine contributors
        const flattenedContributors = contributorsArrays.flat().filter(Boolean)

        // Aggregate contributions by user
        const contributorMap = new Map<string, Contributor>()

        flattenedContributors.forEach((contributor: any) => {
          if (!contributor || !contributor.login) return

          if (contributorMap.has(contributor.login)) {
            const existing = contributorMap.get(contributor.login)!
            existing.contributions += contributor.contributions
          } else {
            contributorMap.set(contributor.login, {
              id: contributor.id,
              login: contributor.login,
              avatar_url: contributor.avatar_url,
              html_url: contributor.html_url,
              contributions: contributor.contributions,
            })
          }
        })

        // Convert map to array and sort by contributions
        const sortedContributors = Array.from(contributorMap.values()).sort((a, b) => b.contributions - a.contributions)

        // Fetch additional user details for top contributors
        const detailedContributorsPromises = sortedContributors.slice(0, 20).map(async (contributor) => {
          try {
            const response = await fetch(`https://api.github.com/users/${contributor.login}`)
            if (response.ok) {
              const details = await response.json()
              return {
                ...contributor,
                name: details.name,
                bio: details.bio,
              }
            }
            return contributor
          } catch (error) {
            console.error(`Error fetching details for ${contributor.login}:`, error)
            return contributor
          }
        })

        const detailedContributors = await Promise.all(detailedContributorsPromises)

        setContributors(detailedContributors)
        setLoading(false)
      } catch (err) {
        setError("Failed to load contributors. Please try again later.")
        setLoading(false)
        console.error("Error fetching contributors:", err)
      }
    }

    fetchContributors()
  }, [])

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-muted-foreground">Loading contributors...</p>
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

  // If no contributors are found but no error occurred
  if (contributors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No contributors found in the CETMCA26 GitHub organization.</p>
        <div className="mt-4">
          <a href="https://github.com/cetmca26" target="_blank" rel="noopener noreferrer" className="bg-[#28cee3] hover:bg-[#28cee3]/90">
            <Button>Visit GitHub Organization</Button>
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {contributors.map((contributor, index) => (
        <motion.div
          key={contributor.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
            <CardHeader className="pb-2 text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={contributor.avatar_url || "/placeholder.svg"} alt={contributor.login} />
                  <AvatarFallback>{contributor.login.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-xl">{contributor.name || contributor.login}</CardTitle>
              <CardDescription>@{contributor.login}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <GitCommit className="h-4 w-4 text-primary" />
                <span className="font-medium">{contributor.contributions} contributions</span>
              </div>
              {contributor.bio && <p className="text-sm text-muted-foreground line-clamp-3">{contributor.bio}</p>}
            </CardContent>
            <CardFooter className="justify-center pt-2">
              <a href={contributor.html_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="flex items-center gap-2 bg-[#28cee3] hover:bg-[#28cee3]/90">
                  <Github className="h-4 w-4" />
                  <span>View Profile</span>
                </Button>
              </a>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
