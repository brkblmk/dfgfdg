"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataManager, type AboutContent } from "@/lib/data-management"
import { LoadingSpinner } from "@/components/loading-spinner"
import { CheckCircle, Users, Award, TrendingUp, MapPin } from "lucide-react"
import Link from "next/link"

export function About() {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadAboutContent = async () => {
      try {
        const content = await DataManager.getAboutContent()
        setAboutContent(content)
      } catch (error) {
        console.error("Error loading about content:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAboutContent()
  }, [])

  if (isLoading) {
    return (
      <div className="py-20 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!aboutContent) {
    return null
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="mb-8">
              <h3 className="text-primary-600 font-semibold text-lg mb-2">{aboutContent.subtitle}</h3>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{aboutContent.title}</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">{aboutContent.description}</p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {aboutContent.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-primary-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{aboutContent.stats.experience}</div>
                <div className="text-sm text-gray-600">Deneyim</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{aboutContent.stats.clients}</div>
                <div className="text-sm text-gray-600">Mutlu Müşteri</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-primary-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{aboutContent.stats.success}</div>
                <div className="text-sm text-gray-600">Başarı Oranı</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-primary-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{aboutContent.stats.branches}</div>
                <div className="text-sm text-gray-600">Şube</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/randevu">
                <Button className="bg-primary-600 hover:bg-primary-700 px-8">Randevu Al</Button>
              </Link>
              <Link href="#iletisim">
                <Button variant="outline" className="px-8 bg-transparent">
                  İletişime Geç
                </Button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={aboutContent.image || "/placeholder.svg?height=600&width=500&text=ParsFit+Studio"}
                alt="ParsFit EMS Studio"
                className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
              />

              {/* Floating Card */}
              <Card className="absolute -bottom-8 -left-8 bg-white shadow-2xl border-0 z-20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">%95</div>
                      <div className="text-sm text-gray-600">Müşteri Memnuniyeti</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-8 right-8 w-72 h-72 bg-primary-100 rounded-full -z-10"></div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary-50 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
