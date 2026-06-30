// src/routes/login.tsx
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { COLLEGE_NAME } from "@/lib/mock-data";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: `Login — ${COLLEGE_NAME} Portal` },
      { name: "description", content: "Sign in to the college management portal" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState<"teacher" | "student" | null>(null);

  const handleLogin = async (role: "teacher" | "student") => {
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    setLoading(role);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(`Welcome back, ${data.user.name}!`);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate({ to: role === "teacher" ? "/teacher" : "/student" });
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Connection error. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 via-background to-background p-4">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <img 
              src="/aryan_college.jpg" 
              alt="Aryan College" 
              className="h-11 w-11 shrink-0 rounded-xl object-cover"
            />
            <div>
              <p className="font-semibold text-lg">{COLLEGE_NAME}</p>
              <p className="text-xs text-muted-foreground">Excellence in Education</p>
            </div>
          </Link>
        </div>

        {/* Login Card */}
        <div className="card-surface p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-2 duration-500 bg-card border rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to access your dashboard
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleLogin("student"); }} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Email address</label>
              <div className="relative mt-1.5">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@college.edu"
                  className="h-11 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative mt-1.5">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-11 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-input accent-primary"
                />
                <span>Remember me</span>
              </label>
              <button 
                type="button" 
                onClick={() => toast.info("Password reset link sent")} 
                className="font-medium text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <div className="grid gap-2 pt-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => handleLogin("teacher")}
                disabled={loading !== null}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-primary bg-card text-sm font-semibold text-primary transition hover:bg-primary/5 disabled:opacity-60"
              >
                {loading === "teacher" ? "Signing in..." : "Login as Teacher"}
              </button>
              <button
                type="submit"
                disabled={loading !== null}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-95 disabled:opacity-60"
              >
                {loading === "student" ? "Signing in..." : "Login as Student"}
              </button>
            </div>
          </form>

          <div className="mt-4 text-center text-xs text-muted-foreground border-t pt-4">
            <Link to="/" className="hover:text-primary transition">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}