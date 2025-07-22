"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DataManager, type PricingPlan, type Branch } from "@/lib/data-management"
import { LoadingSpinner } from "@/components/loading-spinner"
import { formatCurrency } from "@/lib/utils"
import { CheckCircle, Star, MapPin } from "lucide-react"
import Link from "next/link"

export function Pricing() {
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([])
  const [branches, setBranches] = useState<Branch[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [plansData, branchesData] = await Promise.all([DataManager.getPricingPlans(), DataManager.getBranches()])
        setPricingPlans(plansData)
        setBranches(branchesData)
      } catch (error) {
        console.error("Error loading pricing:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const getBranchNames = (branchIds: string[]) => {
    return branches
      .filter((branch) => branchIds.includes(branch.id))
      .map((branch) => branch.name.replace("ParsFit™ ", ""))
  }

  if (isLoading) {
    return (
      <div className="py-20 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Üyelik <span className="text-primary-600">Paketleri</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            İhtiyacınıza uygun paketi seçin, hedeflerinize ulaşın. Tüm paketlerde şube değişim hakkı.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                plan.isPopular
                  ? "border-2 border-primary-500 shadow-xl scale-105"
                  : "border border-gray-200 hover:border-primary-300"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-center py-2 text-sm font-semibold">
                  <Star className="inline h-4 w-4 mr-1" />
                  En Popüler
                </div>
              )}

              <CardHeader className={`text-center ${plan.isPopular ? "pt-12" : "pt-8"}`}>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary-600">{formatCurrency(plan.price)}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <CardDescription className="text-gray-600">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Available Branches */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Geçerli Şubeler:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {getBranchNames(plan.availableBranches).map((branchName, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {branchName}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Link href="/randevu">
                  <Button
                    className={`w-full ${
                      plan.isPopular ? "bg-primary-600 hover:bg-primary-700 shadow-lg" : "bg-gray-900 hover:bg-gray-800"
                    } transition-all duration-300`}
                    size="lg"
                  >
                    {plan.isPopular ? "Hemen Başla" : "Paketi Seç"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <Card className="bg-gray-50 border-0">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Tüm Paketlerde Dahil</h3>
              <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-primary-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Ücretsiz Danışmanlık</h4>
                  <p className="text-sm text-gray-600">İlk seans öncesi detaylı değerlendirme</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-primary-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Hijyenik Ortam</h4>
                  <p className="text-sm text-gray-600">Her seans öncesi ekipman dezenfeksiyonu</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-primary-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Esnek Randevu</h4>
                  <p className="text-sm text-gray-600">Online randevu sistemi ve iptal hakkı</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-primary-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">İlerleme Takibi</h4>
                  <p className="text-sm text-gray-600">Düzenli ölçüm ve değerlendirme</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
