"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, Linkedin, Mail, ExternalLink, Calendar, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"

// Sample student data with extended details for portfolio
const studentsData = [
  {
    id: 1,
    name: "Deepak h",
    avatar: "https://avatars.githubusercontent.com/u/184137882?v=4",
    role: "Full Stack Developer",
    skills: ["Python", "HTML", "MongoDB", "CSS", "Php", "JavaScript", "Mysql", "Research"],
    github: "https://github.com/deep-kH",
    linkedin: "https://linkedin.com/deep-kH",
    email: "deepakdeepam@gmail.com",
    bio: "Passionate about web development and open source contributions. I enjoy building scalable web applications and contributing to the developer community.",
    experience: [
      {
        id: 1,
        company: "CETMCA26 Community",
        role: "Full Stack Developer",
        duration: "2024 - Present",
        description:
          "Developing and maintaining web applications using React, Node.js, and MongoDB. Implementing new features and optimizing existing codebase for better performance.",
      },
      // {
      //   id: 2,
      //   company: "WebSolutions Inc.",
      //   role: "Frontend Developer Intern",
      //   duration: "2021 - 2022",
      //   description:
      //     "Assisted in developing responsive user interfaces using React and Redux. Collaborated with the design team to implement UI/UX improvements.",
      // },
    ],
    education: [
      {
        id: 1,
        institution: "College of Engineering Trivandrum",
        degree: "Master of Computer Applications",
        duration: "2024 - 2026",
        description: "Specializing in Web Technologies and Cloud Computing.",
      },
      {
        id: 2,
        institution: "University of Kerala",
        degree: "Bachelor of Physics ",
        duration: "2021 - 2024",
        description: "Graduated with First Class . Focused on Programming and Database Management.",
      },
    ],
    projects: [
      {
        id: 1,
        title: "CETMCA26 Platform",
        description:
          "A  platform with features like project listing, Study Materials , Lab programs , and Contact Form.",
        technologies: ["React", "Tailwind css", "Javascript", "TypeScript", "Next"],
        link: "https://github.com/cetmca26",
      },
      // {
      //   id: 2,
      //   title: "Task Management App",
      //   description:
      //     "A collaborative task management application with real-time updates, task assignment, and progress tracking.",
      //   technologies: ["Next.js", "Firebase", "Tailwind CSS"],
      //   link: "https://github.com",
      // },
      // {
      //   id: 3,
      //   title: "Weather Forecast App",
      //   description:
      //     "A weather forecast application that provides real-time weather updates and forecasts for multiple locations.",
      //   technologies: ["React", "OpenWeather API", "Chart.js"],
      //   link: "https://github.com",
      // },
    ],
  },
  {
    "id": 2,
    "name": "Yadhukrishna N.P.",
    "avatar": "https://avatars.githubusercontent.com/u/145049379?v=4",
    "role": "Full Stack Developer",
    "skills": ["Python", "HTML", "CSS", "JavaScript", "Django", "React", "MySQL", "PostgreSQL"],
    "github": "https://github.com/yadhukrishnx",
    "linkedin": "https://linkedin.com/in/yadhukrishnx",
    "email": "yadhukrishnanp@gmail.com",
    "bio": "Enthusiastic Django developer passionate about building practical web solutions and improving user experience through well-structured design and responsive interfaces.",
    "experience": [
      {
        "id": 1,
        "company": "CETMCA26 Community",
        "role": " Full Stack Developer Intern",
        "duration": "2025-Present",
        "description": "Worked on full-stack web projects using React, HTML, CSS, and JavaScript. Gained hands-on experience in MVC architecture and database integration."
      }
    ],
    "education": [
      {
        "id": 1,
        "institution": "College of Engineering Trivandrum",
        "degree": "Master of Computer Applications",
        "duration": "2024 - 2026",
        "description": "Specializing in Full Stack Web Development and Cloud-based Applications."
      },
      {
        "id": 2,
        "institution": "University of Kannur",
        "degree": "Bachelor of  Computer Application",
        "duration": "2021 - 2024",
        "description": "Focused on data structures, web development, and project-based learning."
      }
    ],
    "projects": [
      {
        "id": 1,
        "title": "OPTIFIT – Posture Analyzing Workout Assistant",
        "description": "A real-time workout assistant using Mediapipe and BlazePose, integrated with Django for user management, posture analysis, and BMI tracking.",
        "technologies": ["Django", "OpenCV", "Mediapipe", "HTML", "CSS", "JavaScript"],
        "link": "https://github.com/yadhukrishnx/optifit"
      },
      {
        "id": 2,
        "title": "Book Hub – Library Management System",
        "description": "Web application for managing books and users with role-based access for librarians and patrons.",
        "technologies": ["Django", "PostgreSQL", "Bootstrap"],
        "link": "https://github.com/yadhukrishnx/bookhub"
      }
    ]
  },
  {
    "id": 3,
    "name": "Shivarama",
    "avatar": "https://avatars.githubusercontent.com/u/145856726?v=4",
    "role": "Full Stack Developer",
    "skills": ["Python", "HTML", "CSS", "JavaScript", "Django", "React", "MySQL", "PostgreSQL"],
    "github": "https://github.com/shivarama02",
    "linkedin": "https://linkedin.com/in/shivarama02",
    "email": "shivarama02@gmail.com",
    "bio": "Passionate about web development and open source contributions. I enjoy building scalable web applications and contributing to the developer community.",
    "experience": [
      {
        "id": 1,
        "company": "CETMCA26 Community",
        "role": " Full Stack Developer Intern",
        "duration": "2025-Present",
        "description": "Worked on full-stack web projects using React, HTML, CSS, and JavaScript. Gained hands-on experience in MVC architecture and database integration."
      }
    ],
    "education": [
      {
        "id": 1,
        "institution": "College of Engineering Trivandrum",
        "degree": "Master of Computer Applications",
        "duration": "2024 - 2026",
        "description": "Specializing in Full Stack Web Development and Cloud-based Applications."
      },
      {
        "id": 2,
        "institution": "University of Kannur",
        "degree": "Bachelor of  Physics",
        "duration": "2021 - 2024",
        "description": "Focused on data structures, web development, and project-based learning."
      }
    ],
    "projects": [
    
      {
        "id": 1,
        "title": "Yatra - Tourist Destination App",
        "description": "Web application for managing tourist destinations and users with role-based access for users and visiter.",
        "technologies": ["Django", "PostgreSQL", "Bootstrap"],
        "link": "https://github.com/shivarama02/Yatra"
      }
    ]
  }
  
  // Add more students with similar detailed data structure
]

