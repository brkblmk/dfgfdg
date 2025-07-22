"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DataManager, type Branch } from "@/lib/data-management"
import { Menu, X, Zap, User, Calendar, MapPin, ChevronDown } from "lucide-react"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [branches, setBranches] = useState<Branch[]>([])
  const [showBranches, setShowBranches] = useState(false)

  useEffect(() => {
    const loadBranches = async () => {
      try {
        const branchesData = await DataManager.getBranches()
        setBranches(branchesData)
      } catch (error) {
        console.error("Error loading branches:", error)
      }
    }

    loadBranches()
  }, [])

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ParsFit™</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#anasayfa" className="text-gray-700 hover:text-primary-600 transition-colors">
              Ana Sayfa
            </a>
            <a href="#hizmetler" className="text-gray-700 hover:text-primary-600 transition-colors">
              Hizmetler
            </a>
            <a href="#hakkimizda" className="text-gray-700 hover:text-primary-600 transition-colors">
              Hakkımızda
            </a>
            <a href="#fiyatlar" className="text-gray-700 hover:text-primary-600 transition-colors">
              Fiyatlar
            </a>
            <a href="#blog" className="text-gray-700 hover:text-primary-600 transition-colors">
              Blog
            </a>

            {/* Branches Dropdown */}
            <div className="relative">
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                onMouseEnter={() => setShowBranches(true)}
                onMouseLeave={() => setShowBranches(false)}
              >
                <MapPin className="h-4 w-4" />
                <span>Şubeler</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {showBranches && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2"
                  onMouseEnter={() => setShowBranches(true)}
                  onMouseLeave={() => setShowBranches(false)}
                >
                  {branches.map((branch) => (
                    <a key={branch.id} href="#iletisim" className="block px-4 py-3 hover:bg-gray-50 transition-colors">
                      <div className="font-medium text-gray-900">{branch.name}</div>
                      <div className="text-sm text-gray-600">{branch.address}</div>
                      <div className="text-sm text-primary-600">{branch.phone}</div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="#iletisim" className="text-gray-700 hover:text-primary-600 transition-colors">
              İletişim
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/giris">
              <Button
                variant="outline"
                className="border-primary-500 text-primary-600 hover:bg-primary-50 bg-transparent"
              >
                <User className="h-4 w-4 mr-2" />
                Giriş Yap
              </Button>
            </Link>
            <Link href="/randevu">
              <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
                <Calendar className="h-4 w-4 mr-2" />
                Randevu Al
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <a
                href="#anasayfa"
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Ana Sayfa
              </a>
              <a
                href="#hizmetler"
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Hizmetler
              </a>
              <a
                href="#hakkimizda"
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Hakkımızda
              </a>
              <a
                href="#fiyatlar"
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Fiyatlar
              </a>
              <a
                href="#blog"
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </a>

              {/* Mobile Branches */}
              <div className="border-t pt-4">
                <div className="text-sm font-medium text-gray-900 mb-2">Şubelerimiz:</div>
                {branches.map((branch) => (
                  <a
                    key={branch.id}
                    href="#iletisim"
                    className="block py-2 pl-4 text-gray-600 hover:text-primary-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="font-medium">{branch.name.replace("ParsFit™ ", "")}</div>
                    <div className="text-xs">{branch.phone}</div>
                  </a>
                ))}
              </div>

              <a
                href="#iletisim"
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                İletişim
              </a>

              <div className="flex flex-col space-y-2 pt-4">
                <Link href="/giris" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-primary-500 text-primary-600 bg-transparent hover:bg-primary-50"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Giriş Yap
                  </Button>
                </Link>
                <Link href="/randevu" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    Randevu Al
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
