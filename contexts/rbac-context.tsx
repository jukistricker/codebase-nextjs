"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Role = "user" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatar?: string
  createdAt: Date
}

export interface Permission {
  id: string
  name: string
  description: string
  key: string
}

export interface RoleDefinition {
  id: string
  name: string
  description: string
  permissions: string[]
}

interface RBACContextType {
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  isAdmin: boolean
  hasPermission: (permission: string) => boolean
  switchRole: (role: Role) => void
  users: User[]
  setUsers: (users: User[]) => void
  roles: RoleDefinition[]
  setRoles: (roles: RoleDefinition[]) => void
  permissions: Permission[]
}

const RBACContext = createContext<RBACContextType | undefined>(undefined)

const defaultPermissions: Permission[] = [
  { id: "1", name: "View Dashboard", description: "Access to view the main dashboard", key: "dashboard:view" },
  { id: "2", name: "Edit Profile", description: "Ability to edit own profile", key: "profile:edit" },
  { id: "3", name: "Manage Users", description: "Create, edit, and delete users", key: "users:manage" },
  { id: "4", name: "Manage Roles", description: "Create, edit, and delete roles", key: "roles:manage" },
  { id: "5", name: "View Analytics", description: "Access analytics and reports", key: "analytics:view" },
  { id: "6", name: "System Settings", description: "Access to system configuration", key: "settings:manage" },
]

const defaultRoles: RoleDefinition[] = [
  {
    id: "1",
    name: "User",
    description: "Standard user with basic access",
    permissions: ["dashboard:view", "profile:edit"],
  },
  {
    id: "2",
    name: "Admin",
    description: "Full administrative access",
    permissions: ["dashboard:view", "profile:edit", "users:manage", "roles:manage", "analytics:view", "settings:manage"],
  },
]

const defaultUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "admin", createdAt: new Date("2024-01-15") },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "user", createdAt: new Date("2024-02-20") },
  { id: "3", name: "Bob Wilson", email: "bob@example.com", role: "user", createdAt: new Date("2024-03-10") },
  { id: "4", name: "Alice Brown", email: "alice@example.com", role: "user", createdAt: new Date("2024-04-05") },
]

export function RBACProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(defaultUsers[0])
  const [users, setUsers] = useState<User[]>(defaultUsers)
  const [roles, setRoles] = useState<RoleDefinition[]>(defaultRoles)

  const isAdmin = currentUser?.role === "admin"

  const hasPermission = (permission: string): boolean => {
    if (!currentUser) return false
    const userRole = roles.find(
      (r) => r.name.toLowerCase() === currentUser.role.toLowerCase()
    )
    return userRole?.permissions.includes(permission) ?? false
  }

  const switchRole = (role: Role) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, role })
    }
  }

  return (
    <RBACContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAdmin,
        hasPermission,
        switchRole,
        users,
        setUsers,
        roles,
        setRoles,
        permissions: defaultPermissions,
      }}
    >
      {children}
    </RBACContext.Provider>
  )
}

export function useRBAC() {
  const context = useContext(RBACContext)
  if (context === undefined) {
    throw new Error("useRBAC must be used within a RBACProvider")
  }
  return context
}
