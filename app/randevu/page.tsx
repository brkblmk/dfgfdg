"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, User, Phone, Mail, MessageCircle, CheckCircle } from "lucide-react"

const services = [
  { id: "ems-personal", name: "EMS Kişisel Antrenman", duration: "20 dk", price: "₺150" },
  { id: "ems-group", name: "EMS Grup Antrenmanı", duration: "25 dk", price: "₺100" },
  { id: "weight-loss", name: "Kilo Verme Programı", duration: "30 dk", price: "₺200" },
  { id: "muscle-building", name: "Kas Geliştirme", duration: "25 dk", price: "₺180" },
  { id: "rehabilitation", name: "Rehabilitasyon", duration: "30 dk", price: "₺220" },
  { id: "express", name: "Express Antrenman", duration: "15 dk", price: "₺120" },
]

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
]

export default function RandevuPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  })

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleSubmit = () => {
    // Form submission logic here
    setStep(4) // Success step
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Randevu Al</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Size en uygun hizmeti seçin ve randevunuzu kolayca oluşturun
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= stepNumber ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step > stepNumber ? <CheckCircle className="h-6 w-6" /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-4 ${step > stepNumber ? "bg-primary-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-16 mt-4">
            <span className={`text-sm ${step >= 1 ? "text-primary-600" : "text-gray-500"}`}>Hizmet Seçimi</span>
            <span className={`text-sm ${step >= 2 ? "text-primary-600" : "text-gray-500"}`}>Tarih & Saat</span>
            <span className={`text-sm ${step >= 3 ? "text-primary-600" : "text-gray-500"}`}>Bilgileriniz</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Step 1: Service Selection */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-primary-600" />
                  <span>Hizmet Seçimi</span>
                </CardTitle>
                <CardDescription>Size en uygun antrenman türünü seçin</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.service === service.id
                          ? "border-primary-500 bg-primary-50"
                          : "border-gray-200 hover:border-primary-300"
                      }`}
                      onClick={() => setFormData({ ...formData, service: service.id })}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{service.name}</h3>
                        <span className="text-primary-600 font-bold">{service.price}</span>
                      </div>
                      <p className="text-sm text-gray-600">Süre: {service.duration}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-6">
                  <Button
                    onClick={handleNext}
                    disabled={!formData.service}
                    className="bg-primary-600 hover:bg-primary-700"
                  >
                    Devam Et
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Date & Time Selection */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary-600" />
                  <span>Tarih ve Saat Seçimi</span>
                </CardTitle>
                <CardDescription>Uygun tarih ve saati seçin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="date">Tarih Seçin</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div>
                  <Label>Saat Seçin</Label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={formData.time === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFormData({ ...formData, time })}
                        className={formData.time === time ? "bg-primary-600 hover:bg-primary-700" : ""}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Geri
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!formData.date || !formData.time}
                    className="bg-primary-600 hover:bg-primary-700"
                  >
                    Devam Et
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Personal Information */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-primary-600" />
                  <span>Kişisel Bilgiler</span>
                </CardTitle>
                <CardDescription>İletişim bilgilerinizi girin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Ad Soyad *</Label>
                    <Input
                      id="name"
                      placeholder="Adınız ve soyadınız"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefon *</Label>
                    <Input
                      id="phone"
                      placeholder="0532 123 45 67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">E-posta *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ornek@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Notlar (Opsiyonel)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Özel istekleriniz veya sağlık durumunuz hakkında bilgi..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                {/* Randevu Özeti */}
                <div className="bg-primary-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary-900 mb-2">Randevu Özeti</h4>
                  <div className="space-y-1 text-sm text-primary-800">
                    <p>
                      <strong>Hizmet:</strong> {services.find((s) => s.id === formData.service)?.name}
                    </p>
                    <p>
                      <strong>Tarih:</strong> {formData.date}
                    </p>
                    <p>
                      <strong>Saat:</strong> {formData.time}
                    </p>
                    <p>
                      <strong>Ücret:</strong> {services.find((s) => s.id === formData.service)?.price}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Geri
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!formData.name || !formData.phone || !formData.email}
                    className="bg-primary-600 hover:bg-primary-700"
                  >
                    Randevu Oluştur
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <Card>
              <CardContent className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Randevunuz Oluşturuldu!</h2>
                <p className="text-gray-600 mb-6">
                  Randevunuz başarıyla kaydedildi. Size SMS ve e-posta ile onay gönderilecek.
                </p>

                <div className="bg-gray-50 p-4 rounded-lg mb-6 max-w-md mx-auto">
                  <h4 className="font-semibold text-gray-900 mb-2">Randevu Detayları</h4>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>
                      <strong>Hizmet:</strong> {services.find((s) => s.id === formData.service)?.name}
                    </p>
                    <p>
                      <strong>Tarih:</strong> {formData.date}
                    </p>
                    <p>
                      <strong>Saat:</strong> {formData.time}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-primary-600 hover:bg-primary-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    Takvime Ekle
                  </Button>
                  <Button variant="outline" onClick={() => window.open("https://wa.me/908501234567", "_blank")}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp Destek
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Contact Info */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sorularınız mı var?</h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    0850 123 45 67
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    info@parsfit.com
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp Destek
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
