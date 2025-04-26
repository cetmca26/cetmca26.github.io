"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area";
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
    "id": "5",
    "name": "Abhishek R S",
    "avatar": "https://media.licdn.com/dms/image/v2/D5603AQEONPrQUi4dOw/profile-displayphoto-shrink_800_800/B56ZZw7KH8HUAc-/0/1745651278785?e=1750896000&v=beta&t=X52hBw3vSSAV8Se3_0O4ysIp8EnwfgEnvC9cjpSnBuo",
    "role": "Full Stack Developer",
    "skills": [
      "C",
      "Java",
      "Python",
      "JavaScript",
      "AWS",
      "AngularJS",
      "SQL",
      "PowerBi",
      "Express",
      "MongoDB",
      "Android"
    ],
    "github": "https://github.com/abhxi-r-s",
    "linkedin": "https://www.linkedin.com/in/abhishek-r-s-profile",
    "email": "abhishek.rs.here@gmail.com",
    "bio": "Software developer crafting dynamic, scalable web apps with seamless user experiences. Passionate about innovation, efficient solutions, and growing with every challenge"
  },
  {
    "id": "21",
    "name": "Bhavana Theruvath",
    "avatar": "https://avatars.githubusercontent.com/u/99276236?v=4",
    "role": "Aspiring Software Engineer",
    "skills": [
      "Python",
      "C",
      "HTML",
      "CSS",
      "JavaScript",
      "PHP",
      "Java",
      "SQL"
    ],
    "github": "https://github.com/bhavanatheruvath",
    "linkedin": "https://linkedin.com/in/bhavanatheruvath",
    "email": "bhavanatheruvath2255@gmail.com",
    "bio": "Aspiring software engineer passionate about building efficient, user-friendly applications. Eager to learn, grow, and contribute to innovative tech solutions"
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
  {
    "id": "50",
    "name": "Sana S Navas",
    "avatar": "https://media.licdn.com/dms/image/v2/D5635AQFQafP0_n1WUQ/profile-framedphoto-shrink_400_400/B56ZXCtwNRGQAc-/0/1742728529046?e=1746298800&v=beta&t=G_Zm0APobSH1a5XlFYIQCetYGRtfP8VHhyWEmjuom0Y",
    "role": "Data Scientist",
    "skills": [
      "Python",
      "Java",
      "HTML",
      "CSS",
      "PHP",
      "SQL",
      "C",
      "MongoDB"
    ],
    "github": "https://github.com/SanaSNavas7",
    "linkedin": "https://www.linkedin.com/in/sana-s-navas-787514249",
    "email": "sananavas100@gmail.com",
    "bio": "As an aspiring tech professional, I am deeply passionate about exploring the world of machine learning, uncovering insights through data analysis, and creating impactful web applications. Eager to learn, build, and innovate, I aim to turn ideas into real-world solutions that make a difference."
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
        // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
                  <CardDescription className="text-cyan-400">{student.role}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  {/* <p className="text-sm text-muted-foreground text-center mb-4" >{student.bio}</p> */}
                  
                  <ScrollArea className="h-24 mt-1 p-0 w-full">
  <p className="text-sm text-muted-foreground text-center">
    {student.bio}
  </p>
</ScrollArea>
<ScrollArea className=" h-12 mt-3 w-full">
                  <div className="flex flex-wrap justify-center gap-1.5 mt-2 w-full">
                    {student.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs ">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  </ScrollArea>
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
