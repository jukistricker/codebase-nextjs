"use client"

import { useRBAC } from "@/contexts/rbac-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Key, Shield, Check, X } from "lucide-react"

export function PermissionsManagement() {
  const { permissions, roles } = useRBAC()

  const getRolesWithPermission = (permissionKey: string) =>
    roles.filter((r) => r.permissions.includes(permissionKey))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Permissions</h2>
        <p className="text-sm text-muted-foreground">
          View all available permissions and their role assignments
        </p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Key className="h-5 w-5 text-accent" />
            Permission Matrix
          </CardTitle>
          <CardDescription>
            Overview of permissions and which roles have access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Permission</TableHead>
                <TableHead className="text-muted-foreground">Key</TableHead>
                {roles.map((role) => (
                  <TableHead key={role.id} className="text-muted-foreground text-center">
                    {role.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((perm) => (
                <TableRow key={perm.id} className="border-border">
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{perm.name}</p>
                      <p className="text-xs text-muted-foreground">{perm.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-secondary px-1.5 py-0.5 rounded text-secondary-foreground">
                      {perm.key}
                    </code>
                  </TableCell>
                  {roles.map((role) => (
                    <TableCell key={role.id} className="text-center">
                      {role.permissions.includes(perm.key) ? (
                        <div className="flex justify-center">
                          <div className="p-1 rounded-full bg-accent/20">
                            <Check className="h-4 w-4 text-accent" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <div className="p-1 rounded-full bg-muted">
                            <X className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {permissions.map((perm) => {
          const assignedRoles = getRolesWithPermission(perm.key)
          return (
            <Card key={perm.id} className="bg-card border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-md bg-secondary">
                    <Key className="h-4 w-4 text-accent" />
                  </div>
                  <CardTitle className="text-foreground text-base">{perm.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{perm.description}</p>
                <code className="text-xs bg-secondary px-2 py-1 rounded text-secondary-foreground block">
                  {perm.key}
                </code>
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-2">Assigned to:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {assignedRoles.length > 0 ? (
                      assignedRoles.map((role) => (
                        <Badge key={role.id} variant="secondary" className="text-xs">
                          <Shield className="mr-1 h-3 w-3" />
                          {role.name}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground">No roles assigned</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
