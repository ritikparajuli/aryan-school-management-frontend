// src/routes/student.attendance.tsx
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/student/attendance")({
  head: () => ({ meta: [{ title: "My Attendance" }] }),
  component: AttendancePage,
});

// Build a fixed month (June 2026) with attendance mock pattern
function buildMonth() {
  const year = 2026, month = 5; // June
  const first = new Date(year, month, 1);
  const startDow = first.getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells: { day: number | null; status: "present" | "absent" | "holiday" | "none" }[] = [];
  for (let i = 0; i < startDow; i++) cells.push({ day: null, status: "none" });
  for (let d = 1; d <= days; d++) {
    const dow = new Date(year, month, d).getDay();
    let status: "present" | "absent" | "holiday";
    if (dow === 0) status = "holiday";
    else if (d % 7 === 3) status = "absent";
    else status = "present";
    cells.push({ day: d, status });
  }
  return cells;
}

function AttendancePage() {
  const cells = buildMonth();
  const present = cells.filter((c) => c.status === "present").length;
  const absent = cells.filter((c) => c.status === "absent").length;
  const total = present + absent;
  const pct = Math.round((present / total) * 100);

  const weekly = [
    { week: "Wk 1", attendance: 92 },
    { week: "Wk 2", attendance: 85 },
    { week: "Wk 3", attendance: 78 },
    { week: "Wk 4", attendance: 95 },
  ];

  const stats = [
    { label: "Total Classes", value: total, color: "text-foreground" },
    { label: "Present", value: present, color: "text-emerald-600" },
    { label: "Absent", value: absent, color: "text-rose-600" },
    { label: "Attendance %", value: `${pct}%`, color: "text-primary" },
  ];

  return (
    <>
      <PageHeader title="My Attendance" subtitle="June 2026" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card-surface p-5">
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className={`mt-2 text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="card-surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Daily View</h3>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <Legend color="bg-emerald-500" label="Present" />
              <Legend color="bg-rose-500" label="Absent" />
              <Legend color="bg-muted-foreground/40" label="Holiday" />
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <div key={d} className="py-2">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((c, i) => (
              <div key={i} className="aspect-square rounded-lg border border-border bg-card p-1.5 text-left">
                {c.day && (
                  <>
                    <div className="text-xs font-semibold">{c.day}</div>
                    <div className="mt-1 flex justify-center">
                      <span className={`h-2 w-2 rounded-full ${
                        c.status === "present" ? "bg-emerald-500" :
                        c.status === "absent" ? "bg-rose-500" :
                        "bg-muted-foreground/40"
                      }`} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="card-surface p-5">
          <h3 className="font-semibold">Weekly Attendance</h3>
          <p className="text-sm text-muted-foreground">Last 4 weeks</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekly}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="week" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="attendance" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      <span>{label}</span>
    </div>
  );
}
