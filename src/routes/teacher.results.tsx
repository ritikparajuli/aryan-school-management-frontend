// src/routes/teacher.results.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UploadCloud, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { CLASSES, STUDENTS, SUBJECTS, gradeFor } from "@/lib/mock-data";

export const Route = createFileRoute("/teacher/results")({
  head: () => ({ meta: [{ title: "Add Results" }] }),
  component: ResultsPage,
});

interface ResultRow { id: number; name: string; obtained: number; total: number; grade: string; }

function ResultsPage() {
  const [rows, setRows] = useState<ResultRow[]>([]);
  const [student, setStudent] = useState(STUDENTS[0].name);
  const [obtained, setObtained] = useState(85);
  const [total, setTotal] = useState(100);

  const addRow = () => {
    if (obtained > total) return toast.error("Marks cannot exceed total");
    setRows((r) => [...r, { id: Date.now(), name: student, obtained, total, grade: gradeFor(obtained, total) }]);
  };

  return (
    <>
      <PageHeader title="Add Results" subtitle="Enter results in bulk or one at a time." />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-surface p-6">
          <h3 className="font-semibold">Bulk Upload</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Field label="Class">
              <select className={inputCls}>{CLASSES.map((c) => <option key={c}>{c}</option>)}</select>
            </Field>
            <Field label="Subject">
              <select className={inputCls}>{SUBJECTS.map((s) => <option key={s}>{s}</option>)}</select>
            </Field>
            <Field label="Exam Type">
              <select className={inputCls}>
                <option>Midterm</option><option>Final</option><option>Quiz</option>
              </select>
            </Field>
          </div>
          <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 p-8 text-center hover:bg-muted/50">
            <UploadCloud className="h-8 w-8 text-primary" />
            <p className="mt-2 text-sm font-medium">Upload Excel / CSV</p>
            <p className="text-xs text-muted-foreground">.xlsx, .csv</p>
            <input type="file" className="hidden" accept=".csv,.xlsx" onChange={() => toast.success("File parsed — 30 rows ready")} />
          </label>
        </div>

        <div className="card-surface p-6">
          <h3 className="font-semibold">Manual Entry</h3>
          <div className="mt-4 space-y-3">
            <Field label="Student">
              <select value={student} onChange={(e) => setStudent(e.target.value)} className={inputCls}>
                {STUDENTS.map((s) => <option key={s.id}>{s.name}</option>)}
              </select>
            </Field>
            <div className="grid grid-cols-3 gap-3">
              <Field label="Obtained">
                <input type="number" value={obtained} onChange={(e) => setObtained(+e.target.value)} className={inputCls} />
              </Field>
              <Field label="Total">
                <input type="number" value={total} onChange={(e) => setTotal(+e.target.value)} className={inputCls} />
              </Field>
              <Field label="Grade">
                <input value={gradeFor(obtained, total)} readOnly className={`${inputCls} bg-muted font-semibold`} />
              </Field>
            </div>
            <button onClick={addRow} className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-primary bg-card text-sm font-semibold text-primary hover:bg-primary-soft">
              Add Result
            </button>
          </div>
        </div>
      </div>

      <div className="card-surface mt-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h3 className="font-semibold">Preview ({rows.length})</h3>
          <button
            disabled={!rows.length}
            onClick={() => { toast.success(`Saved ${rows.length} results`); setRows([]); }}
            className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            Save All Results
          </button>
        </div>
        {rows.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">No results added yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Student</th>
                <th className="px-5 py-3">Marks</th>
                <th className="px-5 py-3">Grade</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="px-5 py-3 font-medium">{r.name}</td>
                  <td className="px-5 py-3">{r.obtained} / {r.total}</td>
                  <td className="px-5 py-3"><span className="rounded-md bg-primary-soft px-2 py-0.5 text-xs font-semibold text-primary">{r.grade}</span></td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => setRows((rs) => rs.filter((x) => x.id !== r.id))} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

const inputCls = "h-10 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (<div><label className="mb-1.5 block text-sm font-medium">{label}</label>{children}</div>);
}
