import LoginForm from "@/components/login-form"

export default function LoginPage() {
  // For demo purposes, we'll just show the login form
  // Authentication is handled by mock system

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  )
}
