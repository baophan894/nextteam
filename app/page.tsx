import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          NEXT TEAM
        </h1>
        <div className="space-y-4">
          <Link
            href="/privacy"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/term"
            className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
          >
            Terms and Conditions
          </Link>
        </div>
      </div>
    </div>
  )
}
