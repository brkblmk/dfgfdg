"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProtectedRoute } from "@/components/protected-route"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useToast } from "@/hooks/use-toast"
import { getCurrentUser, type User } from "@/lib/auth"
import { formatDate, formatCurrency } from "@/lib/utils"
import {
  DataManager,
  type HeroContent,
  type AboutContent,
  type ServiceContent,
  type PricingPlan,
  type Testimonial,
  type BlogPost,
  type ContactInfo,
  type UserProfile,
  type Branch,
  type Appointment,
} from "@/lib/data-management"
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  FileText,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Save,
  RefreshCw,
  Home,
  Star,
  Phone,
  MapPin,
  Building,
  Palette,
  ImageIcon,
  Layout,
} from "lucide-react"

// Mock stats data
const mockStats = {
  totalUsers: 247,
  activeUsers: 189,
  totalAppointments: 1234,
  todayAppointments: 23,
  monthlyRevenue: 45600,
  averageSessionPrice: 165,
  completionRate: 94.5,
  customerSatisfaction: 4.8,
}

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Data states
  const [branches, setBranches] = useState<Branch[]>([])
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null)
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null)
  const [services, setServices] = useState<ServiceContent[]>([])
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [users, setUsers] = useState<UserProfile[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])

  // UI states
  const [editingContent, setEditingContent] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Branding states
  const [brandingSettings, setBrandingSettings] = useState({
    primaryColor: "#f34723",
    secondaryColor: "#64748b",
    logoUrl: "/logo.png",
    faviconUrl: "/favicon.ico",
    companyName: "ParsFit™",
    tagline: "EMS Teknolojisinde Öncü",
  })

  const { toast } = useToast()

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = getCurrentUser()
        setCurrentUser(user)

        const [
          branchesData,
          heroData,
          aboutData,
          servicesData,
          plansData,
          testimonialsData,
          blogData,
          contactData,
          usersData,
          appointmentsData,
        ] = await Promise.all([
          DataManager.getBranches(),
          DataManager.getHeroContent(),
          DataManager.getAboutContent(),
          DataManager.getServices(),
          DataManager.getPricingPlans(),
          DataManager.getTestimonials(),
          DataManager.getAllBlogPosts(),
          DataManager.getContactInfo(),
          DataManager.getUsers(),
          DataManager.getAppointments(),
        ])

        setBranches(branchesData)
        setHeroContent(heroData)
        setAboutContent(aboutData)
        setServices(servicesData)
        setPricingPlans(plansData)
        setTestimonials(testimonialsData)
        setBlogPosts(blogData)
        setContactInfo(contactData)
        setUsers(usersData)
        setAppointments(appointmentsData)
      } catch (error) {
        console.error("Error loading data:", error)
        toast({
          title: "Hata",
          description: "Veriler yüklenirken bir hata oluştu.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [toast])

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: "success" as const, label: "Aktif" },
      inactive: { variant: "secondary" as const, label: "Pasif" },
      suspended: { variant: "warning" as const, label: "Askıda" },
      expired: { variant: "destructive" as const, label: "Süresi Dolmuş" },
      cancelled: { variant: "destructive" as const, label: "İptal" },
      scheduled: { variant: "info" as const, label: "Planlandı" },
      completed: { variant: "success" as const, label: "Tamamlandı" },
      published: { variant: "success" as const, label: "Yayında" },
      draft: { variant: "warning" as const, label: "Taslak" },
      paid: { variant: "success" as const, label: "Ödendi" },
      pending: { variant: "warning" as const, label: "Bekliyor" },
      failed: { variant: "destructive" as const, label: "Başarısız" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const handleSaveContent = async (type: string, data: any) => {
    setIsSaving(true)
    try {
      switch (type) {
        case "branch":
          if (data.id) {
            const updated = await DataManager.updateBranch(data.id, data)
            setBranches(branches.map((b) => (b.id === data.id ? updated : b)))
          } else {
            const newBranch = await DataManager.createBranch(data)
            setBranches([...branches, newBranch])
          }
          break
        case "hero":
          const updatedHero = await DataManager.updateHeroContent(data)
          setHeroContent(updatedHero)
          break
        case "about":
          const updatedAbout = await DataManager.updateAboutContent(data)
          setAboutContent(updatedAbout)
          break
        case "service":
          if (data.id) {
            const updated = await DataManager.updateService(data.id, data)
            setServices(services.map((s) => (s.id === data.id ? updated : s)))
          } else {
            const newService = await DataManager.createService(data)
            setServices([...services, newService])
          }
          break
        case "pricing":
          if (data.id) {
            const updated = await DataManager.updatePricingPlan(data.id, data)
            setPricingPlans(pricingPlans.map((p) => (p.id === data.id ? updated : p)))
          } else {
            const newPlan = await DataManager.createPricingPlan(data)
            setPricingPlans([...pricingPlans, newPlan])
          }
          break
        case "testimonial":
          if (data.id) {
            const updated = await DataManager.updateTestimonial(data.id, data)
            setTestimonials(testimonials.map((t) => (t.id === data.id ? updated : t)))
          } else {
            const newTestimonial = await DataManager.createTestimonial(data)
            setTestimonials([...testimonials, newTestimonial])
          }
          break
        case "blog":
          if (data.id) {
            const updated = await DataManager.updateBlogPost(data.id, data)
            setBlogPosts(blogPosts.map((b) => (b.id === data.id ? updated : b)))
          } else {
            const newPost = await DataManager.createBlogPost(data)
            setBlogPosts([...blogPosts, newPost])
          }
          break
        case "contact":
          const updatedContact = await DataManager.updateContactInfo(data)
          setContactInfo(updatedContact)
          break
        case "user":
          if (data.id) {
            const updated = await DataManager.updateUserProfile(data.id, data)
            setUsers(users.map((u) => (u.id === data.id ? updated : u)))
          } else {
            const newUser = await DataManager.createUser(data)
            setUsers([...users, newUser])
          }
          break
        case "branding":
          setBrandingSettings(data)
          // Apply branding changes to CSS variables
          document.documentElement.style.setProperty("--primary", data.primaryColor)
          document.documentElement.style.setProperty("--secondary", data.secondaryColor)
          break
      }

      toast({
        title: "Başarılı",
        description: "İçerik başarıyla güncellendi.",
      })
      setEditingContent(null)
      setEditingItem(null)
      setIsDialogOpen(false)
    } catch (error) {
      toast({
        title: "Hata",
        description: "İçerik güncellenirken bir hata oluştu.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteItem = async (type: string, id: string) => {
    try {
      switch (type) {
        case "branch":
          await DataManager.deleteBranch(id)
          setBranches(branches.filter((b) => b.id !== id))
          break
        case "service":
          await DataManager.deleteService(id)
          setServices(services.filter((s) => s.id !== id))
          break
        case "user":
          await DataManager.deleteUser(id)
          setUsers(users.filter((u) => u.id !== id))
          break
        case "blog":
          await DataManager.deleteBlogPost(id)
          setBlogPosts(blogPosts.filter((b) => b.id !== id))
          break
      }

      toast({
        title: "Başarılı",
        description: "Öğe başarıyla silindi.",
      })
    } catch (error) {
      toast({
        title: "Hata",
        description: "Silme işlemi sırasında bir hata oluştu.",
        variant: "destructive",
      })
    }
  }

  const handleExportData = (type: string) => {
    toast({
      title: "Veri Dışa Aktarılıyor",
      description: `${type} verileri Excel formatında indiriliyor...`,
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Hoş geldiniz, {currentUser?.name} - ParsFit™ EMS Studio Yönetim Paneli</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" onClick={() => handleExportData("Genel Rapor")}>
                  <Download className="h-4 w-4 mr-2" />
                  Rapor İndir
                </Button>
                <Button className="bg-primary-600 hover:bg-primary-700" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Yenile
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Toplam Üye</p>
                    <p className="text-3xl font-bold text-gray-900">{mockStats.totalUsers}</p>
                    <p className="text-sm text-green-600">+12% bu ay</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Bugünkü Randevular</p>
                    <p className="text-3xl font-bold text-gray-900">{mockStats.todayAppointments}</p>
                    <p className="text-sm text-blue-600">5 tamamlandı</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Aylık Gelir</p>
                    <p className="text-3xl font-bold text-gray-900">{formatCurrency(mockStats.monthlyRevenue)}</p>
                    <p className="text-sm text-green-600">+8% geçen ay</p>
                  </div>
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tamamlanma Oranı</p>
                    <p className="text-3xl font-bold text-gray-900">%{mockStats.completionRate}</p>
                    <p className="text-sm text-green-600">Mükemmel</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="overview">Genel</TabsTrigger>
              <TabsTrigger value="branches">Şubeler</TabsTrigger>
              <TabsTrigger value="homepage">Ana Sayfa</TabsTrigger>
              <TabsTrigger value="users">Üyeler</TabsTrigger>
              <TabsTrigger value="appointments">Randevular</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
              <TabsTrigger value="branding">Marka</TabsTrigger>
              <TabsTrigger value="settings">Ayarlar</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-primary-600" />
                      <span>Son Aktiviteler</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Yeni üye kaydı</p>
                          <p className="text-sm text-gray-600">Ayşe Demir - Çankaya Şubesi</p>
                          <p className="text-xs text-gray-500">2 saat önce</p>
                        </div>
                        <Badge variant="success">Yeni</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Blog yazısı yayınlandı</p>
                          <p className="text-sm text-gray-600">EMS Antrenmanının Faydaları</p>
                          <p className="text-xs text-gray-500">5 saat önce</p>
                        </div>
                        <Badge variant="info">Blog</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Randevu tamamlandı</p>
                          <p className="text-sm text-gray-600">Mehmet Kaya - Keçiören Şubesi</p>
                          <p className="text-xs text-gray-500">1 gün önce</p>
                        </div>
                        <Badge variant="success">Tamamlandı</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Hızlı İşlemler</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="h-20 flex-col space-y-2 bg-transparent hover:bg-primary-50"
                        onClick={() => {
                          setEditingItem({})
                          setEditingContent("user")
                          setIsDialogOpen(true)
                        }}
                      >
                        <Plus className="h-6 w-6" />
                        <span>Yeni Üye</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-20 flex-col space-y-2 bg-transparent hover:bg-primary-50"
                        onClick={() => {
                          setEditingItem({})
                          setEditingContent("branch")
                          setIsDialogOpen(true)
                        }}
                      >
                        <Building className="h-6 w-6" />
                        <span>Yeni Şube</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-20 flex-col space-y-2 bg-transparent hover:bg-primary-50"
                        onClick={() => {
                          setEditingItem({})
                          setEditingContent("blog")
                          setIsDialogOpen(true)
                        }}
                      >
                        <FileText className="h-6 w-6" />
                        <span>Blog Yazısı</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-20 flex-col space-y-2 bg-transparent hover:bg-primary-50"
                        onClick={() => handleExportData("Tüm Veriler")}
                      >
                        <Download className="h-6 w-6" />
                        <span>Veri Dışa Aktar</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Branches Management Tab */}
            <TabsContent value="branches" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="h-5 w-5 text-primary-600" />
                      <span>Şube Yönetimi</span>
                    </CardTitle>
                    <Button
                      onClick={() => {
                        setEditingItem({})
                        setEditingContent("branch")
                        setIsDialogOpen(true)
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Yeni Şube Ekle
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {branches.map((branch) => (
                      <Card key={branch.id} className="border hover:shadow-lg transition-shadow">
                        <div className="relative">
                          <img
                            src={branch.image || "/placeholder.svg?height=200&width=300&text=Şube+Fotoğrafı"}
                            alt={branch.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <div className="absolute top-4 right-4">
                            {getStatusBadge(branch.isActive ? "active" : "inactive")}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg mb-2">{branch.name}</h3>
                          <div className="space-y-2 text-sm text-gray-600 mb-4">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4" />
                              <span>{branch.address}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4" />
                              <span>{branch.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4" />
                              <span>Kapasite: {branch.capacity} kişi</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <ImageIcon className="h-4 w-4" />
                              <span>Müdür: {branch.manager}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 bg-transparent"
                              onClick={() => {
                                setEditingItem(branch)
                                setEditingContent("branch")
                                setIsDialogOpen(true)
                              }}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Düzenle
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteItem("branch", branch.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Homepage Management Tab */}
            <TabsContent value="homepage" className="space-y-6">
              {/* Hero Section */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Home className="h-5 w-5 text-primary-600" />
                      <span>Hero Bölümü</span>
                    </CardTitle>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingItem(heroContent)
                        setEditingContent("hero")
                        setIsDialogOpen(true)
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Düzenle
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {heroContent && (
                    <div className="space-y-2">
                      <p>
                        <strong>Başlık:</strong> {heroContent.title}
                      </p>
                      <p>
                        <strong>Alt Başlık:</strong> {heroContent.subtitle}
                      </p>
                      <p>
                        <strong>Açıklama:</strong> {heroContent.description}
                      </p>
                      <p>
                        <strong>Buton:</strong> {heroContent.buttonText}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* About Section */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Hakkımızda Bölümü</CardTitle>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingItem(aboutContent)
                        setEditingContent("about")
                        setIsDialogOpen(true)
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Düzenle
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {aboutContent && (
                    <div className="space-y-2">
                      <p>
                        <strong>Başlık:</strong> {aboutContent.title}
                      </p>
                      <p>
                        <strong>Alt Başlık:</strong> {aboutContent.subtitle}
                      </p>
                      <p>
                        <strong>Açıklama:</strong> {aboutContent.description}
                      </p>
                      <p>
                        <strong>Özellikler:</strong> {aboutContent.features.join(", ")}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Services Section */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Hizmetler</CardTitle>
                    <Button
                      size="sm"
                      onClick={() => {
                        setEditingItem({})
                        setEditingContent("service")
                        setIsDialogOpen(true)
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Yeni Hizmet
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{service.name}</h4>
                          <p className="text-sm text-gray-600">{service.shortDescription}</p>
                          <p className="text-sm font-medium">
                            {formatCurrency(service.price)} - {service.duration} dk
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(service.isActive ? "active" : "inactive")}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingItem(service)
                              setEditingContent("service")
                              setIsDialogOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteItem("service", service.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Plans */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Fiyatlandırma Planları</CardTitle>
                    <Button
                      size="sm"
                      onClick={() => {
                        setEditingItem({})
                        setEditingContent("pricing")
                        setIsDialogOpen(true)
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Yeni Plan
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {pricingPlans.map((plan) => (
                      <div key={plan.id} className="border rounded-lg p-4 relative">
                        {plan.isPopular && <Badge className="absolute -top-2 left-4 bg-primary-600">Popüler</Badge>}
                        <div className="text-center mb-4">
                          <h3 className="font-bold text-lg">{plan.name}</h3>
                          <p className="text-3xl font-bold">{formatCurrency(plan.price)}</p>
                          <p className="text-sm text-gray-600">/{plan.period}</p>
                        </div>
                        <ul className="space-y-2 mb-4">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="text-sm flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={() => {
                              setEditingItem(plan)
                              setEditingContent("pricing")
                              setIsDialogOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteItem("pricing", plan.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Testimonials */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-primary-600" />
                      <span>Müşteri Yorumları</span>
                    </CardTitle>
                    <Button
                      size="sm"
                      onClick={() => {
                        setEditingItem({})
                        setEditingContent("testimonial")
                        setIsDialogOpen(true)
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Yeni Yorum
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {testimonials.map((testimonial) => (
                      <div key={testimonial.id} className="flex items-start justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium">{testimonial.name}</h4>
                            <span className="text-sm text-gray-600">- {testimonial.role}</span>
                            <div className="flex">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">{testimonial.content}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          {getStatusBadge(testimonial.isActive ? "active" : "inactive")}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingItem(testimonial)
                              setEditingContent("testimonial")
                              setIsDialogOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteItem("testimonial", testimonial.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Management Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Üye Yönetimi</CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => handleExportData("Üyeler")}>
                        <Download className="h-4 w-4 mr-2" />
                        Dışa Aktar
                      </Button>
                      <Button
                        onClick={() => {
                          setEditingItem({})
                          setEditingContent("user")
                          setIsDialogOpen(true)
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Yeni Üye Ekle
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Search */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Üye ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtrele
                    </Button>
                  </div>

                  {/* Users Table */}
                  <div className="space-y-4">
                    {users
                      .filter(
                        (user) =>
                          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
                      )
                      .map((user) => (
                        <div key={user.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                <Users className="h-6 w-6 text-gray-600" />
                              </div>
                              <div>
                                <h3 className="font-medium">{user.name}</h3>
                                <p className="text-sm text-gray-600">{user.email}</p>
                                <p className="text-sm text-gray-600">{user.phone}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              {getStatusBadge(user.status)}
                              <p className="text-sm text-gray-600 mt-1">Üyelik: {formatDate(user.joinDate)}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline" title="Görüntüle">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                title="Düzenle"
                                onClick={() => {
                                  setEditingItem(user)
                                  setEditingContent("user")
                                  setIsDialogOpen(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteItem("user", user.id)}
                                title="Sil"
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Membership Info */}
                          {user.membership && (
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-sm">Üyelik: {user.membership.planName}</p>
                                  <p className="text-sm text-gray-600">
                                    Kalan Seans: {user.membership.remainingSessions}/{user.membership.totalSessions}
                                  </p>
                                  <p className="text-sm text-gray-600">Bitiş: {formatDate(user.membership.endDate)}</p>
                                </div>
                                <div className="text-right">
                                  {getStatusBadge(user.membership.status)}
                                  <p className="text-sm font-medium">{formatCurrency(user.membership.price)}</p>
                                  {getStatusBadge(user.membership.paymentStatus)}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appointments Tab */}
            <TabsContent value="appointments" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-primary-600" />
                      <span>Randevu Yönetimi</span>
                    </CardTitle>
                    <Button variant="outline" onClick={() => handleExportData("Randevular")}>
                      <Download className="h-4 w-4 mr-2" />
                      Dışa Aktar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{appointment.userName}</h3>
                            <p className="text-sm text-gray-600">{appointment.serviceName}</p>
                            <p className="text-sm text-gray-600">
                              {appointment.branchName} - {appointment.coachName}
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatDate(appointment.date)} - {appointment.time}
                            </p>
                          </div>
                          <div className="text-right">
                            {getStatusBadge(appointment.status)}
                            <p className="text-sm font-medium">{formatCurrency(appointment.price)}</p>
                            <p className="text-sm text-gray-600">{appointment.duration} dakika</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Blog Management Tab */}
            <TabsContent value="blog" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Blog Yönetimi</CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => handleExportData("Blog")}>
                        <Download className="h-4 w-4 mr-2" />
                        Dışa Aktar
                      </Button>
                      <Button
                        onClick={() => {
                          setEditingItem({})
                          setEditingContent("blog")
                          setIsDialogOpen(true)
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Yeni Blog Yazısı
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium mb-2">{post.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>Yazar: {post.author}</span>
                              <span>Kategori: {post.category}</span>
                              <span>Tarih: {formatDate(post.publishedAt)}</span>
                              <span>Görüntülenme: {post.views}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            {getStatusBadge(post.status)}
                            {post.isFeatured && <Badge variant="info">Öne Çıkan</Badge>}
                            <Button size="sm" variant="outline" title="Görüntüle">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              title="Düzenle"
                              onClick={() => {
                                setEditingItem(post)
                                setEditingContent("blog")
                                setIsDialogOpen(true)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteItem("blog", post.id)}
                              title="Sil"
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Branding Tab */}
            <TabsContent value="branding" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Palette className="h-5 w-5 text-primary-600" />
                      <span>Marka Ayarları</span>
                    </CardTitle>
                    <CardDescription>Sitenizin görünümünü ve markasını özelleştirin</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="company-name">Şirket Adı</Label>
                      <Input
                        id="company-name"
                        value={brandingSettings.companyName}
                        onChange={(e) => setBrandingSettings({ ...brandingSettings, companyName: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="tagline">Slogan</Label>
                      <Input
                        id="tagline"
                        value={brandingSettings.tagline}
                        onChange={(e) => setBrandingSettings({ ...brandingSettings, tagline: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="primary-color">Ana Renk</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Input
                          id="primary-color"
                          type="color"
                          value={brandingSettings.primaryColor}
                          onChange={(e) => setBrandingSettings({ ...brandingSettings, primaryColor: e.target.value })}
                          className="w-16 h-10"
                        />
                        <Input
                          value={brandingSettings.primaryColor}
                          onChange={(e) => setBrandingSettings({ ...brandingSettings, primaryColor: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="secondary-color">İkincil Renk</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Input
                          id="secondary-color"
                          type="color"
                          value={brandingSettings.secondaryColor}
                          onChange={(e) => setBrandingSettings({ ...brandingSettings, secondaryColor: e.target.value })}
                          className="w-16 h-10"
                        />
                        <Input
                          value={brandingSettings.secondaryColor}
                          onChange={(e) => setBrandingSettings({ ...brandingSettings, secondaryColor: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="logo-url">Logo URL</Label>
                      <Input
                        id="logo-url"
                        value={brandingSettings.logoUrl}
                        onChange={(e) => setBrandingSettings({ ...brandingSettings, logoUrl: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    <Button
                      onClick={() => handleSaveContent("branding", brandingSettings)}
                      className="w-full bg-primary-600 hover:bg-primary-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Marka Ayarlarını Kaydet
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Layout className="h-5 w-5 text-primary-600" />
                      <span>Menü Yönetimi</span>
                    </CardTitle>
                    <CardDescription>Site menüsünü özelleştirin</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Ana Sayfa</h4>
                            <p className="text-sm text-gray-600">/#anasayfa</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="success">Aktif</Badge>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Hizmetler</h4>
                            <p className="text-sm text-gray-600">/#hizmetler</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="success">Aktif</Badge>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Hakkımızda</h4>
                            <p className="text-sm text-gray-600">/#hakkimizda</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="success">Aktif</Badge>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Blog</h4>
                            <p className="text-sm text-gray-600">/#blog</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="success">Aktif</Badge>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full bg-transparent">
                        <Plus className="h-4 w-4 mr-2" />
                        Yeni Menü Öğesi Ekle
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sistem Ayarları</CardTitle>
                    <CardDescription>Genel sistem ayarlarını yönetin</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Bildirim Ayarları</h4>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-sm">Email bildirimleri</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-sm">SMS bildirimleri</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-sm">WhatsApp bildirimleri</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">İletişim Bilgileri</h4>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditingItem(contactInfo)
                          setEditingContent("contact")
                          setIsDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        İletişim Bilgilerini Düzenle
                      </Button>
                    </div>

                    <Button className="bg-primary-600 hover:bg-primary-700">
                      <Save className="h-4 w-4 mr-2" />
                      Ayarları Kaydet
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sistem Durumu</CardTitle>
                    <CardDescription>Sistem performansı ve durum bilgileri</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Sistem Durumu</span>
                        <Badge variant="success">Çevrimiçi</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Veritabanı</span>
                        <Badge variant="success">Bağlı</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Son Yedekleme</span>
                        <span className="text-sm text-gray-900">2 saat önce</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Aktif Kullanıcılar</span>
                        <span className="text-sm text-gray-900">23</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Toplam Şube</span>
                        <span className="text-sm text-gray-900">{branches.length}</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full bg-transparent">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sistem Durumunu Yenile
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingContent === "branch" && (editingItem?.id ? "Şube Düzenle" : "Yeni Şube Ekle")}
              {editingContent === "hero" && "Hero Bölümü Düzenle"}
              {editingContent === "about" && "Hakkımızda Bölümü Düzenle"}
              {editingContent === "service" && (editingItem?.id ? "Hizmet Düzenle" : "Yeni Hizmet Ekle")}
              {editingContent === "pricing" && (editingItem?.id ? "Plan Düzenle" : "Yeni Plan Ekle")}
              {editingContent === "testimonial" && (editingItem?.id ? "Yorum Düzenle" : "Yeni Yorum Ekle")}
              {editingContent === "blog" && (editingItem?.id ? "Blog Yazısı Düzenle" : "Yeni Blog Yazısı")}
              {editingContent === "contact" && "İletişim Bilgileri Düzenle"}
              {editingContent === "user" && (editingItem?.id ? "Üye Düzenle" : "Yeni Üye Ekle")}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {editingContent === "branch" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="branch-name">Şube Adı</Label>
                    <Input
                      id="branch-name"
                      value={editingItem?.name || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="branch-manager">Müdür</Label>
                    <Input
                      id="branch-manager"
                      value={editingItem?.manager || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, manager: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="branch-address">Adres</Label>
                  <Textarea
                    id="branch-address"
                    value={editingItem?.address || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, address: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="branch-phone">Telefon</Label>
                    <Input
                      id="branch-phone"
                      value={editingItem?.phone || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="branch-email">E-posta</Label>
                    <Input
                      id="branch-email"
                      type="email"
                      value={editingItem?.email || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="branch-capacity">Kapasite</Label>
                    <Input
                      id="branch-capacity"
                      type="number"
                      value={editingItem?.capacity || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, capacity: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="branch-image">Şube Fotoğrafı URL</Label>
                  <Input
                    id="branch-image"
                    value={editingItem?.image || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Çalışma Saatleri</Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div>
                      <Label htmlFor="weekdays">Hafta İçi</Label>
                      <Input
                        id="weekdays"
                        value={editingItem?.workingHours?.weekdays || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            workingHours: { ...editingItem?.workingHours, weekdays: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="saturday">Cumartesi</Label>
                      <Input
                        id="saturday"
                        value={editingItem?.workingHours?.saturday || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            workingHours: { ...editingItem?.workingHours, saturday: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="sunday">Pazar</Label>
                      <Input
                        id="sunday"
                        value={editingItem?.workingHours?.sunday || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            workingHours: { ...editingItem?.workingHours, sunday: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {editingContent === "hero" && (
              <>
                <div>
                  <Label htmlFor="hero-title">Ana Başlık</Label>
                  <Input
                    id="hero-title"
                    value={editingItem?.title || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="hero-subtitle">Alt Başlık</Label>
                  <Input
                    id="hero-subtitle"
                    value={editingItem?.subtitle || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="hero-description">Açıklama</Label>
                  <Textarea
                    id="hero-description"
                    value={editingItem?.description || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hero-button">Buton Metni</Label>
                    <Input
                      id="hero-button"
                      value={editingItem?.buttonText || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, buttonText: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-link">Buton Linki</Label>
                    <Input
                      id="hero-link"
                      value={editingItem?.buttonLink || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, buttonLink: e.target.value })}
                    />
                  </div>
                </div>
              </>
            )}

            {editingContent === "about" && (
              <>
                <div>
                  <Label htmlFor="about-title">Başlık</Label>
                  <Input
                    id="about-title"
                    value={editingItem?.title || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="about-subtitle">Alt Başlık</Label>
                  <Input
                    id="about-subtitle"
                    value={editingItem?.subtitle || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="about-description">Açıklama</Label>
                  <Textarea
                    id="about-description"
                    rows={4}
                    value={editingItem?.description || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="about-features">Özellikler (virgülle ayırın)</Label>
                  <Textarea
                    id="about-features"
                    value={editingItem?.features?.join(", ") || ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        features: e.target.value.split(",").map((f) => f.trim()),
                      })
                    }
                  />
                </div>
              </>
            )}

            {editingContent === "service" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="service-name">Hizmet Adı</Label>
                    <Input
                      id="service-name"
                      value={editingItem?.name || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="service-category">Kategori</Label>
                    <Select
                      value={editingItem?.category || ""}
                      onValueChange={(value) => setEditingItem({ ...editingItem, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Kategori seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Kişisel</SelectItem>
                        <SelectItem value="group">Grup</SelectItem>
                        <SelectItem value="program">Program</SelectItem>
                        <SelectItem value="therapy">Terapi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="service-description">Açıklama</Label>
                  <Textarea
                    id="service-description"
                    value={editingItem?.description || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="service-short-description">Kısa Açıklama</Label>
                  <Input
                    id="service-short-description"
                    value={editingItem?.shortDescription || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, shortDescription: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="service-price">Fiyat (TL)</Label>
                    <Input
                      id="service-price"
                      type="number"
                      value={editingItem?.price || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="service-duration">Süre (dakika)</Label>
                    <Input
                      id="service-duration"
                      type="number"
                      value={editingItem?.duration || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, duration: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="service-features">Özellikler (virgülle ayırın)</Label>
                  <Textarea
                    id="service-features"
                    value={editingItem?.features?.join(", ") || ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        features: e.target.value.split(",").map((f) => f.trim()),
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Mevcut Şubeler</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {branches.map((branch) => (
                      <label key={branch.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={editingItem?.availableBranches?.includes(branch.id) || false}
                          onChange={(e) => {
                            const currentBranches = editingItem?.availableBranches || []
                            if (e.target.checked) {
                              setEditingItem({
                                ...editingItem,
                                availableBranches: [...currentBranches, branch.id],
                              })
                            } else {
                              setEditingItem({
                                ...editingItem,
                                availableBranches: currentBranches.filter((id) => id !== branch.id),
                              })
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{branch.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {editingContent === "pricing" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="plan-name">Plan Adı</Label>
                    <Input
                      id="plan-name"
                      value={editingItem?.name || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="plan-period">Periyot</Label>
                    <Select
                      value={editingItem?.period || ""}
                      onValueChange={(value) => setEditingItem({ ...editingItem, period: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Periyot seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ay">Ay</SelectItem>
                        <SelectItem value="yıl">Yıl</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="plan-description">Açıklama</Label>
                  <Textarea
                    id="plan-description"
                    value={editingItem?.description || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="plan-price">Fiyat (TL)</Label>
                  <Input
                    id="plan-price"
                    type="number"
                    value={editingItem?.price || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="plan-features">Özellikler (virgülle ayırın)</Label>
                  <Textarea
                    id="plan-features"
                    value={editingItem?.features?.join(", ") || ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        features: e.target.value.split(",").map((f) => f.trim()),
                      })
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="plan-popular"
                    checked={editingItem?.isPopular || false}
                    onChange={(e) => setEditingItem({ ...editingItem, isPopular: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="plan-popular">Popüler plan olarak işaretle</Label>
                </div>
              </>
            )}

            {editingContent === "testimonial" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="testimonial-name">Ad Soyad</Label>
                    <Input
                      id="testimonial-name"
                      value={editingItem?.name || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="testimonial-role">Meslek</Label>
                    <Input
                      id="testimonial-role"
                      value={editingItem?.role || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="testimonial-content">Yorum</Label>
                  <Textarea
                    id="testimonial-content"
                    rows={4}
                    value={editingItem?.content || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="testimonial-rating">Puan (1-5)</Label>
                    <Select
                      value={editingItem?.rating?.toString() || ""}
                      onValueChange={(value) => setEditingItem({ ...editingItem, rating: Number(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Puan seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Yıldız</SelectItem>
                        <SelectItem value="2">2 Yıldız</SelectItem>
                        <SelectItem value="3">3 Yıldız</SelectItem>
                        <SelectItem value="4">4 Yıldız</SelectItem>
                        <SelectItem value="5">5 Yıldız</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="testimonial-branch">Şube</Label>
                    <Select
                      value={editingItem?.branchId || ""}
                      onValueChange={(value) => setEditingItem({ ...editingItem, branchId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Şube seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id}>
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}

            {editingContent === "blog" && (
              <>
                <div>
                  <Label htmlFor="blog-title">Başlık</Label>
                  <Input
                    id="blog-title"
                    value={editingItem?.title || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="blog-excerpt">Özet</Label>
                  <Textarea
                    id="blog-excerpt"
                    rows={3}
                    value={editingItem?.excerpt || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="blog-content">İçerik</Label>
                  <Textarea
                    id="blog-content"
                    rows={8}
                    value={editingItem?.content || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="blog-author">Yazar</Label>
                    <Input
                      id="blog-author"
                      value={editingItem?.author || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, author: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="blog-category">Kategori</Label>
                    <Input
                      id="blog-category"
                      value={editingItem?.category || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="blog-tags">Etiketler (virgülle ayırın)</Label>
                  <Input
                    id="blog-tags"
                    value={editingItem?.tags?.join(", ") || ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        tags: e.target.value.split(",").map((t) => t.trim()),
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="blog-status">Durum</Label>
                    <Select
                      value={editingItem?.status || "draft"}
                      onValueChange={(value) => setEditingItem({ ...editingItem, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Taslak</SelectItem>
                        <SelectItem value="published">Yayında</SelectItem>
                        <SelectItem value="archived">Arşivlendi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <input
                      type="checkbox"
                      id="blog-featured"
                      checked={editingItem?.isFeatured || false}
                      onChange={(e) => setEditingItem({ ...editingItem, isFeatured: e.target.checked })}
                      className="rounded"
                    />
                    <Label htmlFor="blog-featured">Öne çıkan yazı</Label>
                  </div>
                </div>
              </>
            )}

            {editingContent === "contact" && (
              <>
                <div>
                  <Label htmlFor="contact-address">Adres</Label>
                  <Textarea
                    id="contact-address"
                    value={editingItem?.address || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, address: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-phone">Telefon</Label>
                    <Input
                      id="contact-phone"
                      value={editingItem?.phone || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">E-posta</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={editingItem?.email || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, email: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label>Çalışma Saatleri</Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div>
                      <Label htmlFor="contact-weekdays">Hafta İçi</Label>
                      <Input
                        id="contact-weekdays"
                        value={editingItem?.workingHours?.weekdays || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            workingHours: { ...editingItem?.workingHours, weekdays: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-saturday">Cumartesi</Label>
                      <Input
                        id="contact-saturday"
                        value={editingItem?.workingHours?.saturday || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            workingHours: { ...editingItem?.workingHours, saturday: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-sunday">Pazar</Label>
                      <Input
                        id="contact-sunday"
                        value={editingItem?.workingHours?.sunday || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            workingHours: { ...editingItem?.workingHours, sunday: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Sosyal Medya</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label htmlFor="contact-facebook">Facebook</Label>
                      <Input
                        id="contact-facebook"
                        value={editingItem?.socialMedia?.facebook || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            socialMedia: { ...editingItem?.socialMedia, facebook: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-instagram">Instagram</Label>
                      <Input
                        id="contact-instagram"
                        value={editingItem?.socialMedia?.instagram || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            socialMedia: { ...editingItem?.socialMedia, instagram: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-twitter">Twitter</Label>
                      <Input
                        id="contact-twitter"
                        value={editingItem?.socialMedia?.twitter || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            socialMedia: { ...editingItem?.socialMedia, twitter: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-whatsapp">WhatsApp</Label>
                      <Input
                        id="contact-whatsapp"
                        value={editingItem?.socialMedia?.whatsapp || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            socialMedia: { ...editingItem?.socialMedia, whatsapp: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {editingContent === "user" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="user-name">Ad Soyad</Label>
                    <Input
                      id="user-name"
                      value={editingItem?.name || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="user-email">E-posta</Label>
                    <Input
                      id="user-email"
                      type="email"
                      value={editingItem?.email || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="user-phone">Telefon</Label>
                    <Input
                      id="user-phone"
                      value={editingItem?.phone || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="user-preferred-branch">Tercih Edilen Şube</Label>
                    <Select
                      value={editingItem?.preferredBranch || ""}
                      onValueChange={(value) => setEditingItem({ ...editingItem, preferredBranch: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Şube seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id}>
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="user-birth-date">Doğum Tarihi</Label>
                    <Input
                      id="user-birth-date"
                      type="date"
                      value={editingItem?.dateOfBirth || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, dateOfBirth: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="user-gender">Cinsiyet</Label>
                    <Select
                      value={editingItem?.gender || ""}
                      onValueChange={(value) => setEditingItem({ ...editingItem, gender: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Cinsiyet seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Erkek</SelectItem>
                        <SelectItem value="female">Kadın</SelectItem>
                        <SelectItem value="other">Diğer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="user-status">Durum</Label>
                    <Select
                      value={editingItem?.status || "active"}
                      onValueChange={(value) => setEditingItem({ ...editingItem, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Aktif</SelectItem>
                        <SelectItem value="inactive">Pasif</SelectItem>
                        <SelectItem value="suspended">Askıda</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="user-address">Adres</Label>
                  <Textarea
                    id="user-address"
                    value={editingItem?.address || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, address: e.target.value })}
                  />
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={() => handleSaveContent(editingContent!, editingItem)} disabled={isSaving}>
              {isSaving ? <LoadingSpinner size="sm" /> : <Save className="h-4 w-4 mr-2" />}
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ProtectedRoute>
  )
}
