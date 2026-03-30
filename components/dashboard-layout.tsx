"use client"

import { RBACProvider } from "@/contexts/rbac-context"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import type { ReactNode } from "react"

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <RBACProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </RBACProvider>
  )
}
