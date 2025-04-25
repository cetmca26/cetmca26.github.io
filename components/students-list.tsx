"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import Link from "next/link"

// Sample student data
const studentsDatabefore = [
  
 
  {
    "id": 23,
    "name": "Deepak H",
    "avatar": "https://avatars.githubusercontent.com/u/184137882?v=4",
    "role": "Full Stack Developer",
    "skills": ["Python", "HTML", "MongoDB", "CSS", "Php", "JavaScript", "Mysql", "Research"],
    "github": "https://github.com/deep-kH",
    "linkedin": "https://linkedin.com/deep-kH",
    "email": "deepakdeepam@gmail.com",
    "bio": "Passionate about web development and open source contributions. I enjoy building scalable web applications and contributing to the developer community."
  },  
  {
    "id": 28,
    "name": "Gokul P",
    "avatar": "https://avatars.githubusercontent.com/u/111432335?v=4",
    "role": "Mern Stack Developer",
    "skills": ["Python", "Java", "MySQL", "MongoDB" , "Php","BlockChain"],
    "github": "https://github.com/Gokulmnz",
    "linkedin": "https://linkedin.com/gokulmnz",
    "email": "career.gkp@gmail.com",
    "bio": "Aspiring financial analyst and developer pursuing MCA, blending tech skills with financial insight. Passionate about business growth, innovation, and entrepreneurship."
  },
  {
    "id": 4,
    "name": "Abhishek Abhayakumar",
    "avatar": "https://avatars.githubusercontent.com/u/187165055?v=4",
    "role": "Aspiring Software Engineer",
    "skills": ["Python", "Java", "MySQL", "Django" , "Php","ML"],
    "github": "https://github.com/abhishekabhayakumar",
    "linkedin": "https://linkedin.com/abhishekabhayakumar",
    "email": "abhishekabhay5286@gmail.com",
    "bio": "Software engineering enthusiast pursuing MCA with a keen interest in Machine Learning. Driven by a passion to build intelligent systems that solve real-world problems."
  },
  {
    "id": 13,
    "name": "Anandu P N",
    "avatar": "https://media.licdn.com/dms/image/v2/D4E03AQGDzEjSr6U3lw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1731236977864?e=2147483647&v=beta&t=4praNly4wbAGAn3hBJHZBX0mOi4Tx_PWuzvWERkau9o",
    "role": "Aspiring DevOps Engineer",
    "skills": ["Python", "Java", "MySQL", "React" , "Php","Docker"],
    "github": "https://github.com/anandu-pn",
    "linkedin": "www.linkedin.com/in/anandupn",
    "email": "anandupn@hotmail.com",
    "bio": "As an MCA student passionate about technology, I aspire to become a skilled DevOps and Network Engineer, bridging software development and IT operations."
  },
  {
    "id": 54,
    "name": "Shivarama",
    "avatar": "https://avatars.githubusercontent.com/u/145856726?v=4",
    "role": "Full Stack Developer",
    "skills": ["Python", "HTML", "CSS", "Php", "JavaScript", "Mysql", "Research"],
    "github": "https://github.com/shivarama02",
    "linkedin": "https://linkedin.com/shivarama02",
    "email": "shivarama02@gmail.com",
    "bio": "Passionate about web development and open source contributions. I enjoy building scalable web applications and contributing to the developer community."
  }, 
  {
    "id": 59,
    "name": "Yadhukrishna N.P.",
    "avatar": "https://avatars.githubusercontent.com/u/145049379?v=4",
    "role": "Full Stack Developer",
    "skills": ["Python", "React", "MySQL", "PostgreSQL"],
    "github": "https://github.com/yadhukrishnx",
    "linkedin": "https://linkedin.com/in/yadhukrishnx",
    "email": "yadhukrishnayadhu007@gmail.com",
    "bio": "Dedicated developer passionate about building full-stack web applications and exploring UI/UX improvements through hands-on projects."
  },
  
]

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);  
}

const studentsData = shuffleArray([...studentsDatabefore]);

export function StudentsList() {
  const [searchTerm, setSearchTerm] = useState("")
  

  const filteredStudents = studentsData.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div>
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search by name, role, or skill..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No students found matching your search criteria.</p>
          <Button className="mt-4" onClick={() => setSearchTerm("")}>
            Clear Search
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredStudents.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                      <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle>{student.name}</CardTitle>
                  <CardDescription>{student.role}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground text-center mb-4" >{student.bio}</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {student.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center gap-2 pt-2">
                  <Link href={`/students/${student.id}`} className="w-full">
                    <Button className="w-full bg-[#28cee3] hover:bg-[#28cee3]/90">View Portfolio</Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
