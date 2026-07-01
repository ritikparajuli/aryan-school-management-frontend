// src/routes/teacher.tsx
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppLayout, type NavItem } from "@/components/AppLayout";
import {
  Home, ClipboardCheck, FileText, FileUp, BarChart3, Calendar, Users, MessageSquare,
} from "lucide-react";

const items: NavItem[] = [
  { to: "/teacher", label: "Dashboard", icon: Home },
  { to: "/teacher/attendance", label: "Take Attendance", icon: ClipboardCheck },
  { to: "/teacher/notes", label: "Upload Notes", icon: FileText },
  { to: "/teacher/assignments", label: "Upload Assignments", icon: FileUp },
  { to: "/teacher/results", label: "Add Results", icon: BarChart3 },
  { to: "/teacher/calendar", label: "College Calendar", icon: Calendar },
  { to: "/teacher/students", label: "Student List", icon: Users },
  { to: "/teacher/messages", label: "Messages", icon: MessageSquare },
];

export const Route = createFileRoute("/teacher")({
  component: () => (
    <AppLayout items={items} role="Teacher" userName="Richa Ma'am">
      <Outlet />
    </AppLayout>
  ),
});