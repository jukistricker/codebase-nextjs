"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, Key, ArrowRight, Loader2, Lock, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/lib/api-client";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const router = useRouter();
  const { toast } = useToast();

  // Chặn XSS cơ bản: Nếu đã có token thì đá về home luôn, không cho login lại
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) router.push("/");
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", formData);
      const result = await response.json();

      if (response.ok && result.status === 200) {
        // Lưu token vào localStorage
        localStorage.setItem("access_token", result.data);

        toast({
          title: "Access Granted",
          description: "System identity verified. Redirecting...",
        });

        // Dùng replace để người dùng không bấm 'Back' quay lại trang login được
        setTimeout(() => router.replace("/"), 800);
      } else {
        toast({
          variant: "destructive",
          title: "Authentication Failed",
          description: result.message || "Invalid username or password.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Security Gateway Error",
        description: "Unable to reach the authentication server.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Grid - Phong cách CyberSecurity */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      <Card className="w-full max-w-md mx-4 bg-card/60 backdrop-blur-md border-border shadow-2xl relative z-10">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
              <Shield className="h-10 w-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">
            Login
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter authorized credentials to proceed
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
  <Label
    htmlFor="username"
    className="text-xs font-mono uppercase tracking-widest text-muted-foreground/70"
  >
    Operator ID
  </Label>
  <div className="relative group">
    <Input
      id="username"
      placeholder="Username..."
      required
      className="
        bg-background/40 
        border-border 
        pl-10 
        transition-all 
        duration-200
        /* Focus state: Chuyển sang bg-input y hệt CardHeader */
        focus-visible:bg-input
        focus-visible:ring-2 
        focus-visible:ring-ring/30 
        focus-visible:border-ring/50
        focus-visible:outline-none
      "
      onChange={handleChange}
      disabled={isLoading}
    />
    {/* Thêm icon User ở đây */}
    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-ring" />
  </div>
</div>

            <div className="grid gap-2">
              <Label
                htmlFor="password"
                className="text-xs font-mono uppercase tracking-widest text-muted-foreground/70"
              >
                Password
              </Label>
              <div className="relative group">
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="
        bg-background/40 
        border-border 
        pl-10 
        transition-all 
        duration-200
        /* Focus state: Chuyển sang bg-input y hệt CardHeader */
        focus-visible:bg-input
        focus-visible:ring-2 
        focus-visible:ring-ring/30 
        focus-visible:border-ring/50    
        focus-visible:outline-none
      "
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-ring" />
              </div>
            </div>
            <Button className="w-full mt-2" size="lg" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>
                  Login <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardContent>
        </form>

        <CardFooter className="flex flex-col gap-4 border-t border-border/50 pt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
            <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
            Secure Session Active
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
