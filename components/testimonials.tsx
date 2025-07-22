"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { DataManager, type Testimonial, type Branch } from "@/lib/data-management"
import { LoadingSpinner } from "@/components/loading-spinner"
import { formatDate } from "@/lib/utils"
import { Star, Quote, MapPin } from "lucide-react"

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [branches, setBranches] = useState<Branch[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [testimonialsData, branchesData] = await Promise.all([
          DataManager.getTestimonials(),
          DataManager.getBranches(),
        ])
        setTestimonials(testimonialsData)
        setBranches(branchesData)
      } catch (error) {
        console.error("Error loading testimonials:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const getBranchName = (branchId: string) => {
    const branch = branches.find((b) => b.id === branchId)
    return branch ? branch.name.replace("ParsFit™ ", "") : ""
  }

  if (isLoading) {
    return (
      <div className="py-20 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Müşteri <span className="text-primary-600">Yorumları</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ParsFit™ ailesinin bir parçası olan üyelerimizin deneyimleri
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                  <Quote className="h-6 w-6 text-primary-600" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</blockquote>

                {/* Author Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image || `/placeholder.svg?height=50&width=50&text=${testimonial.name.charAt(0)}`}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>{getBranchName(testimonial.branchId)}</span>
                      <span>•</span>
                      <span>{formatDate(testimonial.date)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-primary-600 to-primary-700 text-white border-0 shadow-2xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">500+</div>
                  <div className="text-primary-100">Mutlu Üye</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">%95</div>
                  <div className="text-primary-100">Memnuniyet Oranı</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">4.8</div>
                  <div className="text-primary-100">Ortalama Puan</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">3</div>
                  <div className="text-primary-100">Şube</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
