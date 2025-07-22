import { generateId, slugify } from "./utils"

// Branch Management Types
export interface Branch {
  id: string
  name: string
  address: string
  phone: string
  email: string
  manager: string
  capacity: number
  workingHours: {
    weekdays: string
    saturday: string
    sunday: string
  }
  services: string[]
  isActive: boolean
  openingDate: string
  image: string
}

// Homepage Content Types
export interface HeroContent {
  id: string
  title: string
  subtitle: string
  description: string
  buttonText: string
  buttonLink: string
  backgroundImage: string
  isActive: boolean
}

export interface AboutContent {
  id: string
  title: string
  subtitle: string
  description: string
  features: string[]
  image: string
  stats: {
    experience: string
    clients: string
    success: string
    branches: string
  }
  isActive: boolean
}

export interface ServiceContent {
  id: string
  name: string
  description: string
  shortDescription: string
  price: number
  duration: number
  features: string[]
  image: string
  category: string
  isActive: boolean
  order: number
  availableBranches: string[]
}

export interface PricingPlan {
  id: string
  name: string
  price: number
  period: string
  description: string
  features: string[]
  isPopular: boolean
  isActive: boolean
  order: number
  availableBranches: string[]
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  image: string
  branchId: string
  isActive: boolean
  order: number
  date: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  authorImage: string
  image: string
  category: string
  tags: string[]
  publishedAt: string
  status: "draft" | "published" | "archived"
  views: number
  likes: number
  comments: number
  isActive: boolean
  isFeatured: boolean
}

export interface ContactInfo {
  id: string
  address: string
  phone: string
  email: string
  workingHours: {
    weekdays: string
    saturday: string
    sunday: string
  }
  socialMedia: {
    facebook: string
    instagram: string
    twitter: string
    youtube: string
    whatsapp: string
  }
}

// User Management Types
export interface UserMembership {
  id: string
  userId: string
  planId: string
  planName: string
  branchId: string
  branchName: string
  startDate: string
  endDate: string
  status: "active" | "expired" | "cancelled" | "suspended"
  remainingSessions: number
  totalSessions: number
  price: number
  paymentStatus: "paid" | "pending" | "failed"
  autoRenew: boolean
}

export interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth?: string
  gender?: "male" | "female" | "other"
  address?: string
  preferredBranch?: string
  emergencyContact?: {
    name: string
    phone: string
    relation: string
  }
  medicalInfo?: {
    conditions: string[]
    medications: string[]
    allergies: string[]
    notes: string
  }
  preferences?: {
    preferredCoach: string
    preferredTime: string
    goals: string[]
    notifications: {
      email: boolean
      sms: boolean
      whatsapp: boolean
    }
  }
  membership?: UserMembership
  joinDate: string
  lastLogin?: string
  status: "active" | "inactive" | "suspended"
  role: "user" | "coach" | "admin" | "branch_manager"
}

export interface Appointment {
  id: string
  userId: string
  userName: string
  userPhone: string
  branchId: string
  branchName: string
  serviceId: string
  serviceName: string
  coachId: string
  coachName: string
  date: string
  time: string
  duration: number
  price: number
  status: "scheduled" | "completed" | "cancelled" | "no-show"
  notes?: string
  createdAt: string
}

// Global State Management
class DataStore {
  private static instance: DataStore
  private data: {
    branches: Branch[]
    heroContent: HeroContent
    aboutContent: AboutContent
    services: ServiceContent[]
    pricingPlans: PricingPlan[]
    testimonials: Testimonial[]
    blogPosts: BlogPost[]
    contactInfo: ContactInfo
    users: UserProfile[]
    appointments: Appointment[]
  }

  private constructor() {
    this.data = {
      branches: mockBranches,
      heroContent: mockHeroContent,
      aboutContent: mockAboutContent,
      services: mockServices,
      pricingPlans: mockPricingPlans,
      testimonials: mockTestimonials,
      blogPosts: mockBlogPosts,
      contactInfo: mockContactInfo,
      users: mockUsers,
      appointments: mockAppointments,
    }
  }

