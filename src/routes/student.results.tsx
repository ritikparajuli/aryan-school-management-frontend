// src/routes/student.results.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { STUDENT_RESULTS } from "@/lib/mock-data";

export const Route = createFileRoute("/student/results")({
  head: () => ({ meta: [{ title: "My Results" }] }),
  component: ResultsPage,
});

function ResultsPage() {
  const [semester, setSemester] = useState("Semester 5");
  const totalObtained = STUDENT_RESULTS.reduce((s, r) => s + r.obtained, 0);
  const totalMax = STUDENT_RESULTS.reduce((s, r) => s + r.total, 0);
  const pct = (totalObtained / totalMax) * 100;
  const cgpa = (pct / 10).toFixed(2);

  return (
    <>
      <PageHeader
        title="My Results"
        subtitle={semester}
        actions={
          <button onClick={() => toast.success("Result sheet downloaded")} className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground">
            <Download className="h-4 w-4" /> Download PDF
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="card-surface overflow-hidden">
          <div className="flex items-center justify-between border-b border-border p-5">
            <h3 className="font-semibold">Subjects</h3>
            <select value={semester} onChange={(e) => setSemester(e.target.value)} className="h-9 rounded-lg border border-input bg-card px-3 text-sm">
              {["Semester 3", "Semester 4", "Semester 5"].map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-5 py-3">Subject</th>
                  <th className="px-5 py-3">Obtained</th>
                  <th className="px-5 py-3">Total</th>
                  <th className="px-5 py-3">Grade</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {STUDENT_RESULTS.map((r) => {
                  const pass = r.obtained / r.total >= 0.4;
                  return (
                    <tr key={r.subject}>
                      <td className="px-5 py-3 font-medium">{r.subject}</td>
                      <td className="px-5 py-3">{r.obtained}</td>
                      <td className="px-5 py-3 text-muted-foreground">{r.total}</td>
                      <td className="px-5 py-3"><span className="rounded-md bg-primary-soft px-2 py-0.5 text-xs font-semibold text-primary">{r.grade}</span></td>
                      <td className="px-5 py-3">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${pass ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                          {pass ? "Pass" : "Fail"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-surface flex flex-col items-center justify-center p-8 text-center">
          <p className="text-sm font-medium text-muted-foreground">Overall CGPA</p>
          <div className="relative my-4 grid h-36 w-36 place-items-center rounded-full bg-primary-soft">
            <div className="absolute inset-2 rounded-full bg-card grid place-items-center">
              <span className="text-4xl font-bold text-primary">{cgpa}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Total {totalObtained} / {totalMax} ({pct.toFixed(1)}%)</p>
        </div>
      </div>
    </>
  );
}
