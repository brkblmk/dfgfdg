"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, X, Minimize2, Maximize2, Utensils } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

const quickQuestions = [
  "Günlük kalori ihtiyacım nedir?",
  "Protein ihtiyacım ne kadar?",
  "Kilo verme planı öner",
  "Kas yapma diyeti",
  "Sağlıklı atıştırmalık öner",
  "Su tüketimi ne kadar olmalı?",
]

const dietitianResponses = {
  kalori:
    "Günlük kalori ihtiyacınız yaş, cinsiyet, boy, kilo ve aktivite seviyenize göre değişir. Ortalama bir yetişkin için 1800-2500 kalori arasındadır. Kişiselleştirilmiş hesaplama için randevu alabilirsiniz.",
  protein:
    "Günlük protein ihtiyacınız vücut ağırlığınızın kg başına 0.8-1.2 gram arasındadır. Spor yapıyorsanız bu miktar 1.6-2.2 grama çıkabilir. Kaliteli protein kaynakları: tavuk, balık, yumurta, baklagiller.",
  "kilo verme":
    "Sağlıklı kilo verme haftada 0.5-1 kg arasında olmalıdır. Kalori açığı oluşturmak, düzenli egzersiz ve dengeli beslenme önemlidir. Kişisel plan için randevu alın.",
  "kas yapma":
    "Kas yapımı için yeterli protein (vücut ağırlığı kg başına 1.6-2.2g), karbonhidrat ve sağlıklı yağlar gereklidir. Antrenman sonrası 30 dakika içinde protein alımı önemlidir.",
  atıştırmalık:
    "Sağlıklı atıştırmalıklar: çiğ badem/ceviz, meyveler, yoğurt, tam tahıllı krakerler, humus ile sebze çubukları. Porsiyon kontrolü önemlidir.",
  su: "Günlük su ihtiyacınız vücut ağırlığınızın kg başına 30-35 ml'dir. Spor yapıyorsanız bu miktarı artırın. Günde en az 8-10 bardak su için.",
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Merhaba! Ben ParsFit diyetisyen asistanınızım. Beslenme, diyet ve sağlıklı yaşam konularında size yardımcı olabilirim. Size nasıl yardımcı olabilirim?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Sadece giriş yapmış kullanıcılar için göster
  if (!user) {
    return null
  }

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const lowerMessage = message.toLowerCase()
      let botResponse =
        "Bu konuda size daha detaylı yardımcı olmak için lütfen daha spesifik bir soru sorun. Beslenme, diyet planları, kalori hesaplaması gibi konularda yardımcı olabilirim. Ayrıca kişiselleştirilmiş danışmanlık için randevu alabilirsiniz."

      // Simple keyword matching
      for (const [key, response] of Object.entries(dietitianResponses)) {
        if (lowerMessage.includes(key)) {
          botResponse = response
          break
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: botResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-20 z-50">
        <Button
          size="lg"
          className="bg-green-600 hover:bg-green-700 rounded-full w-14 h-14 shadow-lg animate-pulse"
          onClick={() => setIsOpen(true)}
        >
          <Utensils className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-20 z-50">
      <Card className={`w-80 shadow-xl transition-all duration-300 ${isMinimized ? "h-16" : "h-96"}`}>
        <CardHeader className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Utensils className="h-5 w-5" />
              <CardTitle className="text-sm">Diyetisyen Asistanı</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-green-700 p-1 h-6 w-6"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-green-700 p-1 h-6 w-6"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-300 rounded-full"></div>
            <span className="text-xs text-green-100">Çevrimiçi - {user.name}</span>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.type === "bot" && <Utensils className="h-4 w-4 mt-0.5 text-green-600" />}
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Utensils className="h-4 w-4 text-green-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="p-3 border-t bg-gray-50">
              <div className="flex flex-wrap gap-1 mb-3">
                {quickQuestions.map((question, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-green-50 hover:border-green-300 text-xs"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-3 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Beslenme sorunuzu yazın..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                  className="flex-1"
                />
                <Button
                  size="sm"
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
