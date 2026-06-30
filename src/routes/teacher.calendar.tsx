// src/routes/teacher.calendar.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { CALENDAR_EVENTS, EVENT_TYPE_COLOR } from "@/lib/mock-data";

export const Route = createFileRoute("/teacher/calendar")({
  head: () => ({ meta: [{ title: "College Calendar" }] }),
  component: CalendarPage,
});

type EventType = "Holiday" | "Exam" | "Event" | "Deadline";
interface Evt { id: number; title: string; date: string; type: EventType; }

function CalendarPage() {
  const [cursor, setCursor] = useState(new Date(2026, 5, 1)); // June 2026
  const [events, setEvents] = useState<Evt[]>(CALENDAR_EVENTS as Evt[]);
  const [showForm, setShowForm] = useState(false);

  const monthLabel = cursor.toLocaleString("en-US", { month: "long", year: "numeric" });
  const cells = useMemo(() => buildMonth(cursor), [cursor]);

  const addEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const ev: Evt = {
      id: Date.now(),
      title: String(f.get("title")),
      date: String(f.get("date")),
      type: String(f.get("type")) as EventType,
    };
    setEvents((p) => [...p, ev]);
    setShowForm(false);
    toast.success("Event added");
  };

  return (
    <>
      <PageHeader
        title="College Calendar"
        subtitle="Holidays, exams, events and deadlines"
        actions={
          <button onClick={() => setShowForm((v) => !v)} className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground">
            <Plus className="h-4 w-4" /> Add Event
          </button>
        }
      />

      {showForm && (
        <form onSubmit={addEvent} className="card-surface mb-6 grid gap-3 p-5 sm:grid-cols-4">
          <input name="title" required placeholder="Event title" className={inputCls + " sm:col-span-2"} />
          <input name="date" type="date" required className={inputCls} />
          <select name="type" className={inputCls}>
            <option>Holiday</option><option>Exam</option><option>Event</option><option>Deadline</option>
          </select>
          <div className="sm:col-span-4 flex justify-end gap-2">
            <button type="button" onClick={() => setShowForm(false)} className="h-10 rounded-lg border border-border bg-card px-4 text-sm font-medium hover:bg-muted">Cancel</button>
            <button className="h-10 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground">Save</button>
          </div>
        </form>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="card-surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">{monthLabel}</h3>
            <div className="flex gap-1">
              <button onClick={() => setCursor((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))} className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-muted"><ChevronLeft className="h-4 w-4" /></button>
              <button onClick={() => setCursor((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))} className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-muted"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <div key={d} className="py-2">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((c, i) => {
              const dayEvents = events.filter((e) => e.date === c.iso);
              return (
                <div key={i} className={`min-h-20 rounded-lg border p-1.5 text-left ${c.inMonth ? "border-border bg-card" : "border-transparent bg-muted/30 text-muted-foreground"}`}>
                  <div className="text-xs font-semibold">{c.day}</div>
                  <div className="mt-1 space-y-0.5">
                    {dayEvents.slice(0, 2).map((e) => (
                      <div key={e.id} className={`truncate rounded px-1 py-0.5 text-[10px] font-medium border ${EVENT_TYPE_COLOR[e.type]}`}>
                        {e.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && <div className="text-[10px] text-muted-foreground">+{dayEvents.length - 2} more</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card-surface p-5">
          <h3 className="font-semibold">Upcoming Events</h3>
          <ul className="mt-4 space-y-3">
            {[...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 6).map((e) => (
              <li key={e.id} className="flex items-start gap-3">
                <div className={`mt-1 h-2.5 w-2.5 rounded-full ${EVENT_TYPE_COLOR[e.type].split(" ")[0]}`} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{e.title}</p>
                  <p className="text-xs text-muted-foreground">{e.date} • {e.type}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

const inputCls = "h-10 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30";

function buildMonth(cursor: Date) {
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1);
  const startDow = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: { day: number; inMonth: boolean; iso: string }[] = [];
  // leading
  const prevDays = new Date(year, month, 0).getDate();
  for (let i = startDow - 1; i >= 0; i--) {
    const d = prevDays - i;
    cells.push({ day: d, inMonth: false, iso: iso(year, month - 1, d) });
  }
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, inMonth: true, iso: iso(year, month, d) });
  while (cells.length % 7 !== 0) {
    const d = cells.length - daysInMonth - startDow + 1;
    cells.push({ day: d, inMonth: false, iso: iso(year, month + 1, d) });
  }
  return cells;
}
function iso(y: number, m: number, d: number) {
  const dt = new Date(y, m, d);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
}
