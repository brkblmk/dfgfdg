import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyPage() {
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
            <CardTitle className="text-3xl font-bold text-center">Gizlilik Politikası</CardTitle>
            <p className="text-center text-gray-600">Son güncelleme: 1 Ocak 2024</p>
          </CardHeader>
          <CardContent className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Giriş</h2>
              <p className="text-gray-700 leading-relaxed">
                ParsFit™ EMS Studio olarak, kişisel verilerinizin korunması konusunda hassasiyetle hareket etmekteyiz.
                Bu gizlilik politikası, kişisel verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi
                vermektedir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Toplanan Veriler</h2>
              <h3 className="text-lg font-semibold mb-2">Kişisel Bilgiler:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Ad, soyad</li>
                <li>E-posta adresi</li>
                <li>Telefon numarası</li>
                <li>Doğum tarihi</li>
                <li>Adres bilgileri</li>
              </ul>

              <h3 className="text-lg font-semibold mb-2">Sağlık Bilgileri:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Sağlık durumu beyanı</li>
                <li>Vücut ölçümleri</li>
                <li>Antrenman geçmişi</li>
                <li>Beslenme tercihleri</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Verilerin Kullanım Amaçları</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Hizmet sunumu ve randevu yönetimi</li>
                <li>Kişiselleştirilmiş antrenman programları oluşturma</li>
                <li>İletişim ve bilgilendirme</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                <li>Hizmet kalitesinin artırılması</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Veri Güvenliği</h2>
              <p className="text-gray-700 leading-relaxed">
                Kişisel verileriniz, yetkisiz erişim, kayıp, değişiklik veya ifşaya karşı teknik ve idari güvenlik
                önlemleri ile korunmaktadır. Verileriniz şifrelenmiş ortamlarda saklanır ve sadece yetkili personel
                tarafından erişilebilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Veri Paylaşımı</h2>
              <p className="text-gray-700 leading-relaxed">
                Kişisel verileriniz, açık rızanız olmaksızın üçüncü taraflarla paylaşılmaz. Sadece yasal zorunluluklar
                veya hizmet sunumu için gerekli olan durumlarda, sınırlı kapsamda paylaşım yapılabilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Çerezler (Cookies)</h2>
              <p className="text-gray-700 leading-relaxed">
                Web sitemizde kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanılmaktadır. Çerez ayarlarınızı
                tarayıcınızdan yönetebilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Haklarınız</h2>
              <p className="text-gray-700 leading-relaxed mb-4">KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>İşlenen verileriniz hakkında bilgi talep etme</li>
                <li>Verilerin düzeltilmesini isteme</li>
                <li>Verilerin silinmesini talep etme</li>
                <li>İşleme faaliyetine itiraz etme</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. İletişim</h2>
              <p className="text-gray-700 leading-relaxed">
                Gizlilik politikamız hakkında sorularınız veya haklarınızı kullanmak için:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p>
                  <strong>E-posta:</strong> kvkk@parsfit.com
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
