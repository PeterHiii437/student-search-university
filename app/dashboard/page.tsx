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
import { FACULTIES } from "@/lib/mock-data"
import type { Student } from "@/lib/mock-data"

// Mock statistics data for dashboard
const MOCK_STATISTICS = {
  dailyApplications: {
    "2024-08-20": 15,
    "2024-08-21": 23,
    "2024-08-22": 18,
    "2024-08-23": 31,
    "2024-08-24": 27
  } as Record<string, number>,
  approvedApplications: {
    "2024-08-20": 8,
    "2024-08-21": 12,
    "2024-08-22": 15,
    "2024-08-23": 19,
    "2024-08-24": 22
  } as Record<string, number>,
  facultyStats: {
    "fit": { dailyApplications: 8, totalApproved: 45, pending: 12, rejected: 3 },
    "math": { dailyApplications: 5, totalApproved: 32, pending: 8, rejected: 2 },
    "physics": { dailyApplications: 6, totalApproved: 28, pending: 10, rejected: 1 },
    "chemistry": { dailyApplications: 4, totalApproved: 24, pending: 6, rejected: 2 },
    "fbb": { dailyApplications: 3, totalApproved: 18, pending: 4, rejected: 1 },
    "environment": { dailyApplications: 2, totalApproved: 15, pending: 3, rejected: 0 },
    "geology": { dailyApplications: 1, totalApproved: 12, pending: 2, rejected: 1 },
    "fetel": { dailyApplications: 2, totalApproved: 16, pending: 5, rejected: 1 },
    "mst": { dailyApplications: 1, totalApproved: 10, pending: 2, rejected: 0 },
    "fis": { dailyApplications: 1, totalApproved: 8, pending: 1, rejected: 0 }
  } as Record<string, { dailyApplications: number; totalApproved: number; pending: number; rejected: number }>
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [sampleIds, setSampleIds] = useState<string[]>([])
  const [stats, setStats] = useState<{ total: number; approved: number; pending: number; rejected: number; todayApplications: number }>({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
    todayApplications: 0,
  })
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
    // Load initial data
    getSampleStudentIds().then(setSampleIds)
    getStudentStatistics().then(setStats)

    // Update stats periodically for demo
    const interval = setInterval(() => {
      getStudentStatistics().then(setStats)
    }, 30000)

    // Listen for approval status changes to refresh current student
    const handleApprovalChange = (e: CustomEvent) => {
      const { mssv } = e.detail
      if (currentStudent && currentStudent.mssv === mssv) {
        // Refresh the current student data
        searchStudentById(currentStudent.mssv).then((result) => {
          if (result.success && result.student) {
            setCurrentStudent(result.student)
          }
        })
      }
    }

    window.addEventListener('approvalStatusChanged', handleApprovalChange as EventListener)

    return () => {
      clearInterval(interval)
      window.removeEventListener('approvalStatusChanged', handleApprovalChange as EventListener)
    }
  }, [currentStudent])

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
        void handleSearch(searchQuery)
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

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setCurrentStudent(null)
      setSearchError(null)
      return
    }

    const result = await searchStudentById(query.trim())

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
        void handleSearch(value)
      } else {
        setCurrentStudent(null)
        setSearchError(null)
      }
    }, 300)
  }

  const handleSampleIdClick = (id: string) => {
    setSelectedSampleId(id)
    setSearchQuery(id)
    void handleSearch(id)
  }

  if (!user) {
    return <div>Đang tải...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userEmail={user?.email || ""} />

      <main className="container mx-auto px-4 py-2">
        <Tabs defaultValue="search" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Tìm Kiếm & Duyệt Hồ Sơ</TabsTrigger>
            <TabsTrigger value="stats">Thống Kê</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-4">
            {/* Search Panel - Moved to Top */}
            <Card>
              <CardContent className="py-2">
                <div className="grid grid-cols-12 gap-4 items-start">
                  {/* Search Input */}
                  <div className="col-span-3">
                    <Input
                      ref={searchInputRef}
                      value={searchQuery}
                      onChange={(e) => handleSearchInputChange(e.target.value)}
                      placeholder="MSSV/Số báo danh/CCCD"
                      className="text-sm h-8"
                      maxLength={12}
                    />
                  </div>

                  {/* Sample IDs */}
                  <div className="col-span-9">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium whitespace-nowrap">ID Mẫu:</span>
                      <div className="flex flex-wrap gap-1">
                        {sampleIds.map((id) => (
                          <button
                            key={id}
                            onClick={() => handleSampleIdClick(id)}
                            className={`text-xs px-2.5 py-1 rounded border hover:bg-blue-50 transition-colors ${selectedSampleId === id ? 'bg-blue-100 border-blue-300 text-blue-700' : 'border-gray-200 text-gray-600'
                              }`}
                          >
                            {id}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {searchError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-1.5 rounded text-sm mt-2">
                    {searchError}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Student Details Panel - Full Width */}
            <div className="h-[calc(100vh-200px)]">
              {currentStudent ? (
                <StudentDetails student={currentStudent} />
              ) : (
                <Card className="h-full">
                  <CardContent className="flex items-center justify-center h-full">
                    <div className="text-center text-muted-foreground">
                      <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium mb-2">Chưa chọn sinh viên</h3>
                      <p className="text-sm">Nhập MSSV, số báo danh hoặc CCCD để xem thông tin chi tiết</p>
                    </div>
                  </CardContent>
                </Card>
              )}
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
