"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PermissionsManagement } from "@/components/admin/permissions-management"

export default function AdminPermissionsPage() {
  return (
    <DashboardLayout>
      <PermissionsManagement />
    </DashboardLayout>
  )
}
