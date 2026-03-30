"use client"

import { useState } from "react"
import { useRBAC } from "@/contexts/rbac-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { User, Mail, Calendar, Shield, Save, Key } from "lucide-react"

export function ProfileContent() {
  const { currentUser, setCurrentUser } = useRBAC()
  const [name, setName] = useState(currentUser?.name ?? "")
  const [email, setEmail] = useState(currentUser?.email ?? "")
  const [isSaving, setIsSaving] = useState(false)

  const initials = currentUser?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    if (currentUser) {
      setCurrentUser({ ...currentUser, name, email })
    }
    setIsSaving(false)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Profile</h2>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 bg-card border-border">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-foreground">{currentUser?.name}</CardTitle>
            <CardDescription>{currentUser?.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center">
              <Badge
                variant={currentUser?.role === "admin" ? "default" : "secondary"}
                className="text-sm"
              >
                <Shield className="mr-1 h-3 w-3" />
                {currentUser?.role.toUpperCase()}
              </Badge>
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Joined {currentUser?.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Personal Information</CardTitle>
            <CardDescription>Update your personal details here</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup className="space-y-4">
              <Field>
                <FieldLabel htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </FieldLabel>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-input border-border"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-input border-border"
                />
              </Field>

              <div className="flex justify-end pt-4">
                <Button onClick={handleSave} disabled={isSaving}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Security</CardTitle>
          <CardDescription>Manage your password and security settings</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup className="space-y-4">
            <Field>
              <FieldLabel htmlFor="current-password" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                Current Password
              </FieldLabel>
              <Input
                id="current-password"
                type="password"
                placeholder="Enter current password"
                className="bg-input border-border"
              />
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="new-password">New Password</FieldLabel>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                  className="bg-input border-border"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm new password"
                  className="bg-input border-border"
                />
              </Field>
            </div>

            <div className="flex justify-end pt-4">
              <Button variant="secondary">
                <Key className="mr-2 h-4 w-4" />
                Update Password
              </Button>
            </div>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  )
}
