"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, type User } from "@/lib/auth"
import { LoadingSpinner } from "@/components/loading-spinner"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: User["role"]
  redirectTo?: string
}

export function ProtectedRoute({ children, requiredRole, redirectTo = "/giris" }: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const user = getCurrentUser()

      if (!user) {
        router.push(redirectTo)
        return
      }

      if (requiredRole) {
        // Admin has access to everything
        if (user.role === "admin") {
          setIsAuthorized(true)
        } else if (user.role !== requiredRole) {
          router.push("/unauthorized")
          return
        } else {
          setIsAuthorized(true)
        }
      } else {
        setIsAuthorized(true)
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [requiredRole, redirectTo, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}
