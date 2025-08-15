"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  User,
  Calendar,
  GraduationCap,
  MapPin,
  FileText,
  Award,
  BarChart3,
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  Phone,
} from "lucide-react";
import type { Student } from "@/lib/mock-data";
import {
  setApprovalStatus,
  getCurrentUser,
  getApprovalStatus,
} from "@/lib/mock-auth";

interface StudentDetailsProps {
  student: Student;
}

export default function StudentDetails({ student }: StudentDetailsProps) {
  const [currentStudent, setCurrentStudent] = useState(student);
  const [checkedDocuments, setCheckedDocuments] = useState<{
    [key: string]: boolean;
  }>({});
  const user = getCurrentUser();

  // Update currentStudent when the prop changes or approval status changes
  useEffect(() => {
    // Get latest approval status from localStorage
    const approvalStatus = getApprovalStatus(student.mssv);
    if (approvalStatus) {
      setCurrentStudent({
        ...student,
        trang_thai_duyet: approvalStatus.status,
        nguoi_duyet: approvalStatus.approver,
        ngay_duyet: approvalStatus.timestamp,
      });
    } else {
      setCurrentStudent(student);
    }
  }, [student]);

  // Initialize checkboxes with all checked by default and load from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem(
      `student-${student.mssv}-checkboxes`
    );

    if (savedState) {
      // Load saved state from localStorage
      const parsedState = JSON.parse(savedState);
      setCheckedDocuments(parsedState.documents || {});

      // Update fee status if saved
      if (parsedState.feeStatus !== undefined) {
        setCurrentStudent((prev) => ({
          ...prev,
          tinh_trang_hoc_phi: parsedState.feeStatus,
        }));
      }
    } else {
      // Default all checkboxes to checked
      const initialState: { [key: string]: boolean } = {};
      student.ho_so_can_thiet.forEach((_, index) => {
        initialState[index] = true;
      });
      setCheckedDocuments(initialState);

      // Default fee status to checked if not already set
      if (!currentStudent.tinh_trang_hoc_phi) {
        setCurrentStudent((prev) => ({
          ...prev,
          tinh_trang_hoc_phi: true,
        }));
      }
    }
  }, [student.mssv, student.ho_so_can_thiet]);

  // Save to localStorage whenever checkbox states change
  useEffect(() => {
    const stateToSave = {
      documents: checkedDocuments,
      feeStatus: currentStudent.tinh_trang_hoc_phi,
    };
    localStorage.setItem(
      `student-${student.mssv}-checkboxes`,
      JSON.stringify(stateToSave)
    );
  }, [checkedDocuments, currentStudent.tinh_trang_hoc_phi, student.mssv]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Không có";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getGenderBadge = (gender: string) => {
    return gender === "Nam"
      ? "bg-blue-100 text-blue-800"
      : "bg-pink-100 text-pink-800";
  };

  const getApprovalBadge = (status: "pending" | "approved" | "rejected") => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1 text-sm px-3 py-1">
            <CheckCircle2 className="h-4 w-4" /> Đã tiếp nhận
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 flex items-center gap-1 text-sm px-3 py-1">
            <XCircle className="h-4 w-4" /> Từ chối
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1 text-sm px-3 py-1">
            <Clock className="h-4 w-4" /> Chờ tiếp nhận
          </Badge>
        );
    }
  };

  const handleApproval = (status: "approved" | "rejected" | "pending") => {
    if (!user) return;

    setApprovalStatus(currentStudent.mssv, status, user.email);
    setCurrentStudent((prev) => ({
      ...prev,
      trang_thai_duyet: status,
      nguoi_duyet: status === "pending" ? undefined : user.email,
      ngay_duyet: status === "pending" ? undefined : new Date().toISOString(),
    }));
  };

  const handleDocumentCheck = (documentIndex: number, checked: boolean) => {
    // Disable editing if already approved
    if (currentStudent.trang_thai_duyet === "approved") return;

    setCheckedDocuments((prev) => ({
      ...prev,
      [documentIndex]: checked,
    }));
  };

  const handleFeeStatusChange = (checked: boolean) => {
    // Disable editing if already approved
    if (currentStudent.trang_thai_duyet === "approved") return;

    setCurrentStudent((prev) => ({
      ...prev,
      tinh_trang_hoc_phi: checked,
    }));
  };

  return (
    <div className="h-full overflow-hidden">
      <Card className="h-full">
        <CardContent className="p-4 h-full">
          {/* Header Section - Fixed */}
          <div className="mb-4 pb-3 border-b">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">
                  {currentStudent.mssv} - {currentStudent.ho_ten}
                </h2>
              </div>
              <div className="flex flex-row items-end gap-2">
                <Badge
                  className={getGenderBadge(currentStudent.gioi_tinh)}
                  style={{ fontSize: "16px", padding: "6px 12px" }}
                >
                  {currentStudent.gioi_tinh}
                </Badge>
                {getApprovalBadge(currentStudent.trang_thai_duyet)}
              </div>
            </div>
          </div>

          {/* Main Content Grid - 4 columns for maximum info */}
          <div className="grid grid-cols-12 gap-4">
            {/* Column 1: Personal Info (4 cols) */}
            <div className="col-span-4 space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-lg text-blue-800">
                    Thông tin cá nhân
                  </span>
                </div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-medium">
                      Ngày sinh:
                    </span>
                    <span className="font-semibold">
                      {currentStudent.ngay_sinh}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-medium">
                      CCCD:
                    </span>
                    <span className="font-semibold">{currentStudent.cccd}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-medium">
                      SBD:
                    </span>
                    <span className="font-semibold">
                      {currentStudent.so_bao_danh}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-medium">
                      Khu vực:
                    </span>
                    <span className="font-semibold">{currentStudent.kv}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-medium">
                      Đối tượng:
                    </span>
                    <span className="font-semibold">{currentStudent.dt}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-lg text-green-800">
                    Liên hệ
                  </span>
                </div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground font-medium">
                      Email:
                    </span>
                    <span className="font-medium text-blue-600 text-xs break-all">
                      {currentStudent.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-medium">
                      SĐT:
                    </span>
                    <span className="font-semibold">
                      {currentStudent.dien_thoai}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-red-600" />
                  <span className="font-semibold text-lg text-red-800">
                    Địa chỉ
                  </span>
                </div>
                <div className="text-sm">
                  <span className="font-medium leading-relaxed">
                    {currentStudent.dia_chi_thuong_tru}
                  </span>
                </div>
              </div>
            </div>

            {/* Column 2: Academic Info (3 cols) */}
            <div className="col-span-3 space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="h-5 w-5 text-purple-600" />
                  <span className="font-semibold text-lg text-purple-800">
                    Học tập
                  </span>
                </div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-muted-foreground font-medium">
                      Ngành học:
                    </span>
                    <span className="font-semibold text-purple-700 text-right">
                      {currentStudent.ma_nganh} - {currentStudent.ten_nganh}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-muted-foreground font-medium whitespace-nowrap">
                      Trường THPT:
                    </span>
                    <span className="font-medium text-right">
                      {currentStudent.truong_thpt}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-muted-foreground font-medium whitespace-nowrap">
                      PT Nhập học:
                    </span>
                    <span className="font-medium text-blue-700 text-right">
                      {currentStudent.phuong_thuc_nhap_hoc}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-muted-foreground font-medium whitespace-nowrap">
                      Trúng tuyển nhờ ƯT:
                    </span>
                    <span className="font-medium text-blue-700 text-right">
                      {currentStudent.tt_uutien}
                    </span>
                  </div>
                </div>
              </div>

              {currentStudent.doat_giai && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    <span className="font-semibold text-lg text-yellow-800">
                      Giải thưởng
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-green-700 leading-tight">
                      {currentStudent.doat_giai}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Column 3: Scores & Fee (2 cols) */}
            <div className="col-span-2 space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-5 w-5 text-orange-600" />
                  <span className="font-semibold text-lg text-orange-800">
                    Điểm thi
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center p-2 bg-blue-50 rounded-lg border">
                    <div className="text-2xl font-bold text-blue-600">
                      {currentStudent.diem_toan || "-"}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Môn 1
                    </div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded-lg border">
                    <div className="text-2xl font-bold text-green-600">
                      {currentStudent.diem_sinh_hoc || "-"}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Môn 2
                    </div>
                  </div>
                  <div className="text-center p-2 bg-purple-50 rounded-lg border">
                    <div className="text-2xl font-bold text-purple-600">
                      {currentStudent.diem_tieng_anh || "-"}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Môn 3
                    </div>
                  </div>
                  <div className="text-center p-2 bg-orange-50 rounded-lg border">
                    <div className="text-2xl font-bold text-orange-600">
                      {currentStudent.diem_tong || "-"}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Điểm tổng (có tính điểm ƯT)
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-lg text-green-800">
                    Học phí
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="fee-status"
                    checked={currentStudent.tinh_trang_hoc_phi}
                    onCheckedChange={handleFeeStatusChange}
                    className="h-4 w-4"
                    disabled={true}
                  />
                  <label
                    htmlFor="fee-status"
                    className={`text-sm font-medium ${
                      currentStudent.trang_thai_duyet ===
                      ("approved" as "approved" | "rejected" | "pending")
                        ? "text-muted-foreground"
                        : "text-green-700"
                    }`}
                  >
                    Tình trạng học phí
                  </label>
                </div>
              </div>
            </div>

            {/* Column 4: Actions & Documents (3 cols) */}
            <div className="col-span-3 space-y-3">
              {/* Action Buttons at Top */}
              <div className="space-y-2">
                {currentStudent.trang_thai_duyet === "pending" ? (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleApproval("approved")}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base font-semibold"
                    >
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      Tiếp nhận
                    </Button>
                  </div>
                ) : currentStudent.trang_thai_duyet === "approved" ? (
                  <div className="space-y-2">
                    <div className="text-center p-2 bg-green-50 rounded-lg border">
                      <div className="font-semibold text-green-800 text-base">
                        ✅ Đã tiếp nhận
                      </div>
                      <div className="text-xs font-medium">
                        Bởi: {currentStudent.nguoi_duyet}
                      </div>
                      <div className="text-xs">
                        {formatDate(currentStudent.ngay_duyet || null)}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleApproval("pending")}
                      variant="outline"
                      className="w-full border-yellow-600 text-yellow-700 hover:bg-yellow-50 py-2 text-sm"
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      Hủy tiếp nhận
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-center p-2 bg-red-50 rounded-lg border">
                      <div className="font-semibold text-red-800 text-base">
                        ❌ Đã từ chối
                      </div>
                      <div className="text-xs font-medium">
                        Bởi: {currentStudent.nguoi_duyet}
                      </div>
                      <div className="text-xs">
                        {formatDate(currentStudent.ngay_duyet || null)}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleApproval("pending")}
                      variant="outline"
                      className="w-full border-yellow-600 text-yellow-700 hover:bg-yellow-50 py-2 text-sm"
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      Khôi phục
                    </Button>
                  </div>
                )}
              </div>

              {/* Documents List */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-lg text-blue-800">
                    Hồ sơ ({currentStudent.ho_so_can_thiet.length})
                  </span>
                </div>
                <div className="space-y-1 overflow-y-auto">
                  {currentStudent.ho_so_can_thiet.map((document, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-2 text-sm"
                    >
                      <Checkbox
                        id={`doc-${index}`}
                        checked={
                          checkedDocuments[index] !== undefined
                            ? checkedDocuments[index]
                            : true
                        }
                        onCheckedChange={(checked: boolean) =>
                          handleDocumentCheck(index, checked)
                        }
                        className="h-4 w-4 mt-0.5 flex-shrink-0"
                        disabled={
                          currentStudent.trang_thai_duyet === "approved"
                        }
                      />
                      <label
                        htmlFor={`doc-${index}`}
                        className={`flex-1 leading-relaxed cursor-pointer text-xs ${
                          currentStudent.trang_thai_duyet === "approved"
                            ? "text-muted-foreground"
                            : ""
                        }`}
                      >
                        {document}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
