"use client"

import { useState } from "react"
import { useRBAC, type RoleDefinition } from "@/contexts/rbac-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Shield, Plus, Pencil, Trash2, Key, Users } from "lucide-react"

export function RolesManagement() {
  const { roles, setRoles, permissions, users } = useRBAC()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<RoleDefinition | null>(null)
  const [newRole, setNewRole] = useState({ name: "", description: "", permissions: [] as string[] })

  const handleAddRole = () => {
    const role: RoleDefinition = {
      id: String(Date.now()),
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions,
    }
    setRoles([...roles, role])
    setNewRole({ name: "", description: "", permissions: [] })
    setIsAddDialogOpen(false)
  }

  const handleUpdateRole = () => {
    if (editingRole) {
      setRoles(roles.map((r) => (r.id === editingRole.id ? editingRole : r)))
      setEditingRole(null)
    }
  }

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter((r) => r.id !== roleId))
  }

  const togglePermission = (
    permissionKey: string,
    current: string[],
    setter: (perms: string[]) => void
  ) => {
    if (current.includes(permissionKey)) {
      setter(current.filter((p) => p !== permissionKey))
    } else {
      setter([...current, permissionKey])
    }
  }

  const getUserCountForRole = (roleName: string) =>
    users.filter((u) => u.role.toLowerCase() === roleName.toLowerCase()).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Roles</h2>
          <p className="text-sm text-muted-foreground">
            Define roles and their associated permissions
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Role
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-foreground">Create New Role</DialogTitle>
              <DialogDescription>
                Define a new role with specific permissions
              </DialogDescription>
            </DialogHeader>
            <FieldGroup className="space-y-4 py-4">
              <Field>
                <FieldLabel htmlFor="add-role-name">Role Name</FieldLabel>
                <Input
                  id="add-role-name"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  placeholder="Enter role name"
                  className="bg-input border-border"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="add-role-desc">Description</FieldLabel>
                <Textarea
                  id="add-role-desc"
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  placeholder="Describe this role"
                  className="bg-input border-border resize-none"
                />
              </Field>
              <Field>
                <FieldLabel>Permissions</FieldLabel>
                <div className="space-y-2 mt-2">
                  {permissions.map((perm) => (
                    <div key={perm.id} className="flex items-center gap-2">
                      <Checkbox
                        id={`add-perm-${perm.id}`}
                        checked={newRole.permissions.includes(perm.key)}
                        onCheckedChange={() =>
                          togglePermission(perm.key, newRole.permissions, (perms) =>
                            setNewRole({ ...newRole, permissions: perms })
                          )
                        }
                      />
                      <label
                        htmlFor={`add-perm-${perm.id}`}
                        className="text-sm text-foreground cursor-pointer"
                      >
                        {perm.name}
                      </label>
                    </div>
                  ))}
                </div>
              </Field>
            </FieldGroup>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddRole}>Create Role</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {roles.map((role) => (
          <Card key={role.id} className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-secondary">
                    <Shield className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground text-lg">{role.name}</CardTitle>
                    <CardDescription className="text-sm">{role.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Dialog
                    open={editingRole?.id === role.id}
                    onOpenChange={(open) => !open && setEditingRole(null)}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingRole({ ...role })}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-border max-w-lg">
                      <DialogHeader>
                        <DialogTitle className="text-foreground">Edit Role</DialogTitle>
                        <DialogDescription>
                          Update role details and permissions
                        </DialogDescription>
                      </DialogHeader>
                      {editingRole && (
                        <FieldGroup className="space-y-4 py-4">
                          <Field>
                            <FieldLabel htmlFor="edit-role-name">Role Name</FieldLabel>
                            <Input
                              id="edit-role-name"
                              value={editingRole.name}
                              onChange={(e) =>
                                setEditingRole({ ...editingRole, name: e.target.value })
                              }
                              className="bg-input border-border"
                            />
                          </Field>
                          <Field>
                            <FieldLabel htmlFor="edit-role-desc">Description</FieldLabel>
                            <Textarea
                              id="edit-role-desc"
                              value={editingRole.description}
                              onChange={(e) =>
                                setEditingRole({ ...editingRole, description: e.target.value })
                              }
                              className="bg-input border-border resize-none"
                            />
                          </Field>
                          <Field>
                            <FieldLabel>Permissions</FieldLabel>
                            <div className="space-y-2 mt-2">
                              {permissions.map((perm) => (
                                <div key={perm.id} className="flex items-center gap-2">
                                  <Checkbox
                                    id={`edit-perm-${perm.id}`}
                                    checked={editingRole.permissions.includes(perm.key)}
                                    onCheckedChange={() =>
                                      togglePermission(
                                        perm.key,
                                        editingRole.permissions,
                                        (perms) =>
                                          setEditingRole({ ...editingRole, permissions: perms })
                                      )
                                    }
                                  />
                                  <label
                                    htmlFor={`edit-perm-${perm.id}`}
                                    className="text-sm text-foreground cursor-pointer"
                                  >
                                    {perm.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Field>
                        </FieldGroup>
                      )}
                      <DialogFooter>
                        <Button variant="secondary" onClick={() => setEditingRole(null)}>
                          Cancel
                        </Button>
                        <Button onClick={handleUpdateRole}>Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDeleteRole(role.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Key className="h-3.5 w-3.5" />
                  <span>{role.permissions.length} permissions</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  <span>{getUserCountForRole(role.name)} users</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {role.permissions.slice(0, 4).map((permKey) => {
                  const perm = permissions.find((p) => p.key === permKey)
                  return (
                    <Badge key={permKey} variant="secondary" className="text-xs">
                      {perm?.name ?? permKey}
                    </Badge>
                  )
                })}
                {role.permissions.length > 4 && (
                  <Badge variant="secondary" className="text-xs">
                    +{role.permissions.length - 4} more
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
