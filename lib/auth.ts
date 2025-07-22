export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user" | "coach"
  phone?: string
  avatar?: string
}

export const ADMIN_CREDENTIALS = {
  email: "admin@parsfit.com",
  password: "admin123",
  role: "admin" as const,
}

export const DEMO_CREDENTIALS = {
  email: "demo@parsfit.com",
  password: "demo123",
  role: "user" as const,
}

const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@parsfit.com",
    role: "admin",
    phone: "0532 123 45 67",
  },
  {
    id: "2",
    name: "Demo User",
    email: "demo@parsfit.com",
    role: "user",
    phone: "0532 234 56 78",
  },
  {
    id: "3",
    name: "Elif Hanım",
    email: "elif@parsfit.com",
    role: "coach",
    phone: "0532 345 67 89",
  },
]

export async function login(email: string, password: string): Promise<User | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check admin credentials
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    const user = MOCK_USERS.find((u) => u.email === email)
    if (user) {
      setCurrentUser(user)
      return user
    }
  }

  // Check demo credentials
  if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
    const user = MOCK_USERS.find((u) => u.email === email)
    if (user) {
      setCurrentUser(user)
      return user
    }
  }

  // Check other mock users (for demo purposes)
  const user = MOCK_USERS.find((u) => u.email === email)
  if (user && password === "demo123") {
    setCurrentUser(user)
    return user
  }

  return null
}

export function setCurrentUser(user: User): void {
  localStorage.setItem("currentUser", JSON.stringify(user))
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  try {
    const stored = localStorage.getItem("currentUser")
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export function logout(): void {
  localStorage.removeItem("currentUser")
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

export function hasRole(requiredRole: User["role"]): boolean {
  const user = getCurrentUser()
  if (!user) return false

  // Admin has access to everything
  if (user.role === "admin") return true

  return user.role === requiredRole
}