export default function StudentPortfolio() {
  const { id } = useParams()
  const [student, setStudent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch with a timeout
    const timer = setTimeout(() => {
      const foundStudent = studentsData.find((s) => s.id.toString() === id)
      setStudent(foundStudent || null)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-muted-foreground">Loading portfolio...</p>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Student Not Found</h1>
        <p className="text-muted-foreground mb-8">The student portfolio you're looking for doesn't exist.</p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex flex-col items-center">
            <Avatar className="h-40 w-40 md:h-48 md:w-48">
              <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
              <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex gap-2 mt-4">
              <a href={student.github} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </a>
              <a href={student.linkedin} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </a>
              <a href={`mailto:${student.email}`}>
                <Button variant="outline" size="icon">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email</span>
                </Button>
              </a>
            </div>
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold tracking-tight mb-2">{student.name}</h1>
            <p className="text-xl text-primary mb-4">{student.role}</p>
            <p className="text-muted-foreground mb-6 max-w-2xl">{student.bio}</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {student.skills.map((skill: string) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="experience" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="experience" className="space-y-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="grid grid-cols-1 gap-6">
              {student.experience.map((exp: any, index: number) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{exp.role}</CardTitle>
                          <CardDescription className="text-lg">{exp.company}</CardDescription>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{exp.duration}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{exp.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="education" className="space-y-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="grid grid-cols-1 gap-6">
              {student.education.map((edu: any, index: number) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{edu.degree}</CardTitle>
                          <CardDescription className="text-lg">{edu.institution}</CardDescription>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <GraduationCap className="h-4 w-4 mr-2" />
                          <span>{edu.duration}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{edu.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {student.projects.map((project: any, index: number) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech: string) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <div className="p-6 pt-0">
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="w-full flex items-center gap-2">
                          <ExternalLink className="h-4 w-4" />
                          <span>View Project</span>
                        </Button>
                      </a>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