  static getInstance(): DataStore {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore()
    }
    return DataStore.instance
  }

  // Getters
  getBranches(): Branch[] {
    return this.data.branches.filter((b) => b.isActive)
  }

  getHeroContent(): HeroContent {
    return this.data.heroContent
  }

  getAboutContent(): AboutContent {
    return this.data.aboutContent
  }

  getServices(): ServiceContent[] {
    return this.data.services.filter((s) => s.isActive).sort((a, b) => a.order - b.order)
  }

  getPricingPlans(): PricingPlan[] {
    return this.data.pricingPlans.filter((p) => p.isActive).sort((a, b) => a.order - b.order)
  }

  getTestimonials(): Testimonial[] {
    return this.data.testimonials.filter((t) => t.isActive).sort((a, b) => a.order - b.order)
  }

  getBlogPosts(): BlogPost[] {
    return this.data.blogPosts
      .filter((p) => p.status === "published" && p.isActive)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  }

  getAllBlogPosts(): BlogPost[] {
    return this.data.blogPosts
  }

  getContactInfo(): ContactInfo {
    return this.data.contactInfo
  }

  getUsers(): UserProfile[] {
    return this.data.users
  }

  getAppointments(): Appointment[] {
    return this.data.appointments
  }

  // Setters
  updateBranches(branches: Branch[]): void {
    this.data.branches = branches
  }

  updateHeroContent(content: HeroContent): void {
    this.data.heroContent = content
  }

  updateAboutContent(content: AboutContent): void {
    this.data.aboutContent = content
  }

  updateServices(services: ServiceContent[]): void {
    this.data.services = services
  }

  updatePricingPlans(plans: PricingPlan[]): void {
    this.data.pricingPlans = plans
  }

  updateTestimonials(testimonials: Testimonial[]): void {
    this.data.testimonials = testimonials
  }

  updateBlogPosts(posts: BlogPost[]): void {
    this.data.blogPosts = posts
  }

  updateContactInfo(info: ContactInfo): void {
    this.data.contactInfo = info
  }

  updateUsers(users: UserProfile[]): void {
    this.data.users = users
  }

  updateAppointments(appointments: Appointment[]): void {
    this.data.appointments = appointments
  }
}

// Mock Data
export const mockBranches: Branch[] = [
  {
    id: "branch-1",
    name: "ParsFit™ Çankaya",
    address: "Atatürk Cad. No:123, Çankaya/Ankara",
    phone: "0312 123 45 67",
    email: "cankaya@parsfit.com",
    manager: "Elif Demir",
    capacity: 20,
    workingHours: {
      weekdays: "09:00 - 21:00",
      saturday: "09:00 - 18:00",
      sunday: "10:00 - 17:00",
    },
    services: ["service-1", "service-2", "service-3"],
    isActive: true,
    openingDate: "2020-01-15",
    image: "/images/branch-cankaya.jpg",
  },
  {
    id: "branch-2",
    name: "ParsFit™ Keçiören",
    address: "Cumhuriyet Cad. No:456, Keçiören/Ankara",
    phone: "0312 234 56 78",
    email: "kecioren@parsfit.com",
    manager: "Can Yılmaz",
    capacity: 15,
    workingHours: {
      weekdays: "09:00 - 21:00",
      saturday: "09:00 - 18:00",
      sunday: "Kapalı",
    },
    services: ["service-1", "service-2"],
    isActive: true,
    openingDate: "2021-06-01",
    image: "/images/branch-kecioren.jpg",
  },
  {
    id: "branch-3",
    name: "ParsFit™ Mamak",
    address: "İstiklal Cad. No:789, Mamak/Ankara",
    phone: "0312 345 67 89",
    email: "mamak@parsfit.com",
    manager: "Zeynep Kaya",
    capacity: 25,
    workingHours: {
      weekdays: "08:00 - 22:00",
      saturday: "09:00 - 19:00",
      sunday: "10:00 - 18:00",
    },
    services: ["service-1", "service-2", "service-3", "service-4"],
    isActive: true,
    openingDate: "2022-03-15",
    image: "/images/branch-mamak.jpg",
  },
]

export const mockHeroContent: HeroContent = {
  id: "hero-1",
  title: "Türkiye'nin En Modern EMS Studio'su",
  subtitle: "ParsFit™ EMS Studio",
  description:
    "20 dakikada 3 saatlik antrenman etkisi. Elektriksel kas stimülasyonu ile maksimum verim. 3 şubemizle hizmetinizdeyiz.",
  buttonText: "Ücretsiz Deneme",
  buttonLink: "/randevu",
  backgroundImage: "/images/hero-bg.jpg",
  isActive: true,
}

export const mockAboutContent: AboutContent = {
  id: "about-1",
  title: "ParsFit™ Hakkında",
  subtitle: "EMS Teknolojisinde Öncü",
  description:
    "2020'den beri EMS teknolojisi ile fitness dünyasında devrim yaratıyoruz. Profesyonel koçlarımız ve son teknoloji ekipmanlarımızla hedeflerinize ulaşmanızı sağlıyoruz. Ankara'da 3 şubemizle hizmet veriyoruz.",
  features: [
    "Profesyonel EMS Ekipmanları",
    "Sertifikalı Antrenörler",
    "Kişiselleştirilmiş Programlar",
    "Hijyenik Ortam",
    "Esnek Randevu Sistemi",
    "3 Şube ile Geniş Hizmet Ağı",
  ],
  image: "/images/about-studio.jpg",
  stats: {
    experience: "4+ Yıl",
    clients: "500+",
    success: "%95",
    branches: "3",
  },
  isActive: true,
}

export const mockServices: ServiceContent[] = [
  {
    id: "service-1",
    name: "EMS Kişisel Antrenman",
    description: "Kişisel koçunuz eşliğinde özel tasarlanmış EMS antrenman programı. Birebir ilgi ve maksimum verim.",
    shortDescription: "Birebir koçluk hizmeti",
    price: 150,
    duration: 20,
    features: ["Kişisel koç", "Özel program", "Beslenme danışmanlığı", "İlerleme takibi"],
    image: "/images/personal-training.jpg",
    category: "personal",
    isActive: true,
    order: 1,
    availableBranches: ["branch-1", "branch-2", "branch-3"],
  },
  {
    id: "service-2",
    name: "EMS Grup Antrenmanı",
    description: "Arkadaşlarınızla birlikte motivasyonlu grup antrenmanları. Sosyal ortamda eğlenceli fitness.",
    shortDescription: "Grup halinde antrenman",
    price: 100,
    duration: 25,
    features: ["Grup motivasyonu", "Sosyal ortam", "Uygun fiyat", "Eğlenceli"],
    image: "/images/group-training.jpg",
    category: "group",
    isActive: true,
    order: 2,
    availableBranches: ["branch-1", "branch-2", "branch-3"],
  },
  {
    id: "service-3",
    name: "Kilo Verme Programı",
    description: "EMS teknolojisi ile hızlı ve etkili kilo verme. Beslenme danışmanlığı dahil.",
    shortDescription: "Hızlı kilo verme",
    price: 200,
    duration: 30,
    features: ["Hızlı sonuç", "Beslenme planı", "Düzenli takip", "Motivasyon desteği"],
    image: "/images/weight-loss.jpg",
    category: "program",
    isActive: true,
    order: 3,
    availableBranches: ["branch-1", "branch-3"],
  },
  {
    id: "service-4",
    name: "Kas Geliştirme",
    description: "EMS ile kas kütlesi artırma ve vücut şekillendirme programı.",
    shortDescription: "Kas kütlesi artırma",
    price: 180,
    duration: 25,
    features: ["Kas gelişimi", "Vücut şekillendirme", "Protein desteği", "Uzman takibi"],
    image: "/images/muscle-building.jpg",
    category: "program",
    isActive: true,
    order: 4,
    availableBranches: ["branch-3"],
  },
]

