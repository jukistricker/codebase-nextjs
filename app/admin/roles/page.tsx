"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { RolesManagement } from "@/components/admin/roles-management"

export default function AdminRolesPage() {
  return (
    <DashboardLayout>
      <RolesManagement />
    </DashboardLayout>
  )
}
