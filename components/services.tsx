"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DataManager, type ServiceContent, type Branch } from "@/lib/data-management"
import { LoadingSpinner } from "@/components/loading-spinner"
import { formatCurrency } from "@/lib/utils"
import { Zap, Users, Target, Clock, CheckCircle, MapPin } from "lucide-react"
import Link from "next/link"

export function Services() {
  const [services, setServices] = useState<ServiceContent[]>([])
  const [branches, setBranches] = useState<Branch[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesData, branchesData] = await Promise.all([DataManager.getServices(), DataManager.getBranches()])
        setServices(servicesData)
        setBranches(branchesData)
      } catch (error) {
        console.error("Error loading services:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const getServiceIcon = (category: string) => {
    switch (category) {
      case "personal":
        return <Target className="h-8 w-8" />
      case "group":
        return <Users className="h-8 w-8" />
      case "program":
        return <Zap className="h-8 w-8" />
      default:
        return <Zap className="h-8 w-8" />
    }
  }

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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Hizmet<span className="text-primary-600">lerimiz</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            EMS teknolojisi ile kişiselleştirilmiş antrenman programları. Her ihtiyaca uygun çözümler.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <Card
              key={service.id}
              className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
            >
              <div className="relative">
                <img
                  src={service.image || `/placeholder.svg?height=250&width=400&text=${service.name}`}
                  alt={service.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary-600 text-white">
                    {service.category === "personal" ? "Kişisel" : service.category === "group" ? "Grup" : "Program"}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-600">
                    {getServiceIcon(service.category)}
                  </div>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl group-hover:text-primary-600 transition-colors">
                    {service.name}
                  </CardTitle>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">{formatCurrency(service.price)}</div>
                    <div className="text-sm text-gray-500">{service.duration} dakika</div>
                  </div>
                </div>
                <CardDescription className="text-gray-600">{service.description}</CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Features */}
                <div className="space-y-2 mb-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Available Branches */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Mevcut Şubeler:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {getBranchNames(service.availableBranches).map((branchName, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {branchName}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Link href="/randevu">
                  <Button className="w-full bg-primary-600 hover:bg-primary-700 group-hover:shadow-lg transition-all duration-300">
                    <Clock className="h-4 w-4 mr-2" />
                    Randevu Al
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-primary-600 to-primary-700 text-white border-0 shadow-2xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Hangi Hizmet Size Uygun?</h3>
              <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
                Uzman koçlarımız size en uygun programı belirlemek için ücretsiz danışmanlık veriyor.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/randevu">
                  <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                    Ücretsiz Danışmanlık
                  </Button>
                </Link>
                <Link href="#iletisim">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-primary-600 bg-transparent"
                  >
                    İletişime Geç
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
