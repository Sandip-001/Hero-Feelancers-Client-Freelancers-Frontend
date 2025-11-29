import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FavouritesPage() {
  return (
    <div className="p-8 pt-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Favourites</h1>
        <p className="text-gray-500 mt-1">Your bookmarked projects and freelancers</p>
      </div>

      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-6xl mb-4">⭐</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Favourites Yet</h3>
          <p className="text-gray-500">Start adding projects and freelancers to your favourites</p>
        </div>
      </div>
    </div>
  )
}
