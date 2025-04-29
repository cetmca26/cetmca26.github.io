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
    "id": 53,
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
    "id": 54,
    "name": "Subi Suresh",
    "avatar": "https://avatars.githubusercontent.com/u/162290234?s=400&u=538a7d968d7f8f3b76a5629b591757a995a204d1&v=4",
    "role": "iOS Developer",
    "skills": [
      "Swift",
      "Swift UI",
      "UIKit",
      "Cocoa",
      "C++",
      "MySQL",
      "Django"
    ],
    "github": "https://github.com/Subisuresh321",
    "linkedin": "https://www.linkedin.com/in/subisuresh2503",
    "email": "subisuresh69@gmail.com",
    "bio": "I am an aspiring iOS developer passionate about contributing to the vibrant Apple community while exploring Swift-driven platforms like iOS, WatchOS, tvOS, and macOS. Committed to continuous learning, I aim to craft innovative applications that enhance user experiences across the entire Apple ecosystem."
  }
,  
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
    "role": "Software Engineer",
    "skills": ["Java", "C++", "Django", "MERN", "SQL"],
    "bio": "Software Engineer with strong skills in Java, C++, Django, and MERN stack. Passionate about building scalable applications, API development, and delivering high-quality software through effective SDLC practices",
    "github": "https://github.com/yadhukrishnx",
    "linkedin": "https://linkedin.com/in/yadhukrishnx",
    "email": "yadhukrishnayadhu007@gmail.com"
  },
  {
    "id": 60,
    "name": "Zuhri Noor",
    "avatar": "https://avatars.githubusercontent.com/u/85988261?v=4",
    "role": "Software Engineer",
    "skills": ["MERN", "Python", "Java", "SQL", "PHP"],
    "bio": "MCA Student",
    "github": "https://github.com/ZuhriNoor",
    "linkedin": "https://www.linkedin.com/in/zuhrinoor",
    "email": "zuhrinoor12@gmail.com"
  },
  {
    "id": 1,
    "name": "Aaron Gladston",
    "avatar": "https://lh3.googleusercontent.com/a/ACg8ocJsGKWyysBluzWMIcBxiV2PEn7N1HD2J7pXdKG5u9BzhoNTeZjU=s288-c-no",
    "role": "Software Developer",
    "skills": ["Python", "HTML", "CSS", "Java"],
    "bio": "Aspiring software developer.",
    "github": "https://github.com/AaronGladston",
    "linkedin": "https://www.linkedin.com/in/aaron-gladston-8b5b62334/",
    "email": "aarongladston2003@gmail.com"
  }
,{
  "id": 7,
  "name": "Abraham Peter",
  "avatar": "https://avatars.githubusercontent.com/u/138754064?v=4",
  "role": "Aspiring Aspirer",
  "skills": ["Java", "Python", "HTML", "CSS", "JavaScript", "React"],
  "bio": "Software engineer in training. Ctrl+C, Ctrl+V specialist",
  "github": "https://github.com/abrahampeter10",
  "linkedin": "https://www.linkedin.com/in/iamabrahampeter/",
  "email": "abrahampeteronline@gmail.com"
}
,{
  "id": 27,
  "name": "Gautham B",
  "avatar": "https://avatars.githubusercontent.com/u/55729626?v=4",
  "role": "Web Developer",
  "skills": [
    "Javscript",
    "Python",
    "PHP",
    "Java",
    "MySQL",
    "Django",
    "Android app development"
  ],
  "bio": "Web Developer | Cybersecurity Student | Currently pursuing Master's degree at College of Engineering Trivandrum",
  "github": "https://github.com/gigabyte1020",
  "linkedin": "https://www.linkedin.com/in/gautham-b-670837219/",
  "email": "gauthamb1020@gmail.com"
}
,
{
  "id": 18,
  "name": "Aswin R S",
  "avatar": "https://avatars.githubusercontent.com/u/176476526?s=400&u=720ef59f8cff760ae6abe4f5688218c470194156&v=4",
  "role": "Aspiring DevOps Engineer",
  "skills": [
    "Python",
    "Java",
    "C",
    "Html",
    "CSS",
    "Javascript"
  ],
  "bio": "MCA student with a focus on DevOps and a strong passion for the transformative potential within the automotive industry. Eager to apply my technical skills to streamline software development and deployment for innovative automotive solutions.",
  "github": "https://github.com/notmaal",
  "linkedin": "https://www.linkedin.com/in/aswin-rs-84a786337/",
  "email": "aswin4147@gmail.com"
}
,
{
  "id": "22",
  "name": "Chaithanya K S",
  "avatar": "https://avatars.githubusercontent.com/u/127503791?v=4",
  "role": "ML Engineer",
  "skills": [
    "Python",
    "Machine Learning",
    "Data Analysis"
  ],
  "bio": "Architect | MCA Student | Data Science Enthusiast\n\nI’m a professional architect with a strong foundation in design and creative problem-solving. Currently pursuing an MCA at CET Trivandrum, I’ve expanded my skills to include Python, C, SQL, Power BI, and machine learning.\n\nWith my unique blend of architectural experience and technical expertise, I’m excited to explore how design and data can converge to solve real-world challenges.",
  "github": "https://github.com/chaithanya-ks2",
  "linkedin": "https://www.linkedin.com/in/chaithanyaks2/",
  "email": "chaithanya.ks2@gmail.com"
}
,
  {
    "id": "50",
    "name": "Sana S Navas",
    "avatar": "https://media.licdn.com/dms/image/v2/D5603AQEQZIfL6_GpQg/profile-displayphoto-shrink_400_400/B56ZZ03JkeGoAk-/0/1745717337396?e=2147483647&v=beta&t=97yrb7QKtuh_08JhwErKyAWmkRThkb8Uyl2VhaJU37k",
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
