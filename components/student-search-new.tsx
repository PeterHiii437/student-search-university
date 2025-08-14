"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"
import { getSampleStudentIds } from "@/lib/mock-student-actions"
import type { Student } from "@/lib/mock-data"

interface StudentSearchProps {
  onStudentFound?: (student: Student | null) => void
  onError?: (error: string | null) => void
}

export default function StudentSearch({ onStudentFound, onError }: StudentSearchProps) {
  const [sampleIds] = useState(getSampleStudentIds())
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Real-time search functionality is handled by parent component
    // This is now just a display component
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Tìm Kiếm Sinh Viên
        </CardTitle>
        <CardDescription>
          Nhập mã số sinh viên để xem thông tin trúng tuyển (gõ trực tiếp để tìm kiếm)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            name="studentId"
            placeholder="Nhập MSSV (ví dụ: 24120001)"
            className="w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div>
            <div className="text-sm font-medium mb-2">
              ID mẫu để thử ({sampleIds.length} sinh viên):
            </div>
            <div className="grid grid-cols-5 gap-2">
              {sampleIds.slice(0, 10).map((id) => (
                <button
                  key={id}
                  onClick={() => setSearchQuery(id)}
                  className="text-xs p-2 border rounded hover:bg-blue-50 hover:border-blue-300"
                >
                  {id}
                </button>
              ))}
            </div>
            {sampleIds.length > 10 && (
              <div className="text-xs text-muted-foreground mt-2">
                và {sampleIds.length - 10} ID khác...
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
