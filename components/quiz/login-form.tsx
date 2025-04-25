"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function LoginForm() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await signIn(email, password)
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access the quiz platform</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
          <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Button
                variant="link"
                className="p-0 h-auto text-sm"
                onClick={(e) => {
                  e.preventDefault()
                  setShowForgotPassword(true)
                }}
              >
                Forgot password?
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>

{showForgotPassword && (
  <div className="mt-4">
    <Alert variant="default">
      <div className="flex justify-between items-start">
        <div>
          <AlertTitle>Forgot Password?</AlertTitle>
          <AlertDescription>
            If you're unable to access your account, please{" "}
            <a href="/contact" className="underline text-blue-600">
              fill out this contact form
            </a>{" "}
            with your issue. Our support team will assist you.
          </AlertDescription>
        </div>
        <Button
          variant="ghost"
          className="p-1 h-auto"
          onClick={() => setShowForgotPassword(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Alert>
  </div>
)}
</>
  )
}
