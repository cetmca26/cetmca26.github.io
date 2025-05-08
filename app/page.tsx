import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpen, Code, Github, GraduationCapIcon as Graduation, Users } from "lucide-react"
import Link from "next/link"
import { HeroSection } from "@/components/hero-section"
import { TopPerformers } from "@/components/top-performers"


export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
 
      <HeroSection />

      <section className="my-1 mb-5" style={{ marginTop: "-40px" , marginBottom: "200px"}}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">About Us</h2>
          <p className="text-muted-foreground text-xl mt-3  mx-auto">
          Welcome to CETMCA26! We are a vibrant community of aspiring tech enthusiasts from the  , MCA 2026 batch. Our mission is to foster collaboration, learning, and innovation among our peers. Stay connected with us at cetmca26.live
          Our website contains a wide range of resources to support your academic journey, including notes, syllabus materials, entrance preparation guides, project ideas, and much more. Explore to make the most of these valuable resources!
          </p>
         
<Link href="https://discord.gg/ujTeUsM4Nf">
                <Button size="lg" className="bg-[#28cee3] hover:bg-[#28cee3]/90 mt-5">
                   Join Discord
                </Button>
              </Link>

        </div>
      </section>

      <section className="my-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Explore CETMCA <span style={{ color: '#28cee3' }}>26</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover resources, projects, and connect with the MCA batch of 2026 at the CET.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-[#28cee3]" />
                Projects
              </CardTitle>
              <CardDescription>Explore our GitHub projects</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Browse through all the projects developed by CETMCA26 students, including web applications, mobile apps,
                and more.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/projects" className="w-full">
                <Button className="w-full group-hover:bg-[#28cee3]/90 bg-[#28cee3]">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#28cee3]" />
                Contributors
              </CardTitle>
              <CardDescription>Meet our active contributors</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Discover the people behind our projects and see their contributions to the CETMCA26 community.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/contributors" className="w-full">
                <Button className="w-full group-hover:bg-[#28cee3]/90  bg-[#28cee3]">
                  View Contributors
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card> */}

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#28cee3]" />
                Lab Programs & Notes
              </CardTitle>
              <CardDescription>Access academic resources</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Find lab programs and notes for all semesters to help you excel in your academic journey.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/resources" className="w-full">
                <Button className="w-full group-hover:bg-[#28cee3]/90  bg-[#28cee3]">
                  View Resources
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Graduation className="h-5 w-5 text-[#28cee3]" />
                Students
              </CardTitle>
              <CardDescription>Explore student portfolios</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Browse through the portfolios of CETMCA26 students and learn about their skills, projects, and
                experiences.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/students" className="w-full">
                <Button className="w-full group-hover:bg-[#28cee3]/90  bg-[#28cee3]">
                  View Students
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Github className="h-5 w-5 text-[#28cee3]" />
                GitHub
              </CardTitle>
              <CardDescription>Visit our GitHub organization</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Check out our GitHub organization to see all our repositories and contribute to our projects.
              </p>
            </CardContent>
            <CardFooter>
              <a href="https://github.com/cetmca26" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full group-hover:bg-[#28cee3]/90  bg-[#28cee3]">
                  Visit GitHub
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </CardFooter>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#28cee3]" />
                Join Us
              </CardTitle>
              <CardDescription>Become a part of our community</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Interested in joining our community? Fill out the contact form and we'll get back to you.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/contact" className="w-full">
                <Button className="w-full group-hover:bg-[#28cee3]/90  bg-[#28cee3]">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        
          <TopPerformers />
        </div>
      </section>
    </div>
  )
}
