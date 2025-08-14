import { redirect } from "next/navigation"
import SignUpForm from "@/components/sign-up-form"

export default function SignUpPage() {
  // For demo purposes, we'll just show the form
  // The form itself will show an error message about only admin being allowed

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <SignUpForm />
    </div>
  )
}
