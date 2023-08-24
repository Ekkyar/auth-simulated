import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg border">
        <h1 className="text-3xl font-semibold mb-4">Welcome</h1>
        <p className="mb-4">Please choose an option:</p>
        <div className="flex space-x-4">
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
          <Link href="/register" className="text-blue-500">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}
