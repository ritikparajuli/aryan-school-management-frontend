// src/routes/teacher.notes.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, FileText, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { SUBJECTS, UPLOADED_NOTES } from "@/lib/mock-data";

export const Route = createFileRoute("/teacher/notes")({
  head: () => ({ meta: [{ title: "Upload Notes" }] }),
  component: NotesPage,
});

function NotesPage() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName) return toast.error("Please attach a file");
    toast.success("Note uploaded successfully");
    setFileName(null);
  };

  return (
    <>
      <PageHeader title="Upload Notes" subtitle="Share lecture notes and reference material with your class." />

      <form onSubmit={submit} className="card-surface grid gap-4 p-6 lg:grid-cols-2">
        <Field label="Subject Name">
          <select className={inputCls} defaultValue={SUBJECTS[0]}>
            {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Upload Date">
          <input type="date" defaultValue={new Date().toISOString().slice(0, 10)} className={inputCls} />
        </Field>
        <Field label="Topic / Title" className="lg:col-span-2">
          <input type="text" placeholder="e.g. Process Scheduling Algorithms" className={inputCls} />
        </Field>
        <Field label="Description" className="lg:col-span-2">
          <textarea rows={3} placeholder="Brief description of the material" className={`${inputCls} h-auto py-2.5`} />
        </Field>

        <div className="lg:col-span-2">
          <label className="mb-1.5 block text-sm font-medium">Attachment (PDF, DOC, PPT)</label>
          <label
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const f = e.dataTransfer.files?.[0];
              if (f) setFileName(f.name);
            }}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition ${
              dragging ? "border-primary bg-primary-soft" : "border-border bg-muted/30 hover:bg-muted/50"
            }`}
          >
            <UploadCloud className="h-8 w-8 text-primary" />
            <p className="mt-2 text-sm font-medium">
              {fileName ?? "Drag and drop or click to browse"}
            </p>
            <p className="text-xs text-muted-foreground">Max 25 MB</p>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx"
              className="hidden"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
            />
          </label>
        </div>

        <div className="lg:col-span-2 flex justify-end">
          <button type="submit" className="inline-flex h-11 items-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground hover:opacity-95">
            Upload Note
          </button>
        </div>
      </form>

      <div className="card-surface mt-6 overflow-hidden">
        <div className="border-b border-border p-5">
          <h3 className="font-semibold">Previously Uploaded</h3>
          <p className="text-sm text-muted-foreground">Recent notes shared with students</p>
        </div>
        <ul className="divide-y divide-border">
          {UPLOADED_NOTES.map((n) => (
            <li key={n.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-4">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary-soft text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.subject} • {n.date} • {n.size}</p>
              </div>
              <button className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-muted">
                <Download className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
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
