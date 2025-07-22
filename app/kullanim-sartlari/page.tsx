import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-8">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Ana Sayfaya Dön
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Kullanım Şartları</CardTitle>
            <p className="text-center text-gray-600">Son güncelleme: 1 Ocak 2024</p>
          </CardHeader>
          <CardContent className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Genel Hükümler</h2>
              <p className="text-gray-700 leading-relaxed">
                Bu kullanım şartları, ParsFit™ EMS Studio tarafından sunulan hizmetlerin kullanımına ilişkin koşulları
                belirler. Hizmetlerimizi kullanarak bu şartları kabul etmiş sayılırsınız.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Hizmet Tanımı</h2>
              <p className="text-gray-700 leading-relaxed">
                ParsFit™ EMS Studio, elektriksel kas stimülasyonu (EMS) teknolojisi kullanarak fitness ve sağlık
                hizmetleri sunar. Hizmetlerimiz kişisel antrenman, grup seansları ve beslenme danışmanlığını içerir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Üyelik ve Kayıt</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Üyelik için 18 yaşını doldurmuş olmak gereklidir</li>
                <li>Sağlık durumunuza uygun olduğunu doktor onayı ile belgelemelisiniz</li>
                <li>Kayıt sırasında verilen bilgilerin doğru ve güncel olması gerekmektedir</li>
                <li>Hesap güvenliğinden tamamen siz sorumlusunuz</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Ödeme ve İptal Koşulları</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Ücretler peşin olarak tahsil edilir</li>
                <li>Randevu iptalleri en az 24 saat önceden yapılmalıdır</li>
                <li>Geç iptal edilen seanslar kullanılmış sayılır</li>
                <li>Paket iadesi sadece ilk 7 gün içinde mümkündür</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Sağlık ve Güvenlik</h2>
              <p className="text-gray-700 leading-relaxed">
                EMS antrenmanı öncesi sağlık durumunuzu beyan etmek zorundasınız. Kalp rahatsızlığı, hamilelik, epilepsi
                gibi durumlar EMS için kontrendikasyon oluşturabilir. Antrenman sırasında hissettiğiniz herhangi bir
                rahatsızlığı derhal bildirmelisiniz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Sorumluluk Sınırlaması</h2>
              <p className="text-gray-700 leading-relaxed">
                ParsFit™ EMS Studio, hizmetlerin kesintisiz ve hatasız olacağını garanti etmez. Doğru kullanım
                talimatlarına uyulmaması durumunda oluşabilecek zararlardan sorumlu değildir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Kişisel Verilerin Korunması</h2>
              <p className="text-gray-700 leading-relaxed">
                Kişisel verileriniz KVKK kapsamında korunur ve sadece hizmet sunumu amacıyla kullanılır. Detaylı bilgi
                için Gizlilik Politikamızı inceleyebilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Değişiklikler</h2>
              <p className="text-gray-700 leading-relaxed">
                ParsFit™ EMS Studio bu kullanım şartlarını önceden haber vermeksizin değiştirme hakkını saklı tutar.
                Değişiklikler web sitesinde yayınlandığı tarihte yürürlüğe girer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. İletişim</h2>
              <p className="text-gray-700 leading-relaxed">
                Bu kullanım şartları hakkında sorularınız için bizimle iletişime geçebilirsiniz:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p>
                  <strong>E-posta:</strong> info@parsfit.com
                </p>
                <p>
                  <strong>Telefon:</strong> 0532 123 45 67
                </p>
                <p>
                  <strong>Adres:</strong> Mecidiyeköy Mahallesi, Büyükdere Caddesi No:123, Şişli/İstanbul
                </p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