export const mockPricingPlans: PricingPlan[] = [
  {
    id: "plan-1",
    name: "Başlangıç",
    price: 299,
    period: "ay",
    description: "EMS'e yeni başlayanlar için ideal paket",
    features: ["4 Seans/Ay", "Temel Program", "WhatsApp Desteği", "Tüm Şubelerde Geçerli"],
    isPopular: false,
    isActive: true,
    order: 1,
    availableBranches: ["branch-1", "branch-2", "branch-3"],
  },
  {
    id: "plan-2",
    name: "Profesyonel",
    price: 499,
    period: "ay",
    description: "Düzenli antrenman yapanlar için",
    features: ["8 Seans/Ay", "Kişisel Program", "Beslenme Danışmanlığı", "Öncelikli Randevu", "Şube Değişim Hakkı"],
    isPopular: true,
    isActive: true,
    order: 2,
    availableBranches: ["branch-1", "branch-2", "branch-3"],
  },
  {
    id: "plan-3",
    name: "Elite",
    price: 799,
    period: "ay",
    description: "Maksimum sonuç isteyenler için",
    features: ["12 Seans/Ay", "VIP Program", "Kişisel Beslenme Koçu", "Sınırsız Danışmanlık", "Tüm Şubelerde VIP"],
    isPopular: false,
    isActive: true,
    order: 3,
    availableBranches: ["branch-1", "branch-2", "branch-3"],
  },
]

export const mockTestimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Ayşe Demir",
    role: "Pazarlama Müdürü",
    content: "ParsFit Çankaya şubesinde 3 ayda 8 kilo verdim. 20 dakikalık seanslar çok etkili! Koçlarım çok ilgili.",
    rating: 5,
    image: "/images/testimonial-1.jpg",
    branchId: "branch-1",
    isActive: true,
    order: 1,
    date: "2024-01-10",
  },
  {
    id: "testimonial-2",
    name: "Mehmet Kaya",
    role: "Mühendis",
    content: "Keçiören şubesinde antrenman yapıyorum. Yoğun iş tempomu düşününce EMS antrenmanı mükemmel bir çözüm.",
    rating: 5,
    image: "/images/testimonial-2.jpg",
    branchId: "branch-2",
    isActive: true,
    order: 2,
    date: "2024-01-08",
  },
  {
    id: "testimonial-3",
    name: "Zeynep Özkan",
    role: "Öğretmen",
    content: "Mamak şubesinin atmosferi harika. Grup antrenmanları çok eğlenceli ve motivasyonum her zaman yüksek.",
    rating: 5,
    image: "/images/testimonial-3.jpg",
    branchId: "branch-3",
    isActive: true,
    order: 3,
    date: "2024-01-05",
  },
]

export const mockBlogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "EMS Antrenmanının Bilimsel Temelleri",
    slug: "ems-antrenmaninin-bilimsel-temelleri",
    excerpt: "EMS teknolojisinin nasıl çalıştığını ve neden bu kadar etkili olduğunu bilimsel açıdan inceleyelim.",
    content: `EMS (Elektriksel Kas Stimülasyonu) teknolojisi, kaslarınızı doğal sinir sinyallerini taklit eden elektriksel impulslarla çalıştırır. Bu teknoloji, geleneksel antrenmanların sağladığı faydaları çok daha kısa sürede elde etmenizi sağlar.

## EMS Nasıl Çalışır?

EMS cihazları, kaslarınıza düşük frekanslı elektriksel sinyaller gönderir. Bu sinyaller:
- Kas liflerini doğrudan uyarır
- Daha fazla kas lifinin aynı anda çalışmasını sağlar
- Metabolizmayı hızlandırır
- Kan dolaşımını artırır

## Bilimsel Kanıtlar

Yapılan araştırmalar gösteriyor ki:
- 20 dakikalık EMS seansı, 3 saatlik geleneksel antrenmana eşdeğer
- Kas kütlesi artışı %30 daha hızlı
- Yağ yakımı %25 daha etkili

ParsFit™ olarak, bu teknolojinin gücünü 3 şubemizde deneyimleyebilirsiniz.`,
    author: "Dr. Mehmet Özkan",
    authorImage: "/images/author-1.jpg",
    image: "/images/blog-1.jpg",
    category: "Bilim",
    tags: ["EMS", "Bilim", "Teknoloji", "Araştırma"],
    publishedAt: "2024-01-10",
    status: "published",
    views: 1250,
    likes: 45,
    comments: 12,
    isActive: true,
    isFeatured: true,
  },
  {
    id: "blog-2",
    title: "20 Dakikada Maksimum Verim: EMS'in Sırrı",
    slug: "20-dakikada-maksimum-verim-emsin-sirri",
    excerpt: "Geleneksel antrenmanların saatlerini 20 dakikaya nasıl sığdırdığımızı öğrenin.",
    content: `Modern yaşamın hızlı temposu içinde spor yapmak için zaman bulmak giderek zorlaşıyor. İşte tam bu noktada EMS teknolojisi devreye giriyor ve size zamandan tasarruf ettirirken maksimum sonuç veriyor.

## Zaman Verimliliği

Geleneksel spor salonlarında:
- Isınma: 15 dakika
- Ana antrenman: 60-90 dakika  
- Soğuma: 15 dakika
- Toplam: 90-120 dakika

EMS ile:
- Hazırlık: 5 dakika
- Ana antrenman: 20 dakika
- Toplam: 25 dakika

## Neden Bu Kadar Etkili?

EMS teknolojisi sayesinde:
- Tüm kas grupları aynı anda çalışır
- %90'a varan kas lifi aktivasyonu
- Yüksek kalori yakımı
- Hızlı toparlanma

ParsFit™'in 3 şubesinde bu teknolojinin gücünü deneyimleyin!`,
    author: "Antrenör Ayşe Demir",
    authorImage: "/images/author-2.jpg",
    image: "/images/blog-2.jpg",
    category: "Antrenman",
    tags: ["Verimlilik", "Zaman", "EMS", "Antrenman"],
    publishedAt: "2024-01-08",
    status: "published",
    views: 890,
    likes: 67,
    comments: 18,
    isActive: true,
    isFeatured: false,
  },
  {
    id: "blog-3",
    title: "Beslenme ve EMS: Mükemmel İkili",
    slug: "beslenme-ve-ems-mukemmel-ikili",
    excerpt: "EMS antrenmanlarınızın etkisini artırmak için doğru beslenme stratejileri.",
    content: `EMS antrenmanlarından maksimum fayda sağlamak için beslenmenizin de optimize edilmesi gerekir. Doğru beslenme stratejileri ile EMS'in etkisini katlamak mümkün.

## Antrenman Öncesi Beslenme

EMS seansından 2 saat önce:
- Hafif karbonhidrat alımı
- Bol su tüketimi
- Kafein (isteğe bağlı)

## Antrenman Sonrası Beslenme

Seans sonrası 30 dakika içinde:
- Protein ağırlıklı öğün
- Karmaşık karbonhidratlar
- Antioksidan açısından zengin besinler

## Önerilen Besinler

- Tavuk göğsü
- Quinoa
- Yeşil yapraklı sebzeler
- Yaban mersini
- Badem

ParsFit™ uzmanlarımız size kişiselleştirilmiş beslenme planı hazırlayabilir.`,
    author: "Dyt. Zeynep Kaya",
    authorImage: "/images/author-3.jpg",
    image: "/images/blog-3.jpg",
    category: "Beslenme",
    tags: ["Beslenme", "Diyet", "Sağlık", "EMS"],
    publishedAt: "2024-01-05",
    status: "published",
    views: 1100,
    likes: 89,
    comments: 24,
    isActive: true,
    isFeatured: false,
  },
]

