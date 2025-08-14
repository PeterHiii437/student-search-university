"use client"

import { signIn as mockSignIn } from './mock-auth'

// Mock sign in function
export async function signIn(_prevState: unknown, formData: FormData) {
  // Check if formData is valid
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  // Validate required fields
  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    const result = mockSignIn(email.toString(), password.toString())

    if (result.success) {
      return { success: true, user: result.user }
    } else {
      return { error: result.error }
    }
  } catch (error) {
    console.error("Mock sign in error:", error)
    return { error: "Đã xảy ra lỗi khi đăng nhập" }
  }
}

// Mock sign up function (for demo - always fails since we only have admin account)
export async function signUp(_prevState: unknown, _formData: FormData) {
  return { error: "Chỉ tài khoản admin được phép sử dụng hệ thống demo này" }
}
