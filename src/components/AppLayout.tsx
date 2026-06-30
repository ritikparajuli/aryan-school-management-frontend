// src/components/AppLayout.tsx
import { type ReactNode, useState } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  Bell, LogOut, Menu, X,
} from "lucide-react";
import { COLLEGE_NAME } from "@/lib/mock-data";
import { Footer } from "./Footer";
import { cn } from "@/lib/utils";

export interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function AppLayout({
  items,
  role,
  userName,
  children,
}: {
  items: NavItem[];
  role: "Teacher" | "Student" | "Admin";
  userName: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const initials = userName.split(" ").map((w) => w[0]).slice(0, 2).join("");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Topbar */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-card px-4 sm:px-6">
        <div className="flex items-center gap-3 min-w-0">
          <button
            className="rounded-md p-2 hover:bg-muted lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="flex items-center gap-2 min-w-0">
<img 
  src="/aryan_college.jpg" 
  alt="Aryan College" 
  className="h-9 w-9 shrink-0 rounded-lg object-cover"
/>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold leading-tight">{COLLEGE_NAME}</p>
              <p className="text-xs text-muted-foreground leading-tight">{role} Portal</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button className="relative rounded-full p-2 hover:bg-muted" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
          </button>
          <div className="hidden items-center gap-2 sm:flex">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-accent text-accent-foreground text-sm font-semibold">
              {initials}
            </div>
            <div className="leading-tight">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground">{role}</p>
            </div>
          </div>
          <button
            onClick={() => navigate({ to: "/" })}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium hover:bg-muted"
          >
            <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-16 left-0 z-30 w-64 border-r border-sidebar-border bg-sidebar p-4 transition-transform lg:static lg:inset-auto lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          <nav className="space-y-1">
            {items.map((item) => {
              const active = pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <Icon className="h-4.5 w-4.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {open && (
          <div
            className="fixed inset-0 z-20 bg-black/40 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Main */}
        <main className="flex-1 min-w-0">
          <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">{children}</div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