export const mockContactInfo: ContactInfo = {
  id: "contact-1",
  address: "Merkez: Atatürk Cad. No:123, Çankaya/Ankara",
  phone: "0312 123 45 67",
  email: "info@parsfit.com",
  workingHours: {
    weekdays: "09:00 - 21:00",
    saturday: "09:00 - 18:00",
    sunday: "10:00 - 17:00",
  },
  socialMedia: {
    facebook: "https://facebook.com/parsfit",
    instagram: "https://instagram.com/parsfit",
    twitter: "https://twitter.com/parsfit",
    youtube: "https://youtube.com/parsfit",
    whatsapp: "https://wa.me/905321234567",
  },
}

export const mockUsers: UserProfile[] = [
  {
    id: "1",
    name: "Ayşe Demir",
    email: "ayse@email.com",
    phone: "0532 123 45 67",
    dateOfBirth: "1990-05-15",
    gender: "female",
    address: "Çankaya, Ankara",
    preferredBranch: "branch-1",
    joinDate: "2024-01-10",
    lastLogin: "2024-01-15",
    status: "active",
    role: "user",
    membership: {
      id: "mem-1",
      userId: "1",
      planId: "plan-2",
      planName: "Profesyonel",
      branchId: "branch-1",
      branchName: "ParsFit™ Çankaya",
      startDate: "2024-01-10",
      endDate: "2024-02-10",
      status: "active",
      remainingSessions: 6,
      totalSessions: 8,
      price: 499,
      paymentStatus: "paid",
      autoRenew: true,
    },
  },
  {
    id: "2",
    name: "Mehmet Kaya",
    email: "mehmet@email.com",
    phone: "0532 234 56 78",
    dateOfBirth: "1985-08-22",
    gender: "male",
    address: "Keçiören, Ankara",
    preferredBranch: "branch-2",
    joinDate: "2024-01-09",
    lastLogin: "2024-01-14",
    status: "active",
    role: "user",
    membership: {
      id: "mem-2",
      userId: "2",
      planId: "plan-1",
      planName: "Başlangıç",
      branchId: "branch-2",
      branchName: "ParsFit™ Keçiören",
      startDate: "2024-01-09",
      endDate: "2024-02-09",
      status: "active",
      remainingSessions: 2,
      totalSessions: 4,
      price: 299,
      paymentStatus: "paid",
      autoRenew: false,
    },
  },
]

export const mockAppointments: Appointment[] = [
  {
    id: "apt-1",
    userId: "1",
    userName: "Ayşe Demir",
    userPhone: "0532 123 45 67",
    branchId: "branch-1",
    branchName: "ParsFit™ Çankaya",
    serviceId: "service-1",
    serviceName: "EMS Kişisel Antrenman",
    coachId: "coach-1",
    coachName: "Elif Hanım",
    date: "2024-01-15",
    time: "14:00",
    duration: 20,
    price: 150,
    status: "scheduled",
    createdAt: "2024-01-10",
  },
  {
    id: "apt-2",
    userId: "2",
    userName: "Mehmet Kaya",
    userPhone: "0532 234 56 78",
    branchId: "branch-2",
    branchName: "ParsFit™ Keçiören",
    serviceId: "service-2",
    serviceName: "EMS Grup Antrenmanı",
    coachId: "coach-2",
    coachName: "Can Bey",
    date: "2024-01-15",
    time: "15:00",
    duration: 25,
    price: 100,
    status: "completed",
    createdAt: "2024-01-08",
  },
]

// Data Management Functions
export class DataManager {
  private static store = DataStore.getInstance()

  // Branch Management
  static async getBranches(): Promise<Branch[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return DataManager.store.getBranches()
  }

  static async createBranch(branch: Omit<Branch, "id">): Promise<Branch> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newBranch = { ...branch, id: generateId() }
    const branches = DataManager.store.getBranches()
    branches.push(newBranch)
    DataManager.store.updateBranches(branches)
    return newBranch
  }

  static async updateBranch(branchId: string, updates: Partial<Branch>): Promise<Branch> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const branches = DataManager.store.getBranches()
    const index = branches.findIndex((b) => b.id === branchId)
    if (index === -1) throw new Error("Branch not found")
    branches[index] = { ...branches[index], ...updates }
    DataManager.store.updateBranches(branches)
    return branches[index]
  }

  static async deleteBranch(branchId: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const branches = DataManager.store.getBranches()
    const filtered = branches.filter((b) => b.id !== branchId)
    DataManager.store.updateBranches(filtered)
    return true
  }

  // Homepage Content Management
  static async getHeroContent(): Promise<HeroContent> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return DataManager.store.getHeroContent()
  }

  static async updateHeroContent(content: Partial<HeroContent>): Promise<HeroContent> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const updated = { ...DataManager.store.getHeroContent(), ...content }
    DataManager.store.updateHeroContent(updated)
    return updated
  }

  static async getAboutContent(): Promise<AboutContent> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return DataManager.store.getAboutContent()
  }

  static async updateAboutContent(content: Partial<AboutContent>): Promise<AboutContent> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const updated = { ...DataManager.store.getAboutContent(), ...content }
    DataManager.store.updateAboutContent(updated)
    return updated
  }

  // Services Management
  static async getServices(): Promise<ServiceContent[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return DataManager.store.getServices()
  }

  static async updateService(serviceId: string, updates: Partial<ServiceContent>): Promise<ServiceContent> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const services = DataManager.store.getServices()
    const index = services.findIndex((s) => s.id === serviceId)
    if (index === -1) throw new Error("Service not found")
    services[index] = { ...services[index], ...updates }
    DataManager.store.updateServices(services)
    return services[index]
  }

  static async createService(service: Omit<ServiceContent, "id">): Promise<ServiceContent> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newService = { ...service, id: generateId() }
    const services = DataManager.store.getServices()
    services.push(newService)
    DataManager.store.updateServices(services)
    return newService
  }

  static async deleteService(serviceId: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const services = DataManager.store.getServices()
    const filtered = services.filter((s) => s.id !== serviceId)
    DataManager.store.updateServices(filtered)
    return true
  }

  // Pricing Management
  static async getPricingPlans(): Promise<PricingPlan[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return DataManager.store.getPricingPlans()
  }

  static async updatePricingPlan(planId: string, updates: Partial<PricingPlan>): Promise<PricingPlan> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const plans = DataManager.store.getPricingPlans()
    const index = plans.findIndex((p) => p.id === planId)
    if (index === -1) throw new Error("Plan not found")
    plans[index] = { ...plans[index], ...updates }
    DataManager.store.updatePricingPlans(plans)
    return plans[index]
  }

  static async createPricingPlan(plan: Omit<PricingPlan, "id">): Promise<PricingPlan> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newPlan = { ...plan, id: generateId() }
    const plans = DataManager.store.getPricingPlans()
    plans.push(newPlan)
    DataManager.store.updatePricingPlans(plans)
    return newPlan
  }

  // Testimonials Management
  static async getTestimonials(): Promise<Testimonial[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return DataManager.store.getTestimonials()
  }

  static async updateTestimonial(testimonialId: string, updates: Partial<Testimonial>): Promise<Testimonial> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const testimonials = DataManager.store.getTestimonials()
    const index = testimonials.findIndex((t) => t.id === testimonialId)
    if (index === -1) throw new Error("Testimonial not found")
    testimonials[index] = { ...testimonials[index], ...updates }
    DataManager.store.updateTestimonials(testimonials)
    return testimonials[index]
  }

  static async createTestimonial(testimonial: Omit<Testimonial, "id">): Promise<Testimonial> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newTestimonial = { ...testimonial, id: generateId() }
    const testimonials = DataManager.store.getTestimonials()
    testimonials.push(newTestimonial)
    DataManager.store.updateTestimonials(testimonials)
    return newTestimonial
  }

  // Blog Management
  static async getBlogPosts(): Promise<BlogPost[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return DataManager.store.getBlogPosts()
  }

  static async getAllBlogPosts(): Promise<BlogPost[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return DataManager.store.getAllBlogPosts()
  }

  static async updateBlogPost(postId: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const posts = DataManager.store.getAllBlogPosts()
    const index = posts.findIndex((p) => p.id === postId)
    if (index === -1) throw new Error("Blog post not found")

    // Auto-generate slug if title changed
    if (updates.title && !updates.slug) {
      updates.slug = slugify(updates.title)
    }

    posts[index] = { ...posts[index], ...updates }
    DataManager.store.updateBlogPosts(posts)
    return posts[index]
  }

  static async createBlogPost(post: Omit<BlogPost, "id" | "slug">): Promise<BlogPost> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newPost = {
      ...post,
      id: generateId(),
      slug: slugify(post.title),
      views: 0,
      likes: 0,
      comments: 0,
    }
    const posts = DataManager.store.getAllBlogPosts()
    posts.push(newPost)
    DataManager.store.updateBlogPosts(posts)
    return newPost
  }

  static async deleteBlogPost(postId: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const posts = DataManager.store.getAllBlogPosts()
    const filtered = posts.filter((p) => p.id !== postId)
    DataManager.store.updateBlogPosts(filtered)
    return true
  }

  // Contact Info Management
  static async getContactInfo(): Promise<ContactInfo> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return DataManager.store.getContactInfo()
  }

  static async updateContactInfo(updates: Partial<ContactInfo>): Promise<ContactInfo> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const updated = { ...DataManager.store.getContactInfo(), ...updates }
    DataManager.store.updateContactInfo(updated)
    return updated
  }

  // User Management
  static async getUsers(): Promise<UserProfile[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return DataManager.store.getUsers()
  }

  static async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const users = DataManager.store.getUsers()
    const index = users.findIndex((u) => u.id === userId)
    if (index === -1) throw new Error("User not found")
    users[index] = { ...users[index], ...updates }
    DataManager.store.updateUsers(users)
    return users[index]
  }

  static async createUser(user: Omit<UserProfile, "id">): Promise<UserProfile> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newUser = { ...user, id: generateId() }
    const users = DataManager.store.getUsers()
    users.push(newUser)
    DataManager.store.updateUsers(users)
    return newUser
  }

  static async deleteUser(userId: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const users = DataManager.store.getUsers()
    const filtered = users.filter((u) => u.id !== userId)
    DataManager.store.updateUsers(filtered)
    return true
  }

  // Appointment Management
  static async getAppointments(): Promise<Appointment[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return DataManager.store.getAppointments()
  }

  static async createAppointment(appointment: Omit<Appointment, "id">): Promise<Appointment> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newAppointment = { ...appointment, id: generateId() }
    const appointments = DataManager.store.getAppointments()
    appointments.push(newAppointment)
    DataManager.store.updateAppointments(appointments)
    return newAppointment
  }

  static async updateAppointment(appointmentId: string, updates: Partial<Appointment>): Promise<Appointment> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const appointments = DataManager.store.getAppointments()
    const index = appointments.findIndex((a) => a.id === appointmentId)
    if (index === -1) throw new Error("Appointment not found")
    appointments[index] = { ...appointments[index], ...updates }
    DataManager.store.updateAppointments(appointments)
    return appointments[index]
  }
}
