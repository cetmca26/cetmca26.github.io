export interface User {
  id: string
  username: string
  email: string
  createdAt: string
}

export interface Group {
  id: string
  name: string
  code: string
  adminId: string
  createdAt: string
}

export interface GroupMember {
  id: string
  groupId: string
  userId: string
  joinedAt: string
}

export interface Quiz {
  id: string
  groupId: string
  name: string
  description?: string
  startTime: string
  endTime: string
  duration: number // in minutes
  createdBy: string
  createdAt: string
}

export interface Question {
  id: string
  quizId: string
  question: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  correctAnswer: "A" | "B" | "C" | "D"
}

export interface QuizAttempt {
  id: string
  quizId: string
  userId: string
  startTime: string
  endTime: string
  score: number
  answers: {
    questionId: string
    selectedAnswer: "A" | "B" | "C" | "D" | null
  }[]
}

export interface LeaderboardEntry {
  userId: string
  username: string
  totalScore: number
  quizzesTaken: number
}
