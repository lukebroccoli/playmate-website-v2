"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If already authenticated, redirect to home page
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    const success = login(username, password)
    if (success) {
      router.push('/')
    } else {
      setError("Invalid username or password")
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side with background */}
      <div className="flex-1 bg-gradient-to-br from-purple-600 to-purple-900 p-8 flex flex-col justify-center lg:p-12">
        <div className="max-w-xl mx-auto">
          <div className="text-white mb-6">
            <svg viewBox="0 0 24 24" className="w-12 h-12 mb-4" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
            <h1 className="text-4xl font-bold mb-4">Sign up to support your favorite creators</h1>
          </div>
        </div>
      </div>

      {/* Right side with form */}
      <div className="flex-1 p-8 flex flex-col justify-center lg:p-12">
        <div className="max-w-md w-full mx-auto space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold">Log in</h2>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Input 
                type="text" 
                placeholder="Username" 
                className="w-full" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2 relative">
              <Input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                className="w-full pr-10" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-5 text-gray-500 hover:text-purple-700"
              >
                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              LOG IN
            </Button>
          </form>

          <div className="text-sm text-center text-gray-500">
            By logging in and using the platform, you agree to our{" "}
            <Link href="#" className="text-purple-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-purple-600 hover:underline">
              Privacy Policy
            </Link>
            , and confirm that you are at least 18 years old.
          </div>

          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full hover:border-purple-600 hover:text-purple-600"
              onClick={() => {}}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                />
              </svg>
              Sign in with X
            </Button>
            <Button
              variant="outline"
              className="w-full hover:border-purple-600 hover:text-purple-600"
              onClick={() => {}}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </Button>
            <Button
              variant="outline"
              className="w-full hover:border-purple-600 hover:text-purple-600"
              onClick={() => {}}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                />
                <path
                  fill="currentColor"
                  d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                />
              </svg>
              Passwordless Sign In
            </Button>
          </div>

          <div className="text-sm text-center space-x-2">
            <Link href="#" className="text-purple-600 hover:underline">
              Forgot password?
            </Link>
            <span>·</span>
            <Link href="#" className="text-purple-600 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}