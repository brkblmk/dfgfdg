"use client"

import { useState, useEffect } from "react"
import { DataManager, type ContactInfo, type Branch } from "@/lib/data-management"
import { Zap, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube, MessageCircle } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [branches, setBranches] = useState<Branch[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const [contactData, branchesData] = await Promise.all([DataManager.getContactInfo(), DataManager.getBranches()])
        setContactInfo(contactData)
        setBranches(branchesData)
      } catch (error) {
        console.error("Error loading footer data:", error)
      }
    }

    loadData()
  }, [])

  if (!contactInfo) {
    return null
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">ParsFit™</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Türkiye'nin en modern EMS fitness stüdyosu. 20 dakikada 3 saatlik antrenman etkisi ile hedeflerinize
              ulaşın.
            </p>
            <div className="flex space-x-4">
              <a
                href={contactInfo.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={contactInfo.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={contactInfo.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={contactInfo.socialMedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href={contactInfo.socialMedia.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Hızlı Linkler</h3>
            <ul className="space-y-3">
              <li>
                <a href="#anasayfa" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Ana Sayfa
                </a>
              </li>
              <li>
                <a href="#hizmetler" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Hizmetler
                </a>
              </li>
              <li>
                <a href="#hakkimizda" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Hakkımızda
                </a>
              </li>
              <li>
                <a href="#fiyatlar" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Fiyatlar
                </a>
              </li>
              <li>
                <a href="#blog" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#iletisim" className="text-gray-300 hover:text-primary-400 transition-colors">
                  İletişim
                </a>
              </li>
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Şubelerimiz</h3>
            <div className="space-y-4">
              {branches.map((branch) => (
                <div key={branch.id} className="space-y-2">
                  <h4 className="font-medium text-primary-400">{branch.name}</h4>
                  <div className="space-y-1 text-sm text-gray-300">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{branch.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      <span>{branch.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">İletişim</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">{contactInfo.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">{contactInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">{contactInfo.email}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>Hafta içi: {contactInfo.workingHours.weekdays}</p>
                  <p>Cumartesi: {contactInfo.workingHours.saturday}</p>
                  <p>Pazar: {contactInfo.workingHours.sunday}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">© 2024 ParsFit™ EMS Studio. Tüm hakları saklıdır.</div>
            <div className="flex space-x-6 text-sm">
              <Link href="/gizlilik-politikasi" className="text-gray-400 hover:text-primary-400 transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/kullanim-sartlari" className="text-gray-400 hover:text-primary-400 transition-colors">
                Kullanım Şartları
              </Link>
              <Link href="/kvkk" className="text-gray-400 hover:text-primary-400 transition-colors">
                KVKK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
