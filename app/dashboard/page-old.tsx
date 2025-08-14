import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import DashboardHeader from "@/components/dashboard-header"
import StudentSearch from "@/components/student-search"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Users, Search, Database, Clock, AlertTriangle } from "lucide-react"
import { getAllStudents } from "@/lib/student-actions"

export default async function DashboardPage() {
	// If Supabase is not configured, show setup message directly
	if (!isSupabaseConfigured) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<h1 className="text-2xl font-bold mb-4">Kết nối Supabase để bắt đầu</h1>
			</div>
		)
	}

	// Check if user is authenticated
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	// If no user, redirect to login
	if (!user) {
		redirect("/auth/login")
	}

	// Get student statistics
	const studentsResult = await getAllStudents()
	const totalStudents = studentsResult.success ? studentsResult.students?.length || 0 : 0
	const needsSetup = studentsResult.needsSetup || false

	return (
		<div className="min-h-screen bg-gray-50">
			<DashboardHeader userEmail={user.email || "Người dùng không xác định"} />

			<main className="container mx-auto px-4 py-8">
				<div className="mb-8">
					<h2 className="text-3xl font-bold text-gray-900 mb-2">Bảng điều khiển</h2>
					<p className="text-gray-600">Chào mừng đến với Hệ thống Quản lý Sinh viên Trường Đại học</p>
				</div>

				{needsSetup && (
					<Alert className="mb-8 border-orange-200 bg-orange-50">
						<AlertTriangle className="h-4 w-4 text-orange-600" />
						<AlertTitle className="text-orange-800">Cần thiết lập cơ sở dữ liệu</AlertTitle>
						<AlertDescription className="text-orange-700">
							Bảng sinh viên chưa được tạo. Vui lòng chạy script SQL{" "}
							<code className="bg-orange-100 px-1 py-0.5 rounded text-sm">scripts/01_create_students_table.sql</code> để
							thiết lập cơ sở dữ liệu với dữ liệu sinh viên mẫu.
						</AlertDescription>
					</Alert>
				)}

				{/* Statistics Cards */}
				<div className="grid md:grid-cols-4 gap-6 mb-8">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Tổng sinh viên</CardTitle>
							<Users className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{needsSetup ? "—" : totalStudents}</div>
							<p className="text-xs text-muted-foreground">{needsSetup ? "Cần thiết lập" : "Sinh viên đã đăng ký"}</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Chức năng tìm kiếm</CardTitle>
							<Search className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{needsSetup ? "Chờ xử lý" : "Hoạt động"}</div>
							<p className="text-xs text-muted-foreground">Tra cứu mã sinh viên</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Cơ sở dữ liệu</CardTitle>
							<Database className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{needsSetup ? "Cần thiết lập" : "Trực tuyến"}</div>
							<p className="text-xs text-muted-foreground">{needsSetup ? "Cần khởi tạo" : "Trạng thái hệ thống"}</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Cập nhật lần cuối</CardTitle>
							<Clock className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">Bây giờ</div>
							<p className="text-xs text-muted-foreground">Dữ liệu thời gian thực</p>
						</CardContent>
					</Card>
				</div>

				{/* Main Content */}
				<div className="grid lg:grid-cols-3 gap-8">
					{/* Student Search - Takes up 2 columns */}
					<div className="lg:col-span-2">
						<StudentSearch />
					</div>

					{/* Quick Info Panel */}
					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Hướng dẫn nhanh</CardTitle>
								<CardDescription>Cách tìm kiếm sinh viên</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<h4 className="font-medium">Tìm kiếm bằng Student ID</h4>
									<p className="text-sm text-muted-foreground">
										Nhập mã số sinh viên đầy đủ (ví dụ: 24150125) để tìm thông tin tuyển sinh của sinh viên.
									</p>
								</div>
								<div className="space-y-2">
									<h4 className="font-medium">Xem chi tiết</h4>
									<p className="text-sm text-muted-foreground">
										Kết quả tìm kiếm hiển thị dữ liệu tuyển sinh toàn diện bao gồm thông tin cá nhân, học tập và liên lạc.
									</p>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Thông tin hệ thống</CardTitle>
								<CardDescription>Trạng thái hệ thống hiện tại</CardDescription>
							</CardHeader>
							<CardContent className="space-y-3">
								<div className="flex justify-between items-center">
									<span className="text-sm">Kết nối cơ sở dữ liệu</span>
									<span className="text-sm font-medium text-green-600">Đã kết nối</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm">Xác thực</span>
									<span className="text-sm font-medium text-green-600">Hoạt động</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm">Chức năng tìm kiếm</span>
									<span className={`text-sm font-medium ${needsSetup ? "text-orange-600" : "text-green-600"}`}>
										{needsSetup ? "Cần thiết lập" : "Hoạt động"}
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm">Tổng số bản ghi</span>
									<span className="text-sm font-medium">{needsSetup ? "—" : `${totalStudents} sinh viên`}</span>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
		</div>
	)
}
