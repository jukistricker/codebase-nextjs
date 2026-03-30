"use client"

import { useRBAC } from "@/contexts/rbac-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, LogOut, Settings, User } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api-client"
import { toast, useToast } from "./ui/use-toast"

export function Header() {
  const { toast } = useToast()
  const { currentUser, switchRole, isAdmin } = useRBAC()
  const handleLogout = async () => {
    try {
      // 1. Gọi API Logout (api.post đã tự động lấy token từ local gắn vào header rồi)
      const response = await api.post("/auth/logout", {});

      if (response.ok) {
        toast({
          title: "Logged out",
          description: "Your session has been terminated safely.",
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Dù API lỗi vẫn nên xóa token ở client để đảm bảo an toàn
    } finally {
      // 2. Xóa Token khỏi LocalStorage
      localStorage.removeItem("access_token");

      // 3. Đá về trang Login
      // Dùng window.location.href sẽ sạch sẽ hơn router.push vì nó xóa sạch state của React Context
      window.location.href = "/login";
    }
  };

  const initials = currentUser?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-medium text-foreground">
            Welcome back, {currentUser?.name}
          </h1>
          <Badge
            variant={isAdmin ? "default" : "secondary"}
            className="text-xs"
          >
            {currentUser?.role.toUpperCase()}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {currentUser?.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {currentUser?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Switch Role (Demo)
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={() => switchRole("user")}>
                <Badge variant="secondary" className="mr-2">
                  User
                </Badge>
                Standard User
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => switchRole("admin")}>
                <Badge variant="default" className="mr-2">
                  Admin
                </Badge>
                Administrator
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
               className="text-destructive cursor-pointer" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
