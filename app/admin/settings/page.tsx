"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { SettingsManagement } from "@/components/admin/settings-management"

export default function AdminSettingsPage() {
  return (
    <DashboardLayout>
      <SettingsManagement />
    </DashboardLayout>
  )
}
