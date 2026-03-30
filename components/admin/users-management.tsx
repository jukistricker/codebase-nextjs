"use client"

import { useState } from "react"
import { useRBAC, type User, type Role } from "@/contexts/rbac-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Plus, Search, Pencil, Trash2, UserPlus } from "lucide-react"

export function UsersManagement() {
  const { users, setUsers, roles } = useRBAC()
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "user" as Role })

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddUser = () => {
    const user: User = {
      id: String(Date.now()),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      createdAt: new Date(),
    }
    setUsers([...users, user])
    setNewUser({ name: "", email: "", role: "user" })
    setIsAddDialogOpen(false)
  }

  const handleUpdateUser = () => {
    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u)))
      setEditingUser(null)
    }
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((u) => u.id !== userId))
  }

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Users</h2>
          <p className="text-sm text-muted-foreground">
            Manage user accounts and role assignments
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account and assign a role
              </DialogDescription>
            </DialogHeader>
            <FieldGroup className="space-y-4 py-4">
              <Field>
                <FieldLabel htmlFor="add-name">Name</FieldLabel>
                <Input
                  id="add-name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Enter user name"
                  className="bg-input border-border"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="add-email">Email</FieldLabel>
                <Input
                  id="add-email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="Enter email address"
                  className="bg-input border-border"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="add-role">Role</FieldLabel>
                <Select
                  value={newUser.role}
                  onValueChange={(value) => setNewUser({ ...newUser, role: value as Role })}
                >
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.name.toLowerCase()}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>Create User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-input border-border"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">User</TableHead>
                <TableHead className="text-muted-foreground">Email</TableHead>
                <TableHead className="text-muted-foreground">Role</TableHead>
                <TableHead className="text-muted-foreground">Created</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-border">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-foreground">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                      {user.role.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Dialog
                        open={editingUser?.id === user.id}
                        onOpenChange={(open) => !open && setEditingUser(null)}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingUser(user)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-card border-border">
                          <DialogHeader>
                            <DialogTitle className="text-foreground">Edit User</DialogTitle>
                            <DialogDescription>
                              Update user information and role assignment
                            </DialogDescription>
                          </DialogHeader>
                          {editingUser && (
                            <FieldGroup className="space-y-4 py-4">
                              <Field>
                                <FieldLabel htmlFor="edit-name">Name</FieldLabel>
                                <Input
                                  id="edit-name"
                                  value={editingUser.name}
                                  onChange={(e) =>
                                    setEditingUser({ ...editingUser, name: e.target.value })
                                  }
                                  className="bg-input border-border"
                                />
                              </Field>
                              <Field>
                                <FieldLabel htmlFor="edit-email">Email</FieldLabel>
                                <Input
                                  id="edit-email"
                                  type="email"
                                  value={editingUser.email}
                                  onChange={(e) =>
                                    setEditingUser({ ...editingUser, email: e.target.value })
                                  }
                                  className="bg-input border-border"
                                />
                              </Field>
                              <Field>
                                <FieldLabel htmlFor="edit-role">Role</FieldLabel>
                                <Select
                                  value={editingUser.role}
                                  onValueChange={(value) =>
                                    setEditingUser({ ...editingUser, role: value as Role })
                                  }
                                >
                                  <SelectTrigger className="bg-input border-border">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {roles.map((role) => (
                                      <SelectItem key={role.id} value={role.name.toLowerCase()}>
                                        {role.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </Field>
                            </FieldGroup>
                          )}
                          <DialogFooter>
                            <Button variant="secondary" onClick={() => setEditingUser(null)}>
                              Cancel
                            </Button>
                            <Button onClick={handleUpdateUser}>Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
