// Mock authentication system using localStorage
export interface User {
  email: string
  name: string
  role: string
}

export const MOCK_USER: User = {
  email: "admin@gmail.com",
  name: "Admin",
  role: "reviewer"
}

export const MOCK_PASSWORD = "admin"

// Authentication functions
export function signIn(email: string, password: string): { success: boolean; error?: string; user?: User } {
  if (email === MOCK_USER.email && password === MOCK_PASSWORD) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(MOCK_USER))
    }
    return { success: true, user: MOCK_USER }
  }

  return { success: false, error: "Email hoặc mật khẩu không đúng" }
}

export function signOut(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user')
  }
}

export function getCurrentUser(): User | null {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      try {
        return JSON.parse(userStr)
      } catch {
        return null
      }
    }
  }
  return null
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

// Application approval functions using localStorage
export function getApprovalStatus(mssv: string): { status: 'pending' | 'approved' | 'rejected'; approver: string; timestamp: string } | null {
  if (typeof window !== 'undefined') {
    const approvals = localStorage.getItem('approvals')
    if (approvals) {
      try {
        const approvalData = JSON.parse(approvals)
        return approvalData[mssv] || null
      } catch {
        return null
      }
    }
  }
  return null
}

export function setApprovalStatus(mssv: string, status: 'approved' | 'rejected', approver: string): void {
  if (typeof window !== 'undefined') {
    const approvals = localStorage.getItem('approvals')
    let approvalData: { [key: string]: { status: string; approver: string; timestamp: string } } = {}

    if (approvals) {
      try {
        approvalData = JSON.parse(approvals)
      } catch {
        approvalData = {}
      }
    }

    approvalData[mssv] = {
      status,
      approver,
      timestamp: new Date().toISOString()
    }

    localStorage.setItem('approvals', JSON.stringify(approvalData))
  }
}

export function getApprovalHistory(): { [mssv: string]: { status: string; approver: string; timestamp: string } } {
  if (typeof window !== 'undefined') {
    const approvals = localStorage.getItem('approvals')
    if (approvals) {
      try {
        return JSON.parse(approvals)
      } catch {
        return {}
      }
    }
  }
  return {}
}
