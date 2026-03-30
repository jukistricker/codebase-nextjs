"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Settings, Shield, Bell, Database, Save, RefreshCw } from "lucide-react"

export function SettingsManagement() {
  const [settings, setSettings] = useState({
    sessionTimeout: "30",
    requireMFA: false,
    allowRegistration: true,
    emailNotifications: true,
    auditLogs: true,
    passwordMinLength: "8",
    maxLoginAttempts: "5",
    lockoutDuration: "15",
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Settings</h2>
          <p className="text-sm text-muted-foreground">
            Configure system-wide security and authentication settings
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              <CardTitle className="text-foreground">Authentication</CardTitle>
            </div>
            <CardDescription>Configure user authentication and session settings</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="session-timeout">Session Timeout (minutes)</FieldLabel>
                  <Select
                    value={settings.sessionTimeout}
                    onValueChange={(value) => setSettings({ ...settings, sessionTimeout: value })}
                  >
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="480">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="max-attempts">Max Login Attempts</FieldLabel>
                  <Input
                    id="max-attempts"
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={(e) => setSettings({ ...settings, maxLoginAttempts: e.target.value })}
                    className="bg-input border-border"
                  />
                </Field>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Require MFA</p>
                  <p className="text-xs text-muted-foreground">
                    Require multi-factor authentication for all users
                  </p>
                </div>
                <Switch
                  checked={settings.requireMFA}
                  onCheckedChange={(checked) => setSettings({ ...settings, requireMFA: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Allow Registration</p>
                  <p className="text-xs text-muted-foreground">
                    Allow new users to register accounts
                  </p>
                </div>
                <Switch
                  checked={settings.allowRegistration}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, allowRegistration: checked })
                  }
                />
              </div>
            </FieldGroup>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              <CardTitle className="text-foreground">Password Policy</CardTitle>
            </div>
            <CardDescription>Set requirements for user passwords</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="password-min">Minimum Password Length</FieldLabel>
                  <Input
                    id="password-min"
                    type="number"
                    value={settings.passwordMinLength}
                    onChange={(e) =>
                      setSettings({ ...settings, passwordMinLength: e.target.value })
                    }
                    className="bg-input border-border"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="lockout-duration">Lockout Duration (minutes)</FieldLabel>
                  <Input
                    id="lockout-duration"
                    type="number"
                    value={settings.lockoutDuration}
                    onChange={(e) => setSettings({ ...settings, lockoutDuration: e.target.value })}
                    className="bg-input border-border"
                  />
                </Field>
              </div>
            </FieldGroup>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-accent" />
              <CardTitle className="text-foreground">Notifications & Logging</CardTitle>
            </div>
            <CardDescription>Configure notification and audit log settings</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">
                    Send email notifications for important events
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, emailNotifications: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Audit Logging</p>
                  <p className="text-xs text-muted-foreground">
                    Log all user actions and system events
                  </p>
                </div>
                <Switch
                  checked={settings.auditLogs}
                  onCheckedChange={(checked) => setSettings({ ...settings, auditLogs: checked })}
                />
              </div>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
