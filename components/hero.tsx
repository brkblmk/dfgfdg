"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DataManager, type HeroContent } from "@/lib/data-management"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Zap, Users, Clock, Award } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadHeroContent = async () => {
      try {
        const content = await DataManager.getHeroContent()
        setHeroContent(content)
      } catch (error) {
        console.error("Error loading hero content:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadHeroContent()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!heroContent) {
    return null
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920&text=EMS+Studio+Background')] bg-cover bg-center opacity-10"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-primary-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-primary-500/20 backdrop-blur-sm border border-primary-400/30 rounded-full text-primary-100 text-sm font-medium mb-8">
            <Zap className="w-4 h-4 mr-2" />
            {heroContent.subtitle}
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {heroContent.title.split(" ").map((word, index) => (
              <span key={index} className={index === heroContent.title.split(" ").length - 1 ? "text-primary-400" : ""}>
                {word}{" "}
              </span>
            ))}
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-primary-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            {heroContent.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href={heroContent.buttonLink}>
              <Button
                size="lg"
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <Zap className="w-5 h-5 mr-2" />
                {heroContent.buttonText}
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary-400 text-primary-100 hover:bg-primary-400 hover:text-primary-900 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300 bg-transparent"
            >
              <Users className="w-5 h-5 mr-2" />
              Şubelerimizi Keşfet
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-primary-400/30">
                <Clock className="w-8 h-8 text-primary-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">20</div>
              <div className="text-primary-200 text-sm">Dakika Antrenman</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-primary-400/30">
                <Zap className="w-8 h-8 text-primary-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">3x</div>
              <div className="text-primary-200 text-sm">Daha Etkili</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-primary-400/30">
                <Users className="w-8 h-8 text-primary-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-primary-200 text-sm">Mutlu Üye</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-primary-400/30">
                <Award className="w-8 h-8 text-primary-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">3</div>
              <div className="text-primary-200 text-sm">Şube</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
