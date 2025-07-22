"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const botResponses = {
  greeting: [
    "Merhaba! ParsFit™ EMS Studio'ya hoş geldiniz! Size nasıl yardımcı olabilirim?",
    "Selam! EMS antrenmanları hakkında merak ettiğiniz bir şey var mı?",
    "Hoş geldiniz! ParsFit™ hakkında bilgi almak için buradayım.",
  ],
  ems: [
    "EMS (Elektriksel Kas Stimülasyonu), kaslarınızı elektriksel impulslarla çalıştıran devrimci bir antrenman yöntemidir. 20 dakikada 3 saatlik geleneksel antrenman etkisi sağlar!",
    "EMS teknolojisi, vücudunuzdaki tüm kas gruplarını aynı anda aktive eder. Bu sayede çok daha kısa sürede maksimum sonuç alırsınız.",
    "EMS antrenmanı, geleneksel spora göre %30 daha fazla kas lifi aktive eder ve eklemlere minimum yük bindirir.",
  ],
  fiyat: [
    "Fiyatlarımız paket seçiminize göre değişmektedir. Başlangıç paketi 299₺/ay, Profesyonel paket 499₺/ay, Elite paket ise 699₺/ay'dır.",
    "Ücretsiz deneme seansımız var! İlk seansınızı ücretsiz deneyebilir, sonrasında size uygun paketi seçebilirsiniz.",
    "Özel indirimlerimiz için randevu alabilirsiniz. Yeni üyelerimize özel %20 indirim fırsatımız bulunuyor!",
  ],
  randevu: [
    "Randevu almak için 'Randevu Al' butonuna tıklayabilir veya 0532 123 45 67 numarasından bizi arayabilirsiniz.",
    "Online randevu sistemimizden kolayca randevu alabilirsiniz. Size uygun saat ve koçu seçebilirsiniz.",
    "WhatsApp üzerinden de randevu alabilirsiniz! Sağ alttaki WhatsApp butonuna tıklayın.",
  ],
  lokasyon: [
    "Şişli, İstanbul'da bulunuyoruz. Tam adresimiz: Mecidiyeköy Mahallesi, Büyükdere Caddesi No:123, Şişli/İstanbul",
    "Metro ve otobüs hatlarına çok yakınız. Mecidiyeköy metro istasyonuna 5 dakika yürüme mesafesindeyiz.",
    "Ücretsiz otopark imkanımız bulunmaktadır.",
  ],
  saat: [
    "Hafta içi 09:00-21:00, Hafta sonu 10:00-18:00 saatleri arasında hizmet veriyoruz.",
    "Pazartesi-Cuma 09:00-21:00, Cumartesi-Pazar 10:00-18:00 açığız.",
    "Esnek saat seçeneklerimiz var. Size uygun saati randevu alırken belirleyebilirsiniz.",
  ],
  default: [
    "Bu konuda size daha detaylı bilgi verebilmek için randevu almanızı öneriyorum. Uzmanlarımız size yardımcı olacaktır.",
    "Merak ettiğiniz konuyu daha iyi anlayabilmem için biraz daha detay verebilir misiniz?",
    "Bu sorunuzun cevabını uzmanlarımızdan alabilirsiniz. Randevu almak ister misiniz?",
  ],
}

export function GeneralChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Merhaba! ParsFit™ EMS Studio'ya hoş geldiniz! EMS antrenmanları, fiyatlar, randevu alma ve stüdyomuz hakkında sorularınızı yanıtlayabilirim. Size nasıl yardımcı olabilirim?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("merhaba") || message.includes("selam") || message.includes("hello")) {
      return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)]
    }

    if (message.includes("ems") || message.includes("antrenman") || message.includes("egzersiz")) {
      return botResponses.ems[Math.floor(Math.random() * botResponses.ems.length)]
    }

    if (
      message.includes("fiyat") ||
      message.includes("ücret") ||
      message.includes("paket") ||
      message.includes("para")
    ) {
      return botResponses.fiyat[Math.floor(Math.random() * botResponses.fiyat.length)]
    }

    if (message.includes("randevu") || message.includes("rezervasyon") || message.includes("seans")) {
      return botResponses.randevu[Math.floor(Math.random() * botResponses.randevu.length)]
    }

    if (
      message.includes("adres") ||
      message.includes("lokasyon") ||
      message.includes("nerede") ||
      message.includes("konum")
    ) {
      return botResponses.lokasyon[Math.floor(Math.random() * botResponses.lokasyon.length)]
    }

    if (
      message.includes("saat") ||
      message.includes("açık") ||
      message.includes("kapalı") ||
      message.includes("çalışma")
    ) {
      return botResponses.saat[Math.floor(Math.random() * botResponses.saat.length)]
    }

    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)]
  }

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)

    setInputText("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 rounded-full w-14 h-14 shadow-lg"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-80 max-w-[calc(100vw-3rem)] md:w-96">
          <Card className="shadow-2xl border-0">
            <CardHeader className="bg-blue-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="h-5 w-5" />
                  <span>ParsFit™ Asistan</span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-blue-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-blue-100 text-sm">EMS ve stüdyo bilgileri</p>
            </CardHeader>

            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === "bot" && <Bot className="h-4 w-4 mt-0.5 text-blue-600" />}
                        {message.sender === "user" && <User className="h-4 w-4 mt-0.5" />}
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Mesajınızı yazın..."
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <Button variant="outline" size="sm" onClick={() => setInputText("EMS nedir?")} className="text-xs">
                    EMS Nedir?
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInputText("Fiyatlar nedir?")}
                    className="text-xs"
                  >
                    Fiyatlar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInputText("Randevu nasıl alırım?")}
                    className="text-xs"
                  >
                    Randevu
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
