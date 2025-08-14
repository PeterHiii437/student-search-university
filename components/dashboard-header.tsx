"use client"

import { Button } from "@/components/ui/button"
import { GraduationCap, LogOut } from "lucide-react"
import { signOut } from "@/lib/mock-auth"
import { useRouter } from "next/navigation"

interface DashboardHeaderProps {
  userEmail: string
}

export default function DashboardHeader({ userEmail }: DashboardHeaderProps) {
  const router = useRouter()

  const handleSignOut = () => {
    signOut()
    router.push("/auth/login")
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Cổng Thông Tin Trường Đại Học</h1>
              <p className="text-sm text-gray-600">Hệ thống Quản lý Sinh viên</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Chào mừng trở lại</p>
              <p className="text-sm text-gray-600">{userEmail}</p>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent"
            >
              <LogOut className="h-4 w-4" />
              Đăng xuất
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
