import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Cổng Thông Tin Sinh Viên HCMUS",
  description: "Hệ thống quản lý thông tin sinh viên Đại học Khoa học Tự nhiên",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        <style>{`
html {
  font-family: 'Be Vietnam Pro', Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
