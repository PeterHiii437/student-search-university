"use client";

import { ADMISSION_METHODS, type Student } from "./mock-data";
import { getApprovalStatus } from "./mock-auth";
import { parse } from "csv-parse/sync";

let studentCache: Student[] | null = null;
let sampleIds: string[] = [];

function parseDateString(dateString: string | null) {
  if (!dateString) return "";
  const [day, month, year] = dateString.split("/");
  return new Date(`${year}-${month}-${day}`).toISOString();
}

async function loadStudents(): Promise<Student[]> {
  if (studentCache) return studentCache;

  const res = await fetch("/data.csv");
  const text = await res.text();
  const records = parse(text, {
    columns: true,
    skip_empty_lines: true,
    delimiter: ";",
  });

  studentCache = records.map((recordd, idx) => {
    const record = recordd as unknown as Record<string, string>;
    const total = record["Diem_TT"] ? parseFloat(record["Diem_TT"]) : null;

    const student: Student = {
      id: idx + 1,
      mssv: record["MaSV"],
      ho_ten: record["HoTen"],
      gioi_tinh: record["Phai"],
      ngay_sinh: parseDateString(record["NgaySinh"]),
      cccd: record["CMND"],
      email: record["Email"],
      dien_thoai: record["DienThoai"],
      so_bao_danh: record["SBD"],
      ma_hs: record["MaHS"],
      ho_khau: record["HoKhau"],
      ma_nganh: record["MaNganh"],
      ten_nganh: record["TenNganh"],
      truong_thpt: record["Truong_THPT"],
      doat_giai: record["DoatGiai"],
      phuong_thuc: record["DTT"],
      diem_tt: total,
      kv: record["KV"],
      dt: record["DT"],

      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      nam_tot_nghiep: 2024,
      tinh_trang_hoc_phi: false,
      so_tien_hoc_phi: 0,
      phuong_thuc_nhap_hoc: "",
      ho_so_can_thiet:
        ADMISSION_METHODS[idx % ADMISSION_METHODS.length].documents,
      trang_thai_duyet: "pending",
      khoa: record["TenNganh"],
      nganh: record["TenNganh"] || "",
      dia_chi_thuong_tru: record["HoKhau"],
      diem_toan: null,
      diem_sinh_hoc: null,
      diem_tieng_anh: null,
      diem_tong: total,
    };
    return student;
  });

  sampleIds = studentCache.map((s) => s.mssv);
  return studentCache;
}

// Search student by MSSV, Registration Number, or CCCD - compatible with useActionState
export async function searchStudent(
  _prevState: unknown,
  formData: FormData
): Promise<{ success: boolean; student?: Student; error?: string }> {
  if (!formData) {
    return { success: false, error: "Thiếu dữ liệu form" };
  }

  const studentId = formData.get("studentId");

  if (!studentId || typeof studentId !== "string" || studentId.trim() === "") {
    return {
      success: false,
      error: "Vui lòng nhập MSSV, Số báo danh hoặc CCCD",
    };
  }

  const searchTerm = studentId.trim();
  const students = await loadStudents();

  // Search by MSSV, Registration Number (so_bao_danh), or CCCD
  const student = students.find(
    (s) =>
      s.mssv === searchTerm ||
      s.so_bao_danh === searchTerm ||
      s.cccd === searchTerm
  );

  if (!student) {
    return {
      success: false,
      error: `Không tìm thấy sinh viên với: ${searchTerm}`,
    };
  }

  // Update approval status from localStorage
  const approvalStatus = getApprovalStatus(student.mssv);
  if (approvalStatus) {
    const updatedStudent = { ...student };
    updatedStudent.trang_thai_duyet = approvalStatus.status;
    return { success: true, student: updatedStudent };
  }

  return { success: true, student };
}

// Simple search function for direct use - supports MSSV, Registration Number, and CCCD
export async function searchStudentById(
  query: string
): Promise<{ success: boolean; student?: Student; error?: string }> {
  if (!query || query.trim() === "") {
    return {
      success: false,
      error: "Vui lòng nhập MSSV, Số báo danh hoặc CCCD",
    };
  }

  const searchTerm = query.trim();
  const students = await loadStudents();

  // Search by MSSV, Registration Number (so_bao_danh), or CCCD
  const student = students.find(
    (s) =>
      s.mssv === searchTerm ||
      s.so_bao_danh === searchTerm ||
      s.cccd === searchTerm
  );

  if (!student) {
    return {
      success: false,
      error: `Không tìm thấy sinh viên với: ${searchTerm}`,
    };
  }

  // Update approval status from localStorage
  const approvalStatus = getApprovalStatus(student.mssv);
  if (approvalStatus) {
    const updatedStudent = { ...student };
    updatedStudent.trang_thai_duyet = approvalStatus.status;
    return { success: true, student: updatedStudent };
  }

  return { success: true, student };
}

// Get all sample student IDs for display
export async function getSampleStudentIds(): Promise<string[]> {
  if (sampleIds.length === 0) await loadStudents();
  return sampleIds;
}

// Simulate real-time search with debouncing
export function searchStudentRealtime(
  query: string,
  callback: (results: { studentIds: string[]; hasResults: boolean }) => void,
  delay: number = 300
): NodeJS.Timeout {
  return setTimeout(async () => {
    const ids = await getSampleStudentIds();

    if (!query || query.trim() === "") {
      callback({ studentIds: ids, hasResults: true });
      return;
    }

    const filteredIds = ids.filter((id) => id.includes(query.trim()));
    callback({ studentIds: filteredIds, hasResults: filteredIds.length > 0 });
  }, delay);
}

// Get statistics
export async function getStudentStatistics() {
  const students = await loadStudents();
  const totalStudents = students.length;
  const approvedCount = students.filter(
    (s) => s.trang_thai_duyet === "approved"
  ).length;
  const pendingCount = students.filter(
    (s) => s.trang_thai_duyet === "pending"
  ).length;
  const rejectedCount = students.filter(
    (s) => s.trang_thai_duyet === "rejected"
  ).length;

  return {
    total: totalStudents,
    approved: approvedCount,
    pending: pendingCount,
    rejected: rejectedCount,
    todayApplications: Math.floor(Math.random() * 50) + 10,
  };
}
