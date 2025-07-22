"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DataManager, type BlogPost } from "@/lib/data-management"
import { LoadingSpinner } from "@/components/loading-spinner"
import { formatDate } from "@/lib/utils"
import { Calendar, Clock, User, Heart, MessageCircle, Share2, Search, Filter, Eye } from "lucide-react"

const categories = ["Tümü", "Bilim", "Antrenman", "Beslenme", "Başarı Hikayeleri", "Rehber", "Kadın Sağlığı"]

export function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("Tümü")
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const posts = await DataManager.getBlogPosts()
        setBlogPosts(posts)
      } catch (error) {
        console.error("Error loading blog posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadBlogPosts()
  }, [])

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "Tümü" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  if (isLoading) {
    return (
      <div className="py-20 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Fitness <span className="text-primary-600">Blog</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            EMS antrenmanları, beslenme, sağlık ve fitness dünyasından en güncel bilgiler
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Blog yazılarında ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
              <Filter className="h-4 w-4 mr-2" />
              Filtreler
            </Button>
          </div>

          {/* Category Filters */}
          <div className={`${showFilters ? "block" : "hidden"} md:block`}>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-primary-600 hover:bg-primary-700"
                      : "bg-transparent hover:bg-primary-50"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && filteredPosts.find((post) => post.isFeatured) && (
          <div className="mb-12">
            {(() => {
              const featuredPost = filteredPosts.find((post) => post.isFeatured)!
              return (
                <Card className="overflow-hidden shadow-2xl border-0">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <img
                        src={featuredPost.image || "/placeholder.svg?height=400&width=600&text=Featured+Post"}
                        alt={featuredPost.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-1/2 p-8 flex flex-col justify-center">
                      <Badge className="bg-primary-600 text-white w-fit mb-4">Öne Çıkan</Badge>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{featuredPost.title}</h3>
                      <p className="text-gray-600 mb-6 text-lg leading-relaxed">{featuredPost.excerpt}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>{featuredPost.author}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(featuredPost.publishedAt)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Eye className="h-4 w-4" />
                          <span>{featuredPost.views}</span>
                        </div>
                      </div>
                      <Button className="bg-primary-600 hover:bg-primary-700 w-fit">Devamını Oku</Button>
                    </div>
                  </div>
                </Card>
              )
            })()}
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-12">
          {filteredPosts
            .filter((post) => !post.isFeatured)
            .map((post) => (
              <Card
                key={post.id}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg?height=250&width=400&text=Blog+Post"}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary-600 text-white">{post.category}</Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>5 dk okuma</span>
                    </div>
                  </div>

                  <CardTitle className="text-xl group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>

                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <img
                        src={post.authorImage || `/placeholder.svg?height=32&width=32&text=${post.author.charAt(0)}`}
                        alt={post.author}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-600">{post.author}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </div>
                    </div>

                    <Button size="sm" variant="ghost" className="text-primary-600 hover:text-primary-700">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button className="w-full bg-primary-600 hover:bg-primary-700">Devamını Oku</Button>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Newsletter Subscription */}
        <Card className="bg-gradient-to-r from-primary-600 to-primary-700 text-white border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Blog Güncellemelerini Kaçırmayın!</h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Yeni blog yazılarımızdan, fitness ipuçlarından ve özel kampanyalardan ilk siz haberdar olun.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="E-posta adresiniz" className="bg-white text-gray-900 border-0" />
              <Button className="bg-white text-primary-600 hover:bg-gray-100">Abone Ol</Button>
            </div>
          </CardContent>
        </Card>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aradığınız kriterlere uygun blog yazısı bulunamadı.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("Tümü")
              }}
              className="mt-4"
            >
              Filtreleri Temizle
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
