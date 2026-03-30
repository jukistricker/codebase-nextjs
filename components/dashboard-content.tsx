"use client"

import { useRBAC } from "@/contexts/rbac-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Shield, Key, Activity, TrendingUp, Clock } from "lucide-react"

export function DashboardContent() {
  const { currentUser, isAdmin, users, roles, permissions } = useRBAC()

  const userStats = [
    {
      title: "Your Role",
      value: currentUser?.role.toUpperCase() ?? "N/A",
      description: "Current access level",
      icon: Shield,
    },
    {
      title: "Last Login",
      value: "Just now",
      description: "Session started",
      icon: Clock,
    },
    {
      title: "Account Status",
      value: "Active",
      description: "Account in good standing",
      icon: Activity,
    },
  ]

  const adminStats = [
    {
      title: "Total Users",
      value: users.length,
      description: "Registered accounts",
      icon: Users,
      trend: "+12%",
    },
    {
      title: "Active Roles",
      value: roles.length,
      description: "Role definitions",
      icon: Shield,
      trend: "Stable",
    },
    {
      title: "Permissions",
      value: permissions.length,
      description: "Access controls",
      icon: Key,
      trend: "+2 new",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Overview of your account and system status
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {userStats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {isAdmin && (
        <>
          <div className="pt-4">
            <h3 className="text-lg font-medium text-foreground">Admin Overview</h3>
            <p className="text-sm text-muted-foreground">
              System-wide statistics and metrics
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {adminStats.map((stat) => (
              <Card key={stat.title} className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      {stat.trend}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Activity</CardTitle>
              <CardDescription>Latest system events and user actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "User jane@example.com logged in", time: "2 minutes ago", type: "info" },
                  { action: "Role 'Editor' permissions updated", time: "1 hour ago", type: "warning" },
                  { action: "New user bob@example.com registered", time: "3 hours ago", type: "success" },
                  { action: "Permission 'analytics:view' added", time: "1 day ago", type: "info" },
                ].map((event, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${
                        event.type === "success" ? "bg-accent" :
                        event.type === "warning" ? "bg-chart-4" :
                        "bg-muted-foreground"
                      }`} />
                      <span className="text-sm text-card-foreground">{event.action}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{event.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {!isAdmin && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary/50 cursor-pointer transition-colors">
                <div className="p-2 rounded-md bg-secondary">
                  <Users className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">Edit Profile</p>
                  <p className="text-xs text-muted-foreground">Update your information</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary/50 cursor-pointer transition-colors">
                <div className="p-2 rounded-md bg-secondary">
                  <Key className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">Change Password</p>
                  <p className="text-xs text-muted-foreground">Update security settings</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
