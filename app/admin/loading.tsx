import { LoadingSpinner } from "@/components/loading-spinner"

export default function AdminLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-gray-600">Admin paneli yükleniyor...</p>
      </div>
    </div>
  )
}
