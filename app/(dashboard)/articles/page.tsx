import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ArticlesPage() {
  return (
    <div className="p-8 pt-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Articles</h1>
        <p className="text-gray-500 mt-1">Read the latest articles and updates</p>
      </div>

      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Coming Soon</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">Articles section is under development</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
