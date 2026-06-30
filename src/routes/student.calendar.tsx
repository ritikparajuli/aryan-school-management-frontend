// src/routes/student.calendar.tsx
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { CALENDAR_EVENTS, EVENT_TYPE_COLOR } from "@/lib/mock-data";

export const Route = createFileRoute("/student/calendar")({
  head: () => ({ meta: [{ title: "College Calendar" }] }),
  component: StudentCalendar,
});

function StudentCalendar() {
  const sorted = [...CALENDAR_EVENTS].sort((a, b) => a.date.localeCompare(b.date));
  return (
    <>
      <PageHeader title="College Calendar" subtitle="Stay up to date with academic events." />
      <div className="card-surface overflow-hidden">
        <ul className="divide-y divide-border">
          {sorted.map((e) => (
            <li key={e.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-4">
              <DateBlock iso={e.date} />
              <div className="min-w-0">
                <p className="truncate font-medium">{e.title}</p>
                <p className="text-xs text-muted-foreground">{e.date}</p>
              </div>
              <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${EVENT_TYPE_COLOR[e.type]}`}>{e.type}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function DateBlock({ iso }: { iso: string }) {
  const d = new Date(iso);
  return (
    <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary-soft text-center">
      <div className="text-[10px] font-semibold uppercase text-primary">{d.toLocaleString("en-US", { month: "short" })}</div>
      <div className="-mt-0.5 text-lg font-bold leading-none text-primary">{d.getDate()}</div>
    </div>
  );
}
