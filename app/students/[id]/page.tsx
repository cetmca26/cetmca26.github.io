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
import { StudentQRCodeDialog } from "@/components/student-qr-code-dialog"

// Sample student data with extended details for portfolio
const studentsData = [
  {
    id: 23,
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
    "id": 1,
    "name": "Aaron Gladston",
    "avatar": "https://lh3.googleusercontent.com/a/ACg8ocJsGKWyysBluzWMIcBxiV2PEn7N1HD2J7pXdKG5u9BzhoNTeZjU=s288-c-no",
    "role": "Software Developer",
    "skills": ["Python", "HTML", "CSS", "Java"],
    "bio": "Aspiring software developer.",
    "github": "https://github.com/AaronGladston",
    "linkedin": "https://www.linkedin.com/in/aaron-gladston-8b5b62334/",
    "email": "aarongladston2003@gmail.com",
    "experience": [
      {
        "id": 1,
        "company": "Tata Consultancy Services",
        "role": "Project Manager",
        "duration": "2023 - 2024",
        "description": "Conduct projects."
      }
    ],
    "education": [
      {
        "id": 1,
        "institution": "Mar Ivanios College",
        "degree": "BSc Physics with Machine Learning",
        "duration": "2021 - 2024",
        "description": "Dived into a new world of applications in Physics with the effectiveness of Machine Learning."
      }
    ],
    "projects": [
      {
        "id": 1,
        "title": "Dream11 Prediction Application",
        "description": "Helps to navigate through the predictions in the Dream11 applications.",
        "technologies": ["React", "Flutter", "MERN"],
        "link": "https://github.com/Dream11"
      }
    ]
  }
,
{
  "id": 7,
  "name": "Abraham Peter",
  "avatar": "https://avatars.githubusercontent.com/u/138754064?v=4",
  "role": "Aspiring Aspirer",
  "skills": ["Java", "Python", "HTML", "CSS", "JavaScript", "React"],
  "bio": "Software engineer in training. Ctrl+C, Ctrl+V specialist",
  "github": "https://github.com/abrahampeter10",
  "linkedin": "https://www.linkedin.com/in/iamabrahampeter/",
  "email": "abrahampeteronline@gmail.com",
  "experience": [
    {
      "id": 1,
      "company": "CETMCA26 Community",
      "role": "Software Error Developer",
      "duration": "2024-Present",
      "description": "Mastering skills through the errors I proudly create and correct."
    }
  ],
  "education": [
    {
      "id": 1,
      "institution": "College of Engineering Trivandrum",
      "degree": "Master of Computer Applications",
      "duration": "2024-2026",
      "description": "Gaining knowledge from the curriculum and finding some achievements along the way."
    },
    {
      "id": 2,
      "institution": "Calicut University",
      "degree": "Bsc Computer Science",
      "duration": "2021-2024",
      "description": "Successfully completed my degree — that's an achievement in itself!"
    }
  ],
  "projects": [
    {
      "id": 1,
      "title": "EV Charging Station Booking WebApp",
      "description": "EV Charging Station Booking WebApp allows users to find, book, and manage electric vehicle charging slots easily. The platform connects EV owners with available charging stations in real-time, helping to reduce wait times, plan journeys efficiently, and promote eco-friendly transportation",
      "technologies": ["React", "Django", "MySql"],
      "link": "https://github.com/abrahampeter10/Electric-Vehicle"
    }
  ]
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
  "email": "gauthamb1020@gmail.com",
  "experience": [
    {
      "id": 1,
      "company": "Eztansa Technologies",
      "role": "Intern Software Developer",
      "duration": "April 2019-March 2020",
      "description": "Intern software developer and leader of multiple projects"
    }
  ],
  "education": [
    {
      "id": 1,
      "institution": "College of Engineering Trivandrum",
      "degree": "MCA",
      "duration": "2024-2026",
      "description": "Pursuing Master's degree at College of Engineering Trivandrum"
    }
  ],
  "projects": [
    {
      "id": 1,
      "title": "Chat App for College",
      "description": "Developed an Android App for my 6th semester major project, enabling ID card scanning and automatic addition of students to class-specific chat groups. Utilized Firebase as the backend platform and Google's ML Kit for text recognition.",
      "technologies": [
        "Java",
        "Firebase",
        "Android Studio"
      ],
      "link": "https://github.com/gigabyte1020/CollegeMsgApp2"
    }
  ]
},
{
  "id": 22,
  "name": "Chaithanya K S",
  "avatar": "https://avatars.githubusercontent.com/u/127503791?v=4",
  "role": "ML Engineer",
  "skills": [
    "Python",
    "Machine Learning",
    "Data Analysis",
    "Power BI",
    "C",
    "SQL"
  ],
  "bio": "Architect | MCA Student | Data Science Enthusiast. A professional architect with a foundation in creative design and a strong passion for data-driven solutions. Currently pursuing MCA at College of Engineering Trivandrum, with focus areas in Python, machine learning, and data analytics.",
  "github": "https://github.com/chaithanya-ks2",
  "linkedin": "https://www.linkedin.com/in/chaithanyaks2/",
  "email": "chaithanya.ks2@gmail.com",
  "experience": [
    {
      "id": 1,
      "company": "IBM (Internship)",
      "role": "Machine Learning Intern",
      "duration": "Date not specified",
      "description": "Completed internship focused on machine learning models and real-world applications."
    },
    {
      "id": 2,
      "company": "Freelance Architect",
      "role": "Architect",
      "duration": "2019–2024",
      "description": "Worked on multiple residential architecture projects, including documentation and design."
    }
  ],
  "education": [
    {
      "id": 1,
      "institution": "College of Engineering Trivandrum",
      "degree": "Bachelor of Architecture",
      "duration": "2014-2019",
      "description": "Designed hospitals, apartments, and urban spaces; dissertation on light pollution and thesis on LGBT Community Centre. Completed internships in residential and church architecture."
    },
    {
      "id": 2,
      "institution": "College of Engineering Trivandrum",
      "degree": "MCA",
      "duration": "2024-2026",
      "description": "Focusing on programming, advanced data structures, and applied machine learning aligned with UN SDGs. Participated in national coding contests and internships."
    }
  ],
  "projects": [
    {
      "id": 1,
      "title": "Life Expectancy Prediction",
      "description": "Explored health, economic, and social factors affecting life expectancy across 193 countries using machine learning.",
      "technologies": ["Python"],
      "link": "https://github.com/chaithanya-ks2/life-expectancy"
    },
    {
      "id": 2,
      "title": "Customer Analysis",
      "description": "Classified customers based on likelihood to accept marketing campaigns using demographic and behavioral data.",
      "technologies": ["Python"],
      "link": "https://github.com/chaithanya-ks2/customer-analysis-segmentation"
    },
    {
      "id": 3,
      "title": "HR Analytics with Power BI",
      "description": "Built an interactive dashboard for HR management insights using Power BI.",
      "technologies": ["PowerBI"],
      "link": "https://www.linkedin.com/posts/chaithanyaks2_hranalytics-powerbi-datadrivendecisions-activity-7126143583807565824-yGsV"
    },
    {
      "id": 4,
      "title": "AirBNB EDA",
      "description": "Performed exploratory data analysis on Airbnb NYC 2019 data using Python and visualized results in Power BI.",
      "technologies": ["Python", "PowerBI"],
      "link": "https://github.com/chaithanya-ks2/Airbnb_NYC_2019_EDA"
    },
    {
      "id": 5,
      "title": "Global Super Store PowerBI Dashboard",
      "description": "Created a six-page dashboard to visualize sales, customer trends, and product insights for strategic planning.",
      "technologies": ["PowerBI"],
      "link": "https://github.com/chaithanya-ks2/Global-SuperStore-PowerBi-Project"
    }
  ]
}

,{
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
  "email": "aswin4147@gmail.com",
  "experience": [
    // {
    //   "id": 1,
    //   "company": ".",
    //   "role": ".",
    //   "duration": ".",
    //   "description": "."
    // }
  ],
  "education": [
    {
      "id": 1,
      "institution": "College Of Engineering, Trivandrum",
      "degree": "MCA",
      "duration": "2024 - 2026",
      "description": "Pursuing..."
    }
  ],
  "projects": [
    // {
    //   "id": 1,
    //   "title": ".",
    //   "description": ".",
    //   "technologies": [
    //     "."
    //   ],
    //   "link": "https://youtu.be/dQw4w9WgXcQ?si=TQ-sfaINlYrEz1LK"
    // }
  ]
}
,
  {
    "id": 59,
    "name": "Yadhukrishna N.P.",
    "avatar": "https://avatars.githubusercontent.com/u/145049379?v=4",
    "role": "Software Engineer",
    "skills": ["Java", "C++", "Django", "MERN", "SQL"],
    "bio": "Software Engineer with strong skills in Java, C++, Django, and MERN stack. Passionate about building scalable applications, API development, and delivering high-quality software through effective SDLC practices",
    "github": "https://github.com/yadhukrishnx",
    "linkedin": "https://linkedin.com/in/yadhukrishnx",
    "email": "yadhukrishnanp@gmail.com",
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
    "id": 60,
    "name": "Zuhri Noor",
    "avatar": "https://avatars.githubusercontent.com/u/85988261?v=4",
    "role": "Software Engineer",
    "skills": ["MERN", "Python", "Java", "SQL", "PHP"],
    "bio": "MCA Student",
    "github": "https://github.com/ZuhriNoor",
    "linkedin": "https://www.linkedin.com/in/zuhrinoor",
    "email": "zuhrinoor12@gmail.com",
    "experience": [
      // {
      //   "id": 1,
      //   "company": "Life",
      //   "role": "Manager",
      //   "duration": "2002 - Present",
      //   "description": "Not bad."
      // }
    ],
    "education": [
      {
        "id": 1,
        "institution": "MES Keveeyam College, Valanchery, Malappuram",
        "degree": "Bachelor of Computer Application",
        "duration": "2021 - 2024",
        "description": "Completed BCA successfully."
      },
      {
        "id": 2,
        "institution": "College of Engineering, Trivandrum",
        "degree": "Master of Computer Application",
        "duration": "2024 - 2026",
        "description": "Pursuing."
      }
    ],
    "projects": [
      {
        "id": 1,
        "title": "Zetra",
        "description": "A Sustainable Online Platform for E-Waste Collection, Refurbishment and Service",
        "technologies": ["React", "Node JS", "Express", "MongoDB"],
        "link": "https://github.com/ZuhriNoor/zetraProject"
      }
    ]
  },  
  {
    id: 28,
    name: "Gokul P",
    avatar: "https://avatars.githubusercontent.com/u/111432335?v=4",
    role: "MERN Stack Developer",
    skills: ["Python", "Java", "MySQL", "MongoDB", "Php", "BlockChain"],
    github: "https://github.com/Gokulmnz",
    linkedin: "https://linkedin.com/gokulmnz",
    email: "career.gkp@gmail.com",
    bio: "Aspiring financial analyst and developer pursuing MCA, blending tech skills with financial insight. Passionate about business growth, innovation, and entrepreneurship.",
    experience: [
      {
        id: 1,
        company: "CETMCA26 Community",
        role: "MERN Stack Developer",
        duration: "2024 - Present",
        description:
          "Building and maintaining full-stack applications using React, Node.js, MongoDB, and Express. Exploring blockchain integration and backend enhancements for financial solutions.",
      }
    ],
    education: [
      {
        id: 1,
        institution: "College of Engineering Trivandrum",
        degree: "Master of Computer Applications",
        duration: "2024 - 2026",
        description: "Focusing on full-stack development and financial technologies.",
      },
      {
        id: 2,
        institution: "University of Calicut",
        degree: "Bachelor of Science in Computer Science",
        duration: "2021 - 2024",
        description: "Built a strong foundation in programming, databases, and web development.",
      }
    ],
    projects: [
      {
        id: 1,
        title: "FinGrow - Financial Growth App",
        description:
          "A web platform to analyze spending habits and suggest investment strategies for students and young professionals.",
        technologies: ["React", "Node.js", "MongoDB", "Blockchain"],
        link: "https://github.com/Gokulmnz/fin-grow",
      }
    ],
  },
  {
    "id": 13,
    "name": "Anandu P N",
    "avatar": "https://media.licdn.com/dms/image/v2/D4E03AQGDzEjSr6U3lw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1731236977864?e=2147483647&v=beta&t=4praNly4wbAGAn3hBJHZBX0mOi4Tx_PWuzvWERkau9o",
    "role": "Aspiring DevOps Engineer",
    "skills": ["Python", "Java", "MySQL", "React", "Php", "Docker"],
    "github": "https://github.com/anandu-pn",
    "linkedin": "www.linkedin.com/in/anandupn",
    "email": "anandupn@hotmail.com",
    "bio": "As a Master of Computer Applications (MCA) student with a fervent passion for technology, I am on a journey to shape my aspirations into reality. My dream is to become a proficient DevOps and Network Engineer, someone who bridges the gap between software development and IT operations while ensuring seamless network infrastructures.",
    "experience": [
      {
        "id": 1,
        "company": "CETMCA26 Community",
        "role": "Aspiring DevOps Engineer",
        "duration": "2024 - Present",
        "description": "The appeal of DevOps lies in its ability to streamline workflows, enhance collaboration, and deliver faster, more reliable solutions. Paired with my intrigue in networking, which encompasses the design, implementation, and maintenance of robust communication systems, I aspire to be a professional who thrives on solving real-world challenges. The convergence of these domains enables me to think holistically about system efficiency, security, and scalability."
      }
    ],
    "education": [
      {
        "id": 1,
        "institution": "College of Engineering Trivandrum",
        "degree": "Master of Computer Applications",
        "duration": "2024 - 2026",
        "description": "Specializing in Networking."
      },
      {
        "id": 2,
        "institution": "Govt Arts and Science College Calicut",
        "degree": "Bachelor of Science Physics",
        "duration": "2021 - 2024",
        "description": "Combine Nanophysics to explore nanoscale matter with Computational Physics to solve challenges through advanced simulations."
      }
    ],
    "projects": [
      {
        "id": 1,
        "title": "Open Smrithi",
        "description": "A blockchain-based system secures certificate issuance and verification, with student portfolio pages showcasing achievements.",
        "technologies": ["React", "Metamask", "IPFS", "Polygon"],
        "link": "https://github.com/cetmca26/smriticert-frontend"
      }
    ]
  }
,  

  {
    "id": 53,
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
  },
  {
    id: 4,
    name: "Abhishek Abhayakumar",
    avatar: "https://avatars.githubusercontent.com/u/187165055?v=4",
    role: "Aspiring Software Engineer",
    skills: ["Python", "Java", "MySQL", "Django", "Php", "ML"],
    github: "https://github.com/abhishekabhayakumar",
    linkedin: "https://linkedin.com/abhishekabhayakumar",
    email: "abhishekabhay5286@gmail.com",
    bio: "Software engineering enthusiast pursuing MCA with a keen interest in Machine Learning. Driven by a passion to build intelligent systems that solve real-world problems.",
    experience: [
      {
        id: 1,
        company: "CETMCA26 Community",
        role: "Aspiring Software Engineer",
        duration: "2024 - Present",
        description:
          "Developing intelligent applications using Python, Django, and Machine Learning. Focused on creating real-world solutions with efficient, scalable architectures.",
      }
    ],
    education: [
      {
        id: 1,
        institution: "College of Engineering Trivandrum",
        degree: "Master of Computer Applications",
        duration: "2024 - 2026",
        description: "Specializing in Artificial Intelligence and Software Engineering.",
      },
      {
        id: 2,
        institution: "Yenepoya University",
        degree: "Bachelor of Computer Applications",
        duration: "2020 - 2023",
        description: "Built skills in software development, data science, and databases.",
      }
    ],
    projects: [
      {
        id: 1,
        title: "SmartHealth AI",
        description:
          "A Django-based web application that predicts potential health risks using machine learning models.",
        technologies: ["Python", "Django", "ML", "SQLite"],
        link: "https://github.com/abhishekabhayakumar/",
      }
    ],
  },
  {
    "id": 5,
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
    "bio": "Software developer crafting dynamic, scalable web apps with seamless user experiences. Passionate about innovation, efficient solutions, and growing with every challenge.",
    "experience": [
      {
        "id": 1,
        "company": "CETMCA26 Community",
        "role": "MERN Stack Developer",
        "duration": "2024 - Present",
        "description": "A dynamic full-stack project built to deliver seamless frontend experiences and powerful backend performance, leveraging modern technologies for a complete, scalable solution."
      }
    ],
    "education": [
      {
        "id": 1,
        "institution": "Christ Nagar College, Trivandrum",
        "degree": "Bachelor of Computer Application",
        "duration": "2020 - 2023",
        "description": "Building the future at the crossroads of software development and design."
      },
      {
        "id": 2,
        "institution": "College of Engineering, Trivandrum",
        "degree": "Master of Computer Application",
        "duration": "2024 - Present",
        "description": "That early foundation now powers leading-edge technologies and exceptional user experiences."
      }
    ],
    "projects": [
      {
        "id": 1,
        "title": "iPanchayat",
        "description": "This project aims to digitize the Panchayat system by creating an online platform for managing records, public services, and citizen interactions. It streamlines governance, increases transparency, and ensures faster, more efficient service delivery to rural communities.",
        "technologies": ["MongoDB", "Express", "AngularJS", "Node.js"],
        "link": "https://github.com/abhxi-r-s/ipanchayat.git"
      },
      {
        "id": 2,
        "title": "Weather-APP",
        "description": "This Android Weather App provides real-time weather updates, forecasts, and location-based weather details using a simple and user-friendly interface. Powered by reliable weather APIs, it ensures users stay informed about current conditions, anytime, anywhere.",
        "technologies": ["Android Studio", "Java", "XML"],
        "link": "https://github.com/abhxi-r-s/Weather-app/tree/master"
      }
    ]
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
    "bio": "I am an aspiring iOS developer passionate about contributing to the vibrant Apple community while exploring Swift-driven platforms like iOS, WatchOS, tvOS, and macOS. Committed to continuous learning, I aim to craft innovative applications that enhance user experiences across the entire Apple ecosystem.",
    "experience": [
      {
        "id": 1,
        "company": "CETMCA26 Community",
        "role": "Aspiring iOS Developer",
        "duration": "2024-Present",
        "description": "As an aspiring iOS developer, my responsibilities include designing and developing applications across iOS, WatchOS, tvOS, and macOS while ensuring they deliver seamless and engaging user experiences. Additionally, I strive to stay updated with Apple ecosystem advancements and actively contribute to the Apple developer community."
      }
    ],
    "education": [
      {
        "id": 1,
        "institution": "College of Engineering Trivandrum",
        "degree": "Master of Computer Applications",
        "duration": "2024-2026",
        "description": "Strong foundation in programming languages and technologies including Java, Python, C, HTML, CSS and more."
      },
      {
        "id": 2,
        "institution": "CAS IHRD Karthikappally",
        "degree": "Bachelor of Computer Application",
        "duration": "2020-2024",
        "description": "Strong foundation in programming languages and technologies including C, C++, PHP, Java, HTML, and more."
      }
    ],
    "projects": [
      {
        "id": 1,
        "title": "KinderGarden Website",
        "description": "A colorful, child-friendly kindergarten website built with Django, offering fun activities and engaging educational content for young children. It also features interactive games developed with Pygame to make learning playful and exciting.",
        "technologies": [
          "Django",
          "Pygame",
          "MySQL"
        ],
        "link": "https://github.com/Subisuresh321/KinderGarden-Website.git"
      }
    ]
  }
,  
  {
    "id": "50",
    "name": "Sana S Navas",
    "avatar": "https://media.licdn.com/dms/image/v2/D5603AQEQZIfL6_GpQg/profile-displayphoto-shrink_400_400/B56ZZ03JkeGoAk-/0/1745717337396?e=2147483647&v=beta&t=97yrb7QKtuh_08JhwErKyAWmkRThkb8Uyl2VhaJU37k",
    "role": "Data Scientist",
    "skills": ["Python", "Java", "HTML", "CSS", "PHP", "SQL", "C", "MongoDB"],
    "github": "https://github.com/SanaSNavas7",
    "linkedin": "https://www.linkedin.com/in/sana-s-navas-787514249",
    "email": "sananavas100@gmail.com",
    "bio": "As an aspiring tech professional, I am deeply passionate about exploring the world of machine learning, uncovering insights through data analysis, and creating impactful web applications. Eager to learn, build, and innovate, I aim to turn ideas into real-world solutions that make a difference.",
    "experience": [
      {
        "id": 1,
        "company": "ICFOSS",
        "role": "Intern",
        "duration": "Jan 2024 - Feb 2024",
        "description": "Worked as a Machine Learning intern focusing on the analysis of aerosols, temperature variations, and radiative forcing using machine learning techniques."
      },
      {
        "id": 2,
        "company": "IBM",
        "role": "Intern",
        "duration": "Nov 2024",
        "description": "Completed a summer internship at IBM, contributing to a diabetes prediction project using machine learning techniques."
      }
    ],
    "education": [
      {
        "id": 1,
        "institution": "College of Engineering Trivandrum (CET)",
        "degree": "Master of Computer Applications",
        "duration": "2024 - 2026",
        "description": "Strong foundation in programming languages and technologies including PHP, Java, Python, C, HTML, and more."
      }
    ],
    "projects": [
      {
        "id": 1,
        "title": "Analysis of relationship between atmospheric aerosols and temperature using machine learning algorithms",
        "description": "Analyzed the relationship between atmospheric aerosols and temperature patterns using machine learning. Applied data preprocessing, feature engineering, and advanced modeling techniques to study the influence of aerosols on climate behavior.",
        "technologies": ["Machine Learning"],
        "link": "https://github.com/SanaSNavas7/Machine-Learning/blob/main/aerosolopticaldepth.ipynb"
      },
      {
        "id": 2,
        "title": "Diabetes Prediction",
        "description": "Developed predictive models to identify potential diabetes cases using machine learning algorithms. Focused on data preprocessing, feature selection, and evaluation using Random Forest, Logistic Regression, and K-Nearest Neighbors.",
        "technologies": ["Machine Learning"],
        "link": "https://github.com/SanaSNavas7/Machine-Learning/blob/main/Diabetes.ipynb"
      }
    ]
  },
  {
    "id": 21,
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
    "bio": "Aspiring software engineer passionate about building efficient, user-friendly applications. Eager to learn, grow, and contribute to innovative tech solutions.",
    "experience": [
      {
        "id": 1,
        "company": "cetmca26",
        "role": "Content creator",
        "duration": "2024 - present",
        "description": "Assisted in creating and managing contents."
      }
    ],
    "education": [
      {
        "id": 1,
        "institution": "Farook College (Autonomous), Calicut",
        "degree": "Bachelor of Science in Computer Science",
        "duration": "2021-24",
        "description": "NCC C certificate Holder"
      },
      {
        "id": 2,
        "institution": "College of Engineering Trivandrum",
        "degree": "Masters in Computer Application",
        "duration": "2024-26",
        "description": "Assisted in developing and maintaining CETMCA26 community page."
      }
    ],
    "projects": [
      {
        "id": 1,
        "title": "Portfolio",
        "description": "Portfolio page of Bhavana Theruvath",
        "technologies": [
          "HTML",
          "CSS",
          "JavaScript"
        ],
        "link": "https://github.com/bhavanatheruvath"
      }
    ]
  }
,  
    
  
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
    <div className="container mx-auto px-4 py-8 mt-4 mb-4">
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
              <StudentQRCodeDialog studentId={student.id.toString()} studentName={student.name} />
            </div>
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold tracking-tight mb-2">{student.name}</h1>
            <p className="text-xl text-cyan-400 mb-4">{student.role}</p>
            <p className="text-muted-foreground mb-6 max-w-2xl">{student.bio}</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {student.skills.map((skill: string) => (
                <Badge key={skill} variant="secondary" className="hover:bg-cyan-500 hover:text-black">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="experience" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3 ">
            <TabsTrigger value="experience" >Experience</TabsTrigger>
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
