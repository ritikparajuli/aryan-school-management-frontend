// src/routes/teacher.index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { Users, BookOpen, ClipboardList, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { RECENT_ACTIVITY, STUDENTS } from "@/lib/mock-data";

export const Route = createFileRoute("/teacher/")({
  head: () => ({ meta: [{ title: "Teacher Dashboard" }] }),
  component: TeacherDashboard,
});

const stats = [
  { label: "Total Students", value: STUDENTS.length * 12, icon: Users, accent: "bg-blue-50 text-blue-600" },
  { label: "Today's Classes", value: 5, icon: BookOpen, accent: "bg-violet-50 text-violet-600" },
  { label: "Pending Assignments", value: 8, icon: ClipboardList, accent: "bg-amber-50 text-amber-600" },
  { label: "Attendance Today", value: "92%", icon: TrendingUp, accent: "bg-emerald-50 text-emerald-600" },
];

function TeacherDashboard() {
  return (
    <>
      <PageHeader
        title="Welcome back, Dr. Menon"
        subtitle="Here's what's happening across your classes today."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card-surface p-5 transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
              <div className={`grid h-9 w-9 place-items-center rounded-lg ${s.accent}`}>
                <s.icon className="h-4.5 w-4.5" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold tracking-tight">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="card-surface p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <p className="text-sm text-muted-foreground">Your latest actions across the portal</p>
          <ul className="mt-4 divide-y divide-border">
            {RECENT_ACTIVITY.map((a) => (
              <li key={a.id} className="flex items-start gap-3 py-3">
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm">{a.text}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-surface p-6">
          <h2 className="text-lg font-semibold">Quick Stats</h2>
          <p className="text-sm text-muted-foreground">This week at a glance</p>
          <div className="mt-4 space-y-4">
            {[
              { label: "Avg. Attendance", value: 92 },
              { label: "Assignment Completion", value: 78 },
              { label: "Notes Downloads", value: 64 },
            ].map((m) => (
              <div key={m.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{m.label}</span>
                  <span className="font-semibold">{m.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${m.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
