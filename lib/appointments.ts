export interface Appointment {
  id: string
  userId: string
  userName: string
  userEmail: string
  userPhone: string
  serviceId: string
  serviceName: string
  date: string
  time: string
  duration: number
  price: number
  status: "scheduled" | "completed" | "cancelled" | "no-show"
  coachId?: string
  coachName?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Service {
  id: string
  name: string
  description: string
  duration: number
  price: number
  category: string
  isActive: boolean
}

export interface TimeSlot {
  time: string
  available: boolean
  coachId?: string
  coachName?: string
}

export const SERVICES: Service[] = [
  {
    id: "ems-personal",
    name: "EMS Kişisel Antrenman",
    description: "Kişisel koçunuz eşliğinde 20 dakikalık yoğun EMS antrenmanı",
    duration: 20,
    price: 150,
    category: "personal",
    isActive: true,
  },
  {
    id: "ems-group",
    name: "EMS Grup Antrenmanı",
    description: "Arkadaşlarınızla birlikte motivasyonlu grup antrenmanları",
    duration: 25,
    price: 100,
    category: "group",
    isActive: true,
  },
  {
    id: "weight-loss",
    name: "Kilo Verme Programı",
    description: "EMS antrenmanı + beslenme koçluğu ile hızlı kilo verme",
    duration: 30,
    price: 200,
    category: "program",
    isActive: true,
  },
  {
    id: "muscle-building",
    name: "Kas Geliştirme",
    description: "Kas kütlesi artırımı için özel tasarlanmış EMS programları",
    duration: 25,
    price: 180,
    category: "program",
    isActive: true,
  },
  {
    id: "rehabilitation",
    name: "Rehabilitasyon",
    description: "Yaralanma sonrası kas güçlendirme ve fizik tedavi",
    duration: 30,
    price: 220,
    category: "therapy",
    isActive: true,
  },
  {
    id: "express",
    name: "Express Antrenman",
    description: "Yoğun iş temponuz için 15 dakikalık hızlı EMS antrenmanı",
    duration: 15,
    price: 120,
    category: "express",
    isActive: true,
  },
]

export const TIME_SLOTS: string[] = [
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

export function getServiceById(serviceId: string): Service | undefined {
  return SERVICES.find((service) => service.id === serviceId)
}

export function getAvailableTimeSlots(date: string): TimeSlot[] {
  // Mock implementation - in real app, this would check database
  return TIME_SLOTS.map((time) => ({
    time,
    available: Math.random() > 0.3, // 70% availability
    coachId: Math.random() > 0.5 ? "coach-1" : "coach-2",
    coachName: Math.random() > 0.5 ? "Elif Hanım" : "Can Bey",
  }))
}

export async function createAppointment(appointmentData: Partial<Appointment>): Promise<Appointment> {
  // Mock implementation - in real app, this would save to database
  const appointment: Appointment = {
    id: Math.random().toString(36).substr(2, 9),
    userId: appointmentData.userId || "",
    userName: appointmentData.userName || "",
    userEmail: appointmentData.userEmail || "",
    userPhone: appointmentData.userPhone || "",
    serviceId: appointmentData.serviceId || "",
    serviceName: appointmentData.serviceName || "",
    date: appointmentData.date || "",
    time: appointmentData.time || "",
    duration: appointmentData.duration || 20,
    price: appointmentData.price || 0,
    status: "scheduled",
    coachId: appointmentData.coachId,
    coachName: appointmentData.coachName,
    notes: appointmentData.notes,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return appointment
}

export async function updateAppointmentStatus(appointmentId: string, status: Appointment["status"]): Promise<boolean> {
  // Mock implementation - in real app, this would update database
  await new Promise((resolve) => setTimeout(resolve, 500))
  return true
}

export async function cancelAppointment(appointmentId: string): Promise<boolean> {
  return updateAppointmentStatus(appointmentId, "cancelled")
}

export function validateAppointmentData(data: Partial<Appointment>): string[] {
  const errors: string[] = []

  if (!data.userName?.trim()) {
    errors.push("Ad soyad gereklidir")
  }

  if (!data.userEmail?.trim()) {
    errors.push("E-posta adresi gereklidir")
  } else if (!/\S+@\S+\.\S+/.test(data.userEmail)) {
    errors.push("Geçerli bir e-posta adresi giriniz")
  }

  if (!data.userPhone?.trim()) {
    errors.push("Telefon numarası gereklidir")
  }

  if (!data.serviceId) {
    errors.push("Hizmet seçimi gereklidir")
  }

  if (!data.date) {
    errors.push("Tarih seçimi gereklidir")
  }

  if (!data.time) {
    errors.push("Saat seçimi gereklidir")
  }

  return errors
}
