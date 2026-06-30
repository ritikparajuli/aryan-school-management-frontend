// src/routes/admin.tsx
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppLayout, type NavItem } from "@/components/AppLayout";
import {
  Home, Users, ClipboardCheck, FileText, BarChart3, Calendar, Settings, MessageSquare,
} from "lucide-react";

const items: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: Home },
  { to: "/admin/users", label: "Manage Users", icon: Users },
  { to: "/admin/attendance", label: "Attendance Overview", icon: ClipboardCheck },
  { to: "/admin/notes", label: "Manage Notes", icon: FileText },
  { to: "/admin/results", label: "Results Overview", icon: BarChart3 },
  { to: "/admin/calendar", label: "College Calendar", icon: Calendar },
  { to: "/admin/messages", label: "Messages", icon: MessageSquare },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export const Route = createFileRoute("/admin")({
  component: () => (
    <AppLayout items={items} role="Admin" userName="Admin">
      <Outlet />
    </AppLayout>
  ),
});