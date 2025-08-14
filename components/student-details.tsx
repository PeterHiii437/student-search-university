"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Calendar, GraduationCap, MapPin, FileText, Award, BarChart3, CreditCard, CheckCircle2, XCircle, Clock } from "lucide-react"
import type { Student } from "@/lib/mock-data"
import { setApprovalStatus, getCurrentUser } from "@/lib/mock-auth"

interface StudentDetailsProps {
  student: Student
}

export default function StudentDetails({ student }: StudentDetailsProps) {
  const [currentStudent, setCurrentStudent] = useState(student)
  const [checkedDocuments, setCheckedDocuments] = useState<{ [key: string]: boolean }>({})
  const user = getCurrentUser()

  // Initialize checkboxes with all checked by default and load from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem(`student-${student.mssv}-checkboxes`)

    if (savedState) {
      // Load saved state from localStorage
      const parsedState = JSON.parse(savedState)
      setCheckedDocuments(parsedState.documents || {})

      // Update fee status if saved
      if (parsedState.feeStatus !== undefined) {
        setCurrentStudent(prev => ({
          ...prev,
          tinh_trang_hoc_phi: parsedState.feeStatus
        }))
      }
    } else {
      // Default all checkboxes to checked
      const initialState: { [key: string]: boolean } = {}
      student.ho_so_can_thiet.forEach((_, index) => {
        initialState[index] = true
      })
      setCheckedDocuments(initialState)

      // Default fee status to checked if not already set
      if (!currentStudent.tinh_trang_hoc_phi) {
        setCurrentStudent(prev => ({
          ...prev,
          tinh_trang_hoc_phi: true
        }))
      }
    }
  }, [student.mssv, student.ho_so_can_thiet])

  // Save to localStorage whenever checkbox states change
  useEffect(() => {
    const stateToSave = {
      documents: checkedDocuments,
      feeStatus: currentStudent.tinh_trang_hoc_phi
    }
    localStorage.setItem(`student-${student.mssv}-checkboxes`, JSON.stringify(stateToSave))
  }, [checkedDocuments, currentStudent.tinh_trang_hoc_phi, student.mssv])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Không có"
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getGenderBadge = (gender: string) => {
    return gender === "Nam" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"
  }

  const getApprovalBadge = (status: 'pending' | 'approved' | 'rejected') => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Đã duyệt</Badge>
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 flex items-center gap-1"><XCircle className="h-3 w-3" /> Từ chối</Badge>
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1"><Clock className="h-3 w-3" /> Chờ duyệt</Badge>
    }
  }

  const handleApproval = (status: 'approved' | 'rejected' | 'pending') => {
    if (!user) return

    setApprovalStatus(currentStudent.mssv, status, user.email)
    setCurrentStudent(prev => ({
      ...prev,
      trang_thai_duyet: status,
      nguoi_duyet: status === 'pending' ? undefined : user.email,
      ngay_duyet: status === 'pending' ? undefined : new Date().toISOString()
    }))
  }

  const handleDocumentCheck = (documentIndex: number, checked: boolean) => {
    setCheckedDocuments(prev => ({
      ...prev,
      [documentIndex]: checked
    }))
  }

  const handleFeeStatusChange = (checked: boolean) => {
    setCurrentStudent(prev => ({
      ...prev,
      tinh_trang_hoc_phi: checked
    }))
  }

  return (
    <div className="h-full">
      <Card className="h-full">
        <CardContent className="p-6 h-full">
          <div className="grid grid-cols-10 gap-6 h-full">
            {/* Left Column - Basic Info */}
            <div className="col-span-4 space-y-4">
              {/* Header */}
              <div className="pb-4 border-b">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-bold">{currentStudent.ho_ten}</h2>
                  <Badge className={getGenderBadge(currentStudent.gioi_tinh)} style={{ fontSize: '14px', padding: '4px 8px' }}>
                    {currentStudent.gioi_tinh}
                  </Badge>
                </div>
                <div className="text-base text-muted-foreground mb-2">MSSV: {currentStudent.mssv}</div>
                {getApprovalBadge(currentStudent.trang_thai_duyet)}
              </div>

              {/* Basic Info */}
              <div className="space-y-3 text-base">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">Thông tin cơ bản</span>
                </div>
                <div className="grid gap-2 pl-6">
                  <div><span className="text-muted-foreground">Ngày sinh:</span> {formatDate(currentStudent.ngay_sinh)}</div>
                  <div><span className="text-muted-foreground">CCCD:</span> {currentStudent.cccd}</div>
                  <div><span className="text-muted-foreground">Số báo danh:</span> {currentStudent.so_bao_danh}</div>
                  <div><span className="text-muted-foreground">Thường trú:</span> {currentStudent.dia_chi_thuong_tru}</div>
                  <div><span className="text-muted-foreground">Năm TN:</span> {currentStudent.nam_tot_nghiep}</div>
                  <div><span className="text-muted-foreground">Trường:</span> {currentStudent.truong_thpt}</div>
                </div>
              </div>

              {/* Academic Info */}
              <div className="space-y-3 text-base">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">Thông tin học tập</span>
                </div>
                <div className="grid gap-2 pl-6">
                  <div><span className="text-muted-foreground">Khoa:</span> {currentStudent.khoa}</div>
                  <div><span className="text-muted-foreground">Ngành:</span> {currentStudent.nganh}</div>
                  <div><span className="text-muted-foreground">PT Nhập học:</span> {currentStudent.phuong_thuc_nhap_hoc}</div>
                </div>
              </div>
            </div>

            {/* Middle Column - Documents & Fee */}
            <div className="col-span-4 space-y-4 flex flex-col h-full">
              {/* Fee Status */}
              <div className="space-y-3 text-base flex-shrink-0">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">Học phí</span>
                </div>
                <div className="flex items-center space-x-3 pl-6">
                  <Checkbox
                    id="fee-status"
                    checked={currentStudent.tinh_trang_hoc_phi}
                    onCheckedChange={handleFeeStatusChange}
                    className="h-5 w-5"
                  />
                  <label htmlFor="fee-status" className="text-base font-medium">
                    Đã đóng học phí ({formatCurrency(currentStudent.so_tien_hoc_phi)})
                  </label>
                </div>
              </div>

              {/* Documents */}
              <div className="space-y-3 text-base flex-grow flex flex-col min-h-0">
                <div className="flex items-center gap-2 flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">Hồ sơ ({currentStudent.ho_so_can_thiet.length})</span>
                </div>
                <div className="pl-6 flex-grow overflow-y-auto min-h-0">
                  <div className="space-y-2 pb-2">
                    {currentStudent.ho_so_can_thiet.map((document, index) => (
                      <div key={index} className="flex items-start space-x-3 text-sm">
                        <Checkbox
                          id={`doc-${index}`}
                          checked={checkedDocuments[index] !== undefined ? checkedDocuments[index] : true}
                          onCheckedChange={(checked: boolean) => handleDocumentCheck(index, checked)}
                          className="h-4 w-4 mt-0.5 flex-shrink-0"
                        />
                        <label htmlFor={`doc-${index}`} className="flex-1 leading-relaxed cursor-pointer">
                          {document}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Scores & Actions */}
            <div className="col-span-2 space-y-4 flex flex-col h-full">
              {/* Scores */}
              <div className="space-y-3 text-base">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">Điểm thi</span>
                </div>
                <div className="grid grid-cols-1 gap-3 pl-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{currentStudent.diem_toan || '-'}</div>
                    <div className="text-sm text-muted-foreground">Toán</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{currentStudent.diem_sinh_hoc || '-'}</div>
                    <div className="text-sm text-muted-foreground">Sinh</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">{currentStudent.diem_tieng_anh || '-'}</div>
                    <div className="text-sm text-muted-foreground">Anh</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-xl font-bold text-orange-600">{currentStudent.diem_tong || '-'}</div>
                    <div className="text-sm text-muted-foreground">Tổng</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex-grow flex flex-col justify-end pt-4">
                {currentStudent.trang_thai_duyet === 'pending' ? (
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleApproval('approved')}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base font-semibold"
                    >
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      Duyệt
                    </Button>
                  </div>
                ) : currentStudent.trang_thai_duyet === 'approved' ? (
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground text-center p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-800">Đã duyệt</div>
                      <div className="mt-1">bởi: {currentStudent.nguoi_duyet}</div>
                      <div className="mt-1">Thời gian: {formatDate(currentStudent.ngay_duyet || null)}</div>
                    </div>
                    <Button
                      onClick={() => handleApproval('pending')}
                      variant="outline"
                      className="w-full border-yellow-600 text-yellow-600 hover:bg-yellow-50 py-3 text-base font-semibold"
                    >
                      <Clock className="h-5 w-5 mr-2" />
                      Hủy duyệt
                    </Button>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground text-center p-4 bg-red-50 rounded-lg">
                    <div className="font-medium text-red-800">Đã từ chối</div>
                    <div className="mt-1">bởi: {currentStudent.nguoi_duyet}</div>
                    <div className="mt-1">Thời gian: {formatDate(currentStudent.ngay_duyet || null)}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
