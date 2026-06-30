// src/routes/student.tsx
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppLayout, type NavItem } from "@/components/AppLayout";
import { Home, Award, CalendarCheck, FileText, Calendar, MessageSquare } from "lucide-react";

const items: NavItem[] = [
  { to: "/student", label: "Dashboard", icon: Home },
  { to: "/student/results", label: "My Results", icon: Award },
  { to: "/student/attendance", label: "My Attendance", icon: CalendarCheck },
  { to: "/student/materials", label: "Notes & Assignments", icon: FileText },
  { to: "/student/calendar", label: "College Calendar", icon: Calendar },
  { to: "/student/messages", label: "Messages", icon: MessageSquare },
];

export const Route = createFileRoute("/student")({
  component: () => (
    <AppLayout items={items} role="Student" userName="Aarav Sharma">
      <Outlet />
    </AppLayout>
  ),
});