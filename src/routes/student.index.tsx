// src/routes/student.index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { Award, CalendarCheck, ClipboardList, GraduationCap, Download } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ASSIGNMENTS, STUDENT_RESULTS, UPLOADED_NOTES } from "@/lib/mock-data";

export const Route = createFileRoute("/student/")({
  head: () => ({ meta: [{ title: "Student Dashboard" }] }),
  component: StudentDashboard,
});

function daysUntil(dateStr: string) {
  const diff = (new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
  return Math.ceil(diff);
}

function StudentDashboard() {
  const overall = Math.round(
    (STUDENT_RESULTS.reduce((s, r) => s + r.obtained, 0) /
      STUDENT_RESULTS.reduce((s, r) => s + r.total, 0)) * 100
  );

  const stats = [
    { label: "Overall Percentage", value: `${overall}%`, icon: GraduationCap, accent: "bg-blue-50 text-blue-600" },
    { label: "Attendance", value: "88%", icon: CalendarCheck, accent: "bg-emerald-50 text-emerald-600" },
    { label: "Upcoming Assignments", value: ASSIGNMENTS.filter((a) => a.status === "Active").length, icon: ClipboardList, accent: "bg-amber-50 text-amber-600" },
    { label: "Upcoming Exams", value: 2, icon: Award, accent: "bg-violet-50 text-violet-600" },
  ];

  return (
    <>
      <PageHeader title="Hello, Aarav 👋" subtitle="Your academic snapshot for this semester." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card-surface p-5 transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
              <div className={`grid h-9 w-9 place-items-center rounded-lg ${s.accent}`}><s.icon className="h-4.5 w-4.5" /></div>
            </div>
            <p className="mt-3 text-3xl font-bold tracking-tight">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="card-surface p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold">Recent Results</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr><th className="py-2">Subject</th><th>Marks</th><th>Grade</th></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {STUDENT_RESULTS.slice(0, 5).map((r) => (
                  <tr key={r.subject}>
                    <td className="py-2.5 font-medium">{r.subject}</td>
                    <td>{r.obtained} / {r.total}</td>
                    <td><span className="rounded-md bg-primary-soft px-2 py-0.5 text-xs font-semibold text-primary">{r.grade}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-surface p-6">
          <h2 className="text-lg font-semibold">Upcoming Assignments</h2>
          <ul className="mt-4 space-y-3">
            {ASSIGNMENTS.filter((a) => a.status === "Active").map((a) => {
              const d = daysUntil(a.due);
              return (
                <li key={a.id} className="rounded-lg border border-border p-3">
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.subject}</p>
                  <p className={`mt-1 text-xs font-semibold ${d <= 3 ? "text-destructive" : "text-primary"}`}>
                    Due in {d} day{d === 1 ? "" : "s"}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="card-surface mt-6 overflow-hidden">
        <div className="border-b border-border p-5">
          <h3 className="font-semibold">Available Notes & Materials</h3>
        </div>
        <ul className="divide-y divide-border">
          {UPLOADED_NOTES.map((n) => (
            <li key={n.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.subject} • {n.date}</p>
              </div>
              <button className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-sm font-medium hover:bg-muted">
                <Download className="h-4 w-4" /> Download
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
