"use client"

import { useState, useEffect, useRef } from "react"
import { redirect } from "next/navigation"
import DashboardHeader from "@/components/dashboard-header"
import StudentDetails from "@/components/student-details"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Search, CheckCircle2, Clock, XCircle, TrendingUp, BarChart3, GraduationCap, Keyboard } from "lucide-react"
import { getCurrentUser, User } from "@/lib/mock-auth"
import { searchStudentById, getSampleStudentIds, getStudentStatistics } from "@/lib/mock-student-actions"
import { MOCK_STATISTICS, FACULTIES } from "@/lib/mock-data"
import type { Student } from "@/lib/mock-data"

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [sampleIds] = useState(getSampleStudentIds())
  const [stats, setStats] = useState(getStudentStatistics())
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      redirect("/auth/login")
    }
    setUser(currentUser)
  }, [])

  useEffect(() => {
    // Update stats periodically for demo
    const interval = setInterval(() => {
      setStats(getStudentStatistics())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl + / to focus search
      if (event.ctrlKey && event.key === '/') {
        event.preventDefault()
        searchInputRef.current?.focus()
      }

      // Enter to search when focused
      if (event.key === 'Enter' && document.activeElement === searchInputRef.current) {
        handleSearch(searchQuery)
      }

      // Escape to clear search
      if (event.key === 'Escape') {
        setSearchQuery("")
        setCurrentStudent(null)
        setSearchError(null)
        setSelectedSampleId(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [searchQuery])

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setCurrentStudent(null)
      setSearchError(null)
      return
    }

    const result = searchStudentById(query.trim())

    if (result.success && result.student) {
      setCurrentStudent(result.student)
      setSearchError(null)
    } else {
      setCurrentStudent(null)
      setSearchError(result.error || "Không tìm thấy sinh viên")
    }
  }

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value)

    // Real-time search
    setTimeout(() => {
      if (value.trim()) {
        handleSearch(value)
      } else {
        setCurrentStudent(null)
        setSearchError(null)
      }
    }, 300)
  }

  const handleSampleIdClick = (id: string) => {
    setSelectedSampleId(id)
    setSearchQuery(id)
    handleSearch(id)
  }

  if (!user) {
    return <div>Đang tải...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userEmail={user?.email || ""} />

      <main className="container mx-auto px-4 py-6">
        {/* Usage Guide - Single Row */}
        <Card className="mb-4">
          <CardContent className="py-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Keyboard className="h-3 w-3" />
                  <span className="font-medium">Phím tắt:</span>
                </div>
                <Badge variant="outline">Ctrl + /</Badge>
                <span>Tìm kiếm</span>
                <Badge variant="outline">Enter</Badge>
                <span>Xác nhận</span>
                <Badge variant="outline">Esc</Badge>
                <span>Xóa</span>
              </div>
              <div className="text-muted-foreground">
                Gõ trực tiếp để tìm kiếm • {sampleIds.length} ID mẫu có sẵn
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="search" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Tìm Kiếm & Duyệt Hồ Sơ</TabsTrigger>
            <TabsTrigger value="stats">Thống Kê</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-4">
            <div className="grid lg:grid-cols-3 gap-4 h-[calc(100vh-200px)]">
              {/* Search Panel - Compact */}
              <div className="lg:col-span-1 space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      Tìm Kiếm Sinh Viên
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Input
                      ref={searchInputRef}
                      value={searchQuery}
                      onChange={(e) => handleSearchInputChange(e.target.value)}
                      placeholder="Nhập MSSV (VD: 24120001)"
                      className="mb-3"
                    />

                    {searchError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm mb-3">
                        {searchError}
                      </div>
                    )}

                    <div>
                      <div className="text-sm font-medium mb-2">ID Mẫu để thử ({sampleIds.length}):</div>
                      <div className="grid grid-cols-2 gap-1 max-h-32 overflow-y-auto">
                        {sampleIds.map((id) => (
                          <button
                            key={id}
                            onClick={() => handleSampleIdClick(id)}
                            className={`text-xs p-1.5 rounded border text-left hover:bg-blue-50 ${selectedSampleId === id ? 'bg-blue-100 border-blue-300' : 'border-gray-200'
                              }`}
                          >
                            {id}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Tổng Quan</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Hôm nay:</span>
                        <span className="font-medium">{stats.todayApplications} hồ sơ</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Chờ duyệt:</span>
                        <span className="font-medium text-yellow-600">{stats.pending}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Đã duyệt:</span>
                        <span className="font-medium text-green-600">{stats.approved}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Từ chối:</span>
                        <span className="font-medium text-red-600">{stats.rejected}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Student Details Panel */}
              <div className="lg:col-span-2">
                {currentStudent ? (
                  <StudentDetails student={currentStudent} />
                ) : (
                  <Card className="h-full">
                    <CardContent className="flex items-center justify-center h-full">
                      <div className="text-center text-muted-foreground">
                        <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-medium mb-2">Chưa chọn sinh viên</h3>
                        <p className="text-sm">Nhập MSSV hoặc chọn từ danh sách ID mẫu để xem thông tin</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            {/* Overall Statistics */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Hồ sơ hôm nay</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{MOCK_STATISTICS.dailyApplications[Object.keys(MOCK_STATISTICS.dailyApplications).pop()!]}</div>
                  <p className="text-xs text-muted-foreground">+12% so với hôm qua</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Tổng đã duyệt</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Object.values(MOCK_STATISTICS.facultyStats).reduce((acc, curr) => acc + curr.totalApproved, 0)}</div>
                  <p className="text-xs text-muted-foreground">Tất cả khoa</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Chờ duyệt</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{Object.values(MOCK_STATISTICS.facultyStats).reduce((acc, curr) => acc + curr.pending, 0)}</div>
                  <p className="text-xs text-muted-foreground">Cần xem xét</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Tỷ lệ duyệt</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">87%</div>
                  <p className="text-xs text-muted-foreground">Tháng này</p>
                </CardContent>
              </Card>
            </div>

            {/* Faculty Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Thống Kê Theo Khoa
                </CardTitle>
                <CardDescription>Dữ liệu hồ sơ nhập học theo từng khoa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {FACULTIES.map((faculty) => {
                    const stats = MOCK_STATISTICS.facultyStats[faculty.id] || {
                      dailyApplications: 0,
                      totalApproved: 0,
                      pending: 0,
                      rejected: 0
                    }

                    return (
                      <div key={faculty.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-medium">{faculty.name}</h3>
                            <p className="text-sm text-muted-foreground">{faculty.majors.length} ngành</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm">
                              <span className="text-muted-foreground">Hôm nay: </span>
                              <span className="font-medium">{stats.dailyApplications}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">{stats.totalApproved}</div>
                            <div className="text-muted-foreground">Đã duyệt</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-yellow-600">{stats.pending}</div>
                            <div className="text-muted-foreground">Chờ duyệt</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-red-600">{stats.rejected}</div>
                            <div className="text-muted-foreground">Từ chối</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
