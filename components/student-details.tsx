"use client"

import { useState } from "react"
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

  const handleApproval = (status: 'approved' | 'rejected') => {
    if (!user) return

    setApprovalStatus(currentStudent.mssv, status, user.email)
    setCurrentStudent(prev => ({
      ...prev,
      trang_thai_duyet: status,
      nguoi_duyet: user.email,
      ngay_duyet: new Date().toISOString()
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
        <CardContent className="p-4 h-full">
          <div className="grid grid-cols-12 gap-4 h-full">
            {/* Left Column - Basic Info */}
            <div className="col-span-4 space-y-3">
              {/* Header */}
              <div className="pb-3 border-b">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold">{currentStudent.ho_ten}</h2>
                  <Badge className={getGenderBadge(currentStudent.gioi_tinh)}>{currentStudent.gioi_tinh}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">MSSV: {currentStudent.mssv}</div>
                {getApprovalBadge(currentStudent.trang_thai_duyet)}
              </div>

              {/* Basic Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-3 w-3 text-muted-foreground" />
                  <span className="font-medium">Thông tin cơ bản</span>
                </div>
                <div className="grid gap-1 pl-5">
                  <div><span className="text-muted-foreground">Ngày sinh:</span> {formatDate(currentStudent.ngay_sinh)}</div>
                  <div><span className="text-muted-foreground">CCCD:</span> {currentStudent.cccd}</div>
                  <div><span className="text-muted-foreground">Năm TN:</span> {currentStudent.nam_tot_nghiep}</div>
                  <div><span className="text-muted-foreground">Trường:</span> {currentStudent.truong_thpt}</div>
                </div>
              </div>

              {/* Academic Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-3 w-3 text-muted-foreground" />
                  <span className="font-medium">Thông tin học tập</span>
                </div>
                <div className="grid gap-1 pl-5">
                  <div><span className="text-muted-foreground">Khoa:</span> {currentStudent.khoa}</div>
                  <div><span className="text-muted-foreground">Ngành:</span> {currentStudent.nganh}</div>
                  <div><span className="text-muted-foreground">PT Nhập học:</span> {currentStudent.phuong_thuc_nhap_hoc}</div>
                </div>
              </div>

              {/* Fee Status */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-3 w-3 text-muted-foreground" />
                  <span className="font-medium">Học phí</span>
                </div>
                <div className="flex items-center space-x-2 pl-5">
                  <Checkbox
                    id="fee-status"
                    checked={currentStudent.tinh_trang_hoc_phi}
                    onCheckedChange={handleFeeStatusChange}
                  />
                  <label htmlFor="fee-status" className="text-sm">
                    Đã đóng học phí
                  </label>
                </div>
              </div>
            </div>

            {/* Middle Column - Documents */}
            <div className="col-span-4 space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-muted-foreground" />
                  <span className="font-medium">Hồ sơ ({currentStudent.ho_so_can_thiet.length})</span>
                </div>
                <div className="pl-5 max-h-80 overflow-y-auto">
                  <div className="space-y-1">
                    {currentStudent.ho_so_can_thiet.map((document, index) => (
                      <div key={index} className="flex items-start space-x-2 text-xs">
                        <Checkbox
                          id={`doc-${index}`}
                          checked={checkedDocuments[index] || false}
                          onCheckedChange={(checked: boolean) => handleDocumentCheck(index, checked)}
                        />
                        <label htmlFor={`doc-${index}`} className="flex-1 leading-tight">
                          {document}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Scores & Actions */}
            <div className="col-span-4 space-y-3">
              {/* Scores */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-3 w-3 text-muted-foreground" />
                  <span className="font-medium">Điểm thi</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pl-5">
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <div className="text-lg font-bold text-blue-600">{currentStudent.diem_toan || '-'}</div>
                    <div className="text-xs text-muted-foreground">Toán</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="text-lg font-bold text-green-600">{currentStudent.diem_sinh_hoc || '-'}</div>
                    <div className="text-xs text-muted-foreground">Sinh</div>
                  </div>
                  <div className="text-center p-2 bg-purple-50 rounded">
                    <div className="text-lg font-bold text-purple-600">{currentStudent.diem_tieng_anh || '-'}</div>
                    <div className="text-xs text-muted-foreground">Anh</div>
                  </div>
                  <div className="text-center p-2 bg-orange-50 rounded">
                    <div className="text-lg font-bold text-orange-600">{currentStudent.diem_tong || '-'}</div>
                    <div className="text-xs text-muted-foreground">Tổng</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4">
                {currentStudent.trang_thai_duyet === 'pending' ? (
                  <div className="space-y-2">
                    <Button
                      onClick={() => handleApproval('approved')}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Duyệt
                    </Button>
                    <Button
                      onClick={() => handleApproval('rejected')}
                      variant="outline"
                      className="w-full border-red-600 text-red-600 hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Từ chối
                    </Button>
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground text-center p-3 bg-gray-50 rounded">
                    {currentStudent.trang_thai_duyet === 'approved' ? 'Đã duyệt' : 'Đã từ chối'} bởi: {currentStudent.nguoi_duyet}
                    <br />
                    Thời gian: {formatDate(currentStudent.ngay_duyet || null)}
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
