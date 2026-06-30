// src/routes/teacher.attendance.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { CLASSES, STUDENTS, SUBJECTS } from "@/lib/mock-data";

export const Route = createFileRoute("/teacher/attendance")({
  head: () => ({ meta: [{ title: "Take Attendance" }] }),
  component: AttendancePage,
});

function AttendancePage() {
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [klass, setKlass] = useState(CLASSES[0]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState<Record<string, "present" | "absent" | null>>(
    Object.fromEntries(STUDENTS.map((s) => [s.id, null]))
  );

  const marked = useMemo(() => Object.values(status).filter((v) => v !== null).length, [status]);
  const total = STUDENTS.length;
  const progress = (marked / total) * 100;

  const setAll = (v: "present" | "absent") =>
    setStatus(Object.fromEntries(STUDENTS.map((s) => [s.id, v])));

  const submit = () => {
    if (marked < total) {
      toast.warning(`${total - marked} students still unmarked`);
      return;
    }
    toast.success(`Attendance submitted for ${klass} — ${subject}`);
  };

  return (
    <>
      <PageHeader title={`Take Attendance — ${subject}`} subtitle={`${klass} • ${date}`} />

      <div className="card-surface p-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Subject">
            <select value={subject} onChange={(e) => setSubject(e.target.value)} className={inputCls}>
              {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Class">
            <select value={klass} onChange={(e) => setKlass(e.target.value)} className={inputCls}>
              {CLASSES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Date">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
          </Field>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button onClick={() => setAll("present")} className={btnSecondary}>Mark All Present</button>
          <button onClick={() => setAll("absent")} className={btnSecondary}>Mark All Absent</button>
          <div className="ml-auto text-sm text-muted-foreground">
            {marked}/{total} marked
          </div>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="card-surface mt-6 overflow-hidden">
        <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border p-4">
          <h3 className="font-semibold">Students</h3>
          <span className="text-sm text-muted-foreground">Tap to mark</span>
        </div>
        <ul className="divide-y divide-border">
          {STUDENTS.map((s) => {
            const v = status[s.id];
            return (
              <li key={s.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground text-sm font-semibold">
                    {s.name.split(" ").map((w) => w[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{s.name}</p>
                    <p className="text-xs text-muted-foreground">Roll {s.roll}</p>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <PillButton active={v === "present"} variant="present" onClick={() => setStatus((p) => ({ ...p, [s.id]: "present" }))}>
                    Present
                  </PillButton>
                  <PillButton active={v === "absent"} variant="absent" onClick={() => setStatus((p) => ({ ...p, [s.id]: "absent" }))}>
                    Absent
                  </PillButton>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={submit} className="inline-flex h-11 items-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95">
          Submit Attendance
        </button>
      </div>
    </>
  );
}

const inputCls = "h-10 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30";
const btnSecondary = "inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 text-sm font-medium hover:bg-muted";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}

function PillButton({
  active, variant, onClick, children,
}: {
  active: boolean;
  variant: "present" | "absent";
  onClick: () => void;
  children: React.ReactNode;
}) {
  const base = "rounded-full px-3 py-1.5 text-xs font-semibold transition border";
  if (active && variant === "present") return <button onClick={onClick} className={`${base} bg-success text-success-foreground border-transparent`}>{children}</button>;
  if (active && variant === "absent") return <button onClick={onClick} className={`${base} bg-destructive text-destructive-foreground border-transparent`}>{children}</button>;
  return <button onClick={onClick} className={`${base} bg-card text-muted-foreground hover:bg-muted`}>{children}</button>;
}
