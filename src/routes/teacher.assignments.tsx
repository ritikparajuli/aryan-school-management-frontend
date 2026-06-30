// src/routes/teacher.assignments.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { ASSIGNMENTS, SUBJECTS } from "@/lib/mock-data";

export const Route = createFileRoute("/teacher/assignments")({
  head: () => ({ meta: [{ title: "Upload Assignments" }] }),
  component: AssignmentsPage,
});

function AssignmentsPage() {
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <>
      <PageHeader title="Upload Assignments" subtitle="Create and publish assignments with due dates." />

      <form
        onSubmit={(e) => { e.preventDefault(); toast.success("Assignment published"); }}
        className="card-surface grid gap-4 p-6 lg:grid-cols-2"
      >
        <Field label="Subject Name">
          <select className={inputCls} defaultValue={SUBJECTS[0]}>
            {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Topic / Title">
          <input type="text" placeholder="e.g. Database Normalization" className={inputCls} />
        </Field>
        <Field label="Due Date">
          <input type="date" className={inputCls} />
        </Field>
        <Field label="Maximum Marks">
          <input type="number" min={1} defaultValue={20} className={inputCls} />
        </Field>
        <Field label="Description" className="lg:col-span-2">
          <textarea rows={3} placeholder="Instructions for the assignment" className={`${inputCls} h-auto py-2.5`} />
        </Field>

        <div className="lg:col-span-2">
          <label className="mb-1.5 block text-sm font-medium">Attachment</label>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 p-8 text-center hover:bg-muted/50">
            <UploadCloud className="h-8 w-8 text-primary" />
            <p className="mt-2 text-sm font-medium">{fileName ?? "Drag and drop or click to browse"}</p>
            <p className="text-xs text-muted-foreground">PDF, DOC, PPT — Max 25 MB</p>
            <input type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)} />
          </label>
        </div>

        <div className="lg:col-span-2 flex justify-end">
          <button type="submit" className="inline-flex h-11 items-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground hover:opacity-95">
            Upload Assignment
          </button>
        </div>
      </form>

      <div className="card-surface mt-6 overflow-hidden">
        <div className="border-b border-border p-5">
          <h3 className="font-semibold">All Assignments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Subject</th>
                <th className="px-5 py-3">Due Date</th>
                <th className="px-5 py-3">Marks</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ASSIGNMENTS.map((a) => (
                <tr key={a.id}>
                  <td className="px-5 py-3 font-medium">{a.title}</td>
                  <td className="px-5 py-3 text-muted-foreground">{a.subject}</td>
                  <td className="px-5 py-3 text-muted-foreground">{a.due}</td>
                  <td className="px-5 py-3">{a.marks}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      a.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"
                    }`}>{a.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const inputCls = "h-10 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30";

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}
