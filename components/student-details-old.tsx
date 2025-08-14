import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Calendar, GraduationCap, MapPin, FileText, Award, BarChart3 } from "lucide-react"
import type { Student } from "@/lib/mock-data"

interface StudentDetailsProps {
  student: Student
}

export default function StudentDetails({ student }: StudentDetailsProps) {
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

  return (
    <div className="space-y-6">
      {/* Header với ảnh giấy báo trúng tuyển */}
      <Card>
        <CardHeader className="text-center">
          {/* <div className="mx-auto mb-4">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tf937OlVmJGWozOCKxZdJ33xeiAuEu.png"
              alt="Giấy báo trúng tuyển"
              className="max-w-full h-auto border rounded-lg shadow-lg"
            />
          </div> */}
          <CardTitle className="text-2xl text-center">GIẤY BÁO TRÚNG TUYỂN</CardTitle>
          <CardDescription className="text-lg font-medium">
            (Hệ chính quy, khóa tuyển 2024 - Bậc Đại học)
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Thông tin sinh viên */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{student.ho_ten}</CardTitle>
              <CardDescription className="text-lg font-medium">MSSV: {student.mssv}</CardDescription>
            </div>
            <Badge className={getGenderBadge(student.gioi_tinh)}>{student.gioi_tinh}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Thông tin cá nhân */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <User className="h-5 w-5" />
              Thông Tin Cá Nhân
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Ngày sinh:</span>
                <span>{formatDate(student.ngay_sinh)}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">CCCD:</span>
                <span>{student.cccd}</span>
              </div>
              <div className="flex items-start gap-2 md:col-span-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">Hộ khẩu:</span>
                <span className="flex-1">{student.ho_khau}</span>
              </div>
              <div className="flex items-start gap-2 md:col-span-2">
                <GraduationCap className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">Trường:</span>
                <span className="flex-1">{student.truong_thpt}</span>
              </div>
            </div>
          </div>

          {/* Điểm thi */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Điểm Thi
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{student.diem_toan}</div>
                <div className="text-sm text-muted-foreground">Toán</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{student.diem_sinh_hoc}</div>
                <div className="text-sm text-muted-foreground">Sinh học</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{student.diem_tieng_anh}</div>
                <div className="text-sm text-muted-foreground">Tiếng Anh</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{student.diem_tong}</div>
                <div className="text-sm text-muted-foreground">Điểm tổng</div>
              </div>
            </div>
          </div>

          {/* Thông tin trúng tuyển */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Award className="h-5 w-5" />
              Thông Tin Trúng Tuyển
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Điều kiện trúng tuyển:</span>
                <p className="font-medium">{student.dieu_kien_trung_tuyen}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Trúng tuyển nhờ UT:</span>
                <p className="font-medium">{student.doi_tuong_ut || "Không"}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Mã ngành:</span>
                <p className="font-medium">{student.ma_nganh}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Tên ngành:</span>
                <p className="font-medium">{student.ten_nganh}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Khu vực UT:</span>
                <p className="font-medium">{student.khu_vuc_ut}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Số báo danh:</span>
                <p className="font-medium">{student.sbd}</p>
              </div>
            </div>
          </div>

          {/* Thông tin hệ thống */}
          <div className="pt-4 border-t">
            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <span>Ngày tạo hồ sơ:</span>
                <p>{formatDate(student.created_at)}</p>
              </div>
              <div>
                <span>Cập nhật lần cuối:</span>
                <p>{formatDate(student.updated_at)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
