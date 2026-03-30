"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardContent } from "@/components/dashboard-content"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [isVerifying, setIsVerifying] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    
    if (!token) {
      // Nếu không có chìa khóa (Token), đuổi về trang Login
      router.replace("/login")
    } else {
      // Có chìa khóa rồi thì cho vào
      setIsVerifying(false)
    }
  }, [router])

  // Trong lúc đang check token, hiển thị màn hình chờ cho "nguy hiểm"
  if (isVerifying) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Verifying Identity...
        </p>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  )
}