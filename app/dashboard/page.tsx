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
        <h1 className="text-2xl font-bold mb-4">Connect Supabase to get started</h1>
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
      <DashboardHeader userEmail={user.email || "Unknown User"} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">Welcome to the University Student Management System</p>
        </div>

        {needsSetup && (
          <Alert className="mb-8 border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertTitle className="text-orange-800">Database Setup Required</AlertTitle>
            <AlertDescription className="text-orange-700">
              The students table hasn't been created yet. Please run the SQL script{" "}
              <code className="bg-orange-100 px-1 py-0.5 rounded text-sm">scripts/01_create_students_table.sql</code> to
              set up the database with sample student data.
            </AlertDescription>
          </Alert>
        )}

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{needsSetup ? "—" : totalStudents}</div>
              <p className="text-xs text-muted-foreground">{needsSetup ? "Setup required" : "Registered students"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Search Function</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{needsSetup ? "Pending" : "Active"}</div>
              <p className="text-xs text-muted-foreground">Student ID lookup</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Database</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{needsSetup ? "Setup" : "Online"}</div>
              <p className="text-xs text-muted-foreground">{needsSetup ? "Needs initialization" : "System status"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Now</div>
              <p className="text-xs text-muted-foreground">Real-time data</p>
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
                <CardTitle>System Information</CardTitle>
                <CardDescription>Current system status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Database Connection</span>
                  <span className="text-sm font-medium text-green-600">Connected</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Authentication</span>
                  <span className="text-sm font-medium text-green-600">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Search Function</span>
                  <span className={`text-sm font-medium ${needsSetup ? "text-orange-600" : "text-green-600"}`}>
                    {needsSetup ? "Setup Required" : "Operational"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Records</span>
                  <span className="text-sm font-medium">{needsSetup ? "—" : `${totalStudents} students`}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
