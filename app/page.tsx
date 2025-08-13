import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, Search, Shield } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <GraduationCap className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cổng Thông Tin Sinh Viên Đại Học</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Hệ thống quản lý sinh viên toàn diện dành cho cán bộ quản lý đại học. Tìm kiếm và quản lý thông tin trúng
            tuyển của sinh viên một cách dễ dàng.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/auth/login">Đăng Nhập</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/auth/sign-up">Tạo Tài Khoản</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Quản Lý Sinh Viên</CardTitle>
              <CardDescription>Truy cập hồ sơ trúng tuyển và thông tin sinh viên toàn diện</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Search className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Tìm Kiếm Nhanh</CardTitle>
              <CardDescription>Tìm thông tin sinh viên ngay lập tức bằng mã số sinh viên</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Truy Cập Bảo Mật</CardTitle>
              <CardDescription>Hệ thống xác thực được bảo vệ chỉ dành cho nhân viên được ủy quyền</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}
