"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Search } from "lucide-react"
import { searchStudent } from "@/lib/mock-student-actions"
import StudentDetails from "./student-details"

function SearchButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="bg-blue-600 hover:bg-blue-700 text-white">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Đang tìm kiếm...
        </>
      ) : (
        <>
          <Search className="mr-2 h-4 w-4" />
          Tìm kiếm
        </>
      )}
    </Button>
  )
}

export default function StudentSearch() {
  const [state, formAction] = useActionState(searchStudent, null)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Tìm Kiếm Sinh Viên
          </CardTitle>
          <CardDescription>Nhập mã số sinh viên để xem thông tin trúng tuyển</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="flex gap-4">
            <div className="flex-1">
              <Input name="studentId" placeholder="Nhập MSSV (ví dụ: 24150125)" className="w-full" required />
            </div>
            <SearchButton />
          </form>

          {state?.error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{state.error}</div>
          )}
        </CardContent>
      </Card>

      {state?.success && state?.student && <StudentDetails student={state.student} />}
    </div>
  )
}
