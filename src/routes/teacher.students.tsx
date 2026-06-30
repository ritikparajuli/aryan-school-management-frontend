// src/routes/teacher.students.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { STUDENTS } from "@/lib/mock-data";

export const Route = createFileRoute("/teacher/students")({
  head: () => ({ meta: [{ title: "Student List" }] }),
  component: StudentsPage,
});

function StudentsPage() {
  const [q, setQ] = useState("");
  const filtered = STUDENTS.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()) || s.roll.includes(q));

  return (
    <>
      <PageHeader title="Student List" subtitle={`${STUDENTS.length} enrolled students`} />

      <div className="card-surface mb-4 p-4">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or roll number"
            className="h-10 w-full rounded-lg border border-input bg-card pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
          />
        </div>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Student</th>
                <th className="px-5 py-3">Roll No.</th>
                <th className="px-5 py-3">Class</th>
                <th className="px-5 py-3">Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((s, i) => {
                const att = 75 + ((i * 7) % 25);
                return (
                  <tr key={s.id}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                          {s.name.split(" ").map((w) => w[0]).join("")}
                        </div>
                        <span className="font-medium">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{s.roll}</td>
                    <td className="px-5 py-3 text-muted-foreground">{s.class}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${att}%` }} />
                        </div>
                        <span className="text-xs font-medium">{att}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
