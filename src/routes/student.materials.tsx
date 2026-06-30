// src/routes/student.materials.tsx
import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText, ClipboardList } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ASSIGNMENTS, UPLOADED_NOTES } from "@/lib/mock-data";

export const Route = createFileRoute("/student/materials")({
  head: () => ({ meta: [{ title: "Notes & Assignments" }] }),
  component: MaterialsPage,
});

function MaterialsPage() {
  return (
    <>
      <PageHeader title="Notes & Assignments" subtitle="Download study material and submit assignments." />

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Notes" icon={FileText}>
          {UPLOADED_NOTES.map((n) => (
            <li key={n.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.subject} • {n.date}</p>
              </div>
              <button className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-muted"><Download className="h-4 w-4" /></button>
            </li>
          ))}
        </Section>

        <Section title="Assignments" icon={ClipboardList}>
          {ASSIGNMENTS.map((a) => (
            <li key={a.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.subject} • Due {a.due}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                a.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"
              }`}>{a.status}</span>
            </li>
          ))}
        </Section>
      </div>
    </>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div className="card-surface overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border p-5">
        <Icon className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <ul className="divide-y divide-border">{children}</ul>
    </div>
  );
}
