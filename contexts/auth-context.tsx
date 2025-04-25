"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import {
  type User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"

type AuthContextType = {
  user: User | null
  loading: boolean
  error: string | null
  signUp: (email: string, password: string, username: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  getUserProfile: (userId: string) => Promise<any>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    // Check if auth is initialized
    if (!auth) {
      setError("Firebase authentication is not initialized")
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user)
        setLoading(false)
      },
      (error) => {
        console.error("Auth state change error:", error)
        setError("Authentication error: " + error.message)
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, username: string) => {
    try {
      if (!auth || !db) {
        throw new Error("Firebase is not initialized")
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Create user profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        createdAt: new Date().toISOString(),
      })
    } catch (error: any) {
      console.error("Error signing up:", error)
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      if (!auth) {
        throw new Error("Firebase is not initialized")
      }

      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      console.error("Error signing in:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      if (!auth) {
        throw new Error("Firebase is not initialized")
      }

      await signOut(auth)
    } catch (error: any) {
      console.error("Error signing out:", error)
      throw error
    }
  }

  const getUserProfile = async (userId: string) => {
    try {
      if (!db) {
        throw new Error("Firebase is not initialized")
      }

      const userDoc = await getDoc(doc(db, "users", userId))
      if (userDoc.exists()) {
        return userDoc.data()
      }
      return null
    } catch (error: any) {
      console.error("Error getting user profile:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, signUp, signIn, logout, getUserProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
