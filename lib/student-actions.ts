"use server"

import { createClient } from "@/lib/supabase/server"

export interface Student {
  id: number
  mssv: string // Mã số sinh viên
  ho_ten: string // Họ và tên
  gioi_tinh: string // Giới tính
  ngay_sinh: string // Ngày sinh
  cccd: string // Căn cước công dân
  ho_khau: string // Hộ khẩu
  truong_thpt: string // Trường THPT
  diem_toan: number | null // Điểm Toán
  diem_sinh_hoc: number | null // Điểm Sinh học
  diem_tieng_anh: number | null // Điểm Tiếng Anh
  diem_tong: number | null // Điểm tổng
  dieu_kien_trung_tuyen: string | null // Điều kiện trúng tuyển
  nganh_trung_tuyen: string | null // Ngành trúng tuyển
  ma_nganh: string | null // Mã ngành
  ten_nganh: string | null // Tên ngành
  doi_tuong_ut: string | null // Đối tượng ưu tiên
  khu_vuc_ut: string | null // Khu vực ưu tiên
  sbd: string | null // Số báo danh
  created_at: string
  updated_at: string
}

// Tìm kiếm sinh viên theo MSSV
export async function searchStudent(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Thiếu dữ liệu form" }
  }

  const studentId = formData.get("studentId")

  if (!studentId || typeof studentId !== "string" || studentId.trim() === "") {
    return { error: "Mã số sinh viên là bắt buộc" }
  }

  const supabase = createClient()

  try {
    // Kiểm tra xác thực người dùng
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return { error: "Bạn phải đăng nhập để tìm kiếm sinh viên" }
    }

    // Tìm kiếm sinh viên theo MSSV
    const { data: student, error } = await supabase.from("students").select("*").eq("mssv", studentId.trim()).single()

    if (error) {
      if (error.code === "42P01") {
        return {
          error: "Cơ sở dữ liệu chưa được thiết lập. Vui lòng chạy script SQL để tạo bảng sinh viên.",
          needsSetup: true,
        }
      }
      if (error.code === "PGRST116") {
        return { error: "Không tìm thấy sinh viên. Vui lòng kiểm tra lại MSSV và thử lại." }
      }
      console.error("Lỗi cơ sở dữ liệu:", error)
      return { error: "Đã xảy ra lỗi khi tìm kiếm. Vui lòng thử lại." }
    }

    return { success: true, student }
  } catch (error) {
    console.error("Lỗi tìm kiếm:", error)
    return { error: "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại." }
  }
}

// Lấy tất cả sinh viên (cho mục đích quản trị)
export async function getAllStudents() {
  const supabase = createClient()

  try {
    // Kiểm tra xác thực người dùng
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return { error: "Bạn phải đăng nhập để xem danh sách sinh viên" }
    }

    const { data: students, error } = await supabase.from("students").select("*").order("mssv", { ascending: true })

    if (error) {
      if (error.code === "42P01") {
        return {
          error: "Cơ sở dữ liệu chưa được thiết lập. Vui lòng chạy script SQL để tạo bảng sinh viên.",
          needsSetup: true,
        }
      }
      console.error("Lỗi cơ sở dữ liệu:", error)
      return { error: "Đã xảy ra lỗi khi lấy danh sách sinh viên." }
    }

    return { success: true, students }
  } catch (error) {
    console.error("Lỗi lấy dữ liệu:", error)
    return { error: "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại." }
  }
}
