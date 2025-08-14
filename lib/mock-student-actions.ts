"use client"

import { Student, MOCK_STUDENTS, SAMPLE_STUDENT_IDS } from './mock-data'
import { getApprovalStatus } from './mock-auth'

// Search student by MSSV, Registration Number, or CCCD - compatible with useActionState
export async function searchStudent(prevState: any, formData: FormData): Promise<{ success: boolean; student?: Student; error?: string }> {
  if (!formData) {
    return { success: false, error: "Thiếu dữ liệu form" }
  }

  const studentId = formData.get("studentId")

  if (!studentId || typeof studentId !== "string" || studentId.trim() === "") {
    return { success: false, error: "Vui lòng nhập MSSV, Số báo danh hoặc CCCD" }
  }

  const searchTerm = studentId.trim()

  // Search by MSSV, Registration Number (so_bao_danh), or CCCD
  const student = MOCK_STUDENTS.find(s =>
    s.mssv === searchTerm ||
    s.so_bao_danh === searchTerm ||
    s.cccd === searchTerm
  )

  if (!student) {
    return { success: false, error: `Không tìm thấy sinh viên với: ${searchTerm}` }
  }

  // Update approval status from localStorage
  const approvalStatus = getApprovalStatus(student.mssv)
  if (approvalStatus) {
    const updatedStudent = { ...student }
    updatedStudent.trang_thai_duyet = approvalStatus.status
    return { success: true, student: updatedStudent }
  }

  return { success: true, student }
}

// Simple search function for direct use - supports MSSV, Registration Number, and CCCD
export function searchStudentById(query: string): { success: boolean; student?: Student; error?: string } {
  if (!query || query.trim() === "") {
    return { success: false, error: "Vui lòng nhập MSSV, Số báo danh hoặc CCCD" }
  }

  const searchTerm = query.trim()

  // Search by MSSV, Registration Number (so_bao_danh), or CCCD
  const student = MOCK_STUDENTS.find(s =>
    s.mssv === searchTerm ||
    s.so_bao_danh === searchTerm ||
    s.cccd === searchTerm
  )

  if (!student) {
    return { success: false, error: `Không tìm thấy sinh viên với: ${searchTerm}` }
  }

  // Update approval status from localStorage
  const approvalStatus = getApprovalStatus(student.mssv)
  if (approvalStatus) {
    const updatedStudent = { ...student }
    updatedStudent.trang_thai_duyet = approvalStatus.status
    return { success: true, student: updatedStudent }
  }

  return { success: true, student }
}// Get all sample student IDs for display
export function getSampleStudentIds(): string[] {
  return SAMPLE_STUDENT_IDS
}

// Simulate real-time search with debouncing
export function searchStudentRealtime(
  query: string,
  callback: (results: { studentIds: string[]; hasResults: boolean }) => void,
  delay: number = 300
): NodeJS.Timeout {
  return setTimeout(() => {
    if (!query || query.trim() === '') {
      callback({ studentIds: SAMPLE_STUDENT_IDS, hasResults: true })
      return
    }

    const filteredIds = SAMPLE_STUDENT_IDS.filter(id =>
      id.includes(query.trim())
    )

    callback({ studentIds: filteredIds, hasResults: filteredIds.length > 0 })
  }, delay)
}

// Get statistics
export function getStudentStatistics() {
  // Calculate from mock data and localStorage approvals
  const totalStudents = MOCK_STUDENTS.length
  const approvedCount = MOCK_STUDENTS.filter(s => s.trang_thai_duyet === 'approved').length
  const pendingCount = MOCK_STUDENTS.filter(s => s.trang_thai_duyet === 'pending').length
  const rejectedCount = MOCK_STUDENTS.filter(s => s.trang_thai_duyet === 'rejected').length

  return {
    total: totalStudents,
    approved: approvedCount,
    pending: pendingCount,
    rejected: rejectedCount,
    todayApplications: Math.floor(Math.random() * 50) + 10 // Random for demo
  }
}
