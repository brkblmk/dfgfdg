"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { login, setCurrentUser, ADMIN_CREDENTIALS, DEMO_CREDENTIALS } from "@/lib/auth"
import { Eye, EyeOff, Zap, User, Lock, Mail, ArrowRight, Info } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const router = useRouter()
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "E-posta adresi gereklidir"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz"
    }

    if (!password) {
      newErrors.password = "Şifre gereklidir"
    } else if (password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalıdır"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const user = await login(email, password)

      if (user) {
        setCurrentUser(user)

        toast({
          title: "Giriş Başarılı!",
          description: `Hoş geldiniz, ${user.name}`,
        })

        // Redirect based on user role
        if (user.role === "admin") {
          router.push("/admin")
        } else if (user.role === "coach") {
          router.push("/coach-dashboard")
        } else {
          router.push("/user-dashboard")
        }
      } else {
        toast({
          title: "Giriş Başarısız",
          description: "E-posta veya şifre hatalı",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: "Bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async (credentials: typeof ADMIN_CREDENTIALS | typeof DEMO_CREDENTIALS) => {
    setEmail(credentials.email)
    setPassword(credentials.password)

    setIsLoading(true)

    try {
      const user = await login(credentials.email, credentials.password)

      if (user) {
        setCurrentUser(user)

        toast({
          title: "Demo Giriş Başarılı!",
          description: `${credentials.role === "admin" ? "Admin" : "Demo"} hesabı ile giriş yapıldı`,
        })

        if (user.role === "admin") {
          router.push("/admin")
        } else {
          router.push("/user-dashboard")
        }
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: "Demo giriş başarısız",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-3 rounded-xl">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">ParsFit™</span>
          </Link>
          <p className="text-gray-600 mt-2">EMS Studio Giriş Paneli</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center">Giriş Yap</CardTitle>
            <CardDescription className="text-center">Hesabınıza giriş yaparak özel içeriklere erişin</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Demo Credentials Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 mb-2">Demo Hesapları:</p>
                  <div className="space-y-2 text-blue-800">
                    <div>
                      <p className="font-medium">Admin Panel:</p>
                      <p>admin@parsfit.com / admin123</p>
                    </div>
                    <div>
                      <p className="font-medium">Kullanıcı Panel:</p>
                      <p>demo@parsfit.com / demo123</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-posta Adresi</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="ornek@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-600">Beni hatırla</span>
                </label>
                <Link href="/sifremi-unuttum" className="text-sm text-primary-600 hover:text-primary-700">
                  Şifremi unuttum
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Giriş yapılıyor...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Giriş Yap</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>

            <Separator />

            {/* Demo Login Buttons */}
            <div className="space-y-3">
              <p className="text-sm text-gray-600 text-center">Hızlı Demo Giriş:</p>

              <Button
                onClick={() => handleDemoLogin(ADMIN_CREDENTIALS)}
                variant="outline"
                className="w-full border-red-200 text-red-700 hover:bg-red-50"
                disabled={isLoading}
              >
                <User className="h-4 w-4 mr-2" />
                Admin Panel Demo
              </Button>

              <Button
                onClick={() => handleDemoLogin(DEMO_CREDENTIALS)}
                variant="outline"
                className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                disabled={isLoading}
              >
                <User className="h-4 w-4 mr-2" />
                Kullanıcı Panel Demo
              </Button>
            </div>

            <Separator />

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Hesabınız yok mu?{" "}
                <Link href="/kayit" className="text-primary-600 hover:text-primary-700 font-medium">
                  Kayıt olun
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-800">
            ← Ana sayfaya dön
          </Link>
        </div>
      </div>
    </div>
  )
}
