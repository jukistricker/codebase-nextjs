"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { UsersManagement } from "@/components/admin/users-management"

export default function AdminUsersPage() {
  return (
    <DashboardLayout>
      <UsersManagement />
    </DashboardLayout>
  )
}
