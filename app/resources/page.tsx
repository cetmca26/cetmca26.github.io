"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Code, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState("lab-programs")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Resources</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Access lab programs and notes for all semesters to help you excel in your academic journey.
        </p>
      </div>

      <Tabs defaultValue="lab-programs" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="lab-programs">Lab Programs</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="lab-programs" className="space-y-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <SemesterTabs type="lab" />
          </motion.div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <SemesterTabs type="notes" />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function SemesterTabs({ type }: { type: "lab" | "notes" }) {
  const [activeSemester, setActiveSemester] = useState("semester-1")

  return (
    <Tabs defaultValue="semester-1" className="w-full" onValueChange={setActiveSemester}>
      <div className="flex justify-center mb-8 overflow-x-auto pb-2">
        <TabsList className="flex">
          <TabsTrigger value="semester-1">Semester 1</TabsTrigger>
          <TabsTrigger value="semester-2">Semester 2</TabsTrigger>
          <TabsTrigger value="semester-3">Semester 3</TabsTrigger>
          <TabsTrigger value="semester-4">Semester 4</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="semester-1">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {type === "lab" ? <LabPrograms semester={1} /> : <Notes semester={1} />}
        </motion.div>
      </TabsContent>

      <TabsContent value="semester-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {type === "lab" ? <LabPrograms semester={2} /> : <Notes semester={2} />}
        </motion.div>
      </TabsContent>

      <TabsContent value="semester-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {type === "lab" ? <LabPrograms semester={3} /> : <Notes semester={3} />}
        </motion.div>
      </TabsContent>

      <TabsContent value="semester-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {type === "lab" ? <LabPrograms semester={4} /> : <Notes semester={4} />}
        </motion.div>
      </TabsContent>
    </Tabs>
  )
}

function LabPrograms({ semester }: { semester: number }) {
  // Sample lab programs data
  const labPrograms = {
    1: [
      {
        id: 1,
        title: "Python Programming Lab",
        description: "Basic Python programming exercises including data structures, functions, and file handling.",
        link: "#",
      },
      {
        id: 2,
        title: "Data Structures Lab",
        description: "Implementation of various data structures like linked lists, stacks, queues, and trees.",
        link: "#",
      },
      {
        id: 3,
        title: "Database Management Lab",
        description: "SQL queries, database design, and normalization exercises.",
        link: "#",
      },
    ],
    2: [
      {
        id: 1,
        title: "Web Programming Lab",
        description: "HTML, CSS, JavaScript, and basic web development exercises.",
        link: "#",
      },
      {
        id: 2,
        title: "Java Programming Lab",
        description: "Object-oriented programming in Java with practical exercises.",
        link: "#",
      },
      {
        id: 3,
        title: "Operating Systems Lab",
        description: "Process management, memory management, and file system implementation.",
        link: "#",
      },
    ],
    3: [
      {
        id: 1,
        title: "Machine Learning Lab",
        description: "Implementation of various machine learning algorithms and models.",
        link: "#",
      },
      {
        id: 2,
        title: "Computer Networks Lab",
        description: "Network protocols, socket programming, and network security exercises.",
        link: "#",
      },
      {
        id: 3,
        title: "Mobile Application Development Lab",
        description: "Android app development with practical exercises.",
        link: "#",
      },
    ],
    4: [
      {
        id: 1,
        title: "Cloud Computing Lab",
        description: "Deployment and management of applications on cloud platforms.",
        link: "#",
      },
      {
        id: 2,
        title: "Big Data Analytics Lab",
        description: "Hadoop, Spark, and other big data technologies with practical exercises.",
        link: "#",
      },
      { id: 3, title: "Project Work", description: "Final year project implementation and documentation.", link: "#" },
    ],
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {labPrograms[semester as keyof typeof labPrograms].map((lab, index) => (
        <motion.div
          key={lab.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                {lab.title}
              </CardTitle>
              <CardDescription>Semester {semester}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{lab.description}</p>
            </CardContent>
            <CardFooter className="pt-2">
              <a href={lab.link} className="w-full">
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>View Lab Programs</span>
                </Button>
              </a>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

function Notes({ semester }: { semester: number }) {
  // Sample notes data
  const notes = {
    1: [
      {
        id: 1,
        title: "Discrete Mathematics",
        description: "Comprehensive notes on sets, relations, functions, graph theory, and mathematical reasoning.",
        link: "#",
      },
      {
        id: 2,
        title: "Computer Organization",
        description: "Notes on computer architecture, memory organization, and processor design.",
        link: "#",
      },
      {
        id: 3,
        title: "Programming Fundamentals",
        description: "Introduction to programming concepts, algorithms, and problem-solving techniques.",
        link: "#",
      },
    ],
    2: [
      {
        id: 1,
        title: "Data Structures and Algorithms",
        description: "Detailed notes on various data structures, algorithm design, and analysis.",
        link: "#",
      },
      {
        id: 2,
        title: "Object-Oriented Programming",
        description: "Concepts of OOP including classes, objects, inheritance, polymorphism, and encapsulation.",
        link: "#",
      },
      {
        id: 3,
        title: "Database Management Systems",
        description: "Relational database concepts, SQL, normalization, and transaction management.",
        link: "#",
      },
    ],
    3: [
      {
        id: 1,
        title: "Software Engineering",
        description: "Software development lifecycle, requirements engineering, and project management.",
        link: "#",
      },
      {
        id: 2,
        title: "Artificial Intelligence",
        description: "Introduction to AI concepts, search algorithms, knowledge representation, and expert systems.",
        link: "#",
      },
      {
        id: 3,
        title: "Web Technologies",
        description: "Modern web development frameworks, RESTful APIs, and client-server architecture.",
        link: "#",
      },
    ],
    4: [
      {
        id: 1,
        title: "Distributed Systems",
        description: "Concepts of distributed computing, middleware technologies, and distributed algorithms.",
        link: "#",
      },
      {
        id: 2,
        title: "Information Security",
        description: "Cryptography, network security, and secure software development practices.",
        link: "#",
      },
      {
        id: 3,
        title: "Research Methodology",
        description: "Research design, data collection methods, and academic writing guidelines.",
        link: "#",
      },
    ],
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes[semester as keyof typeof notes].map((note, index) => (
        <motion.div
          key={note.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                {note.title}
              </CardTitle>
              <CardDescription>Semester {semester}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{note.description}</p>
            </CardContent>
            <CardFooter className="pt-2">
              <a href={note.link} className="w-full">
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>Download Notes</span>
                </Button>
              </a>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
