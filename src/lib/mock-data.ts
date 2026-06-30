// src/lib/mock-data.ts
export const COLLEGE_NAME = "Aryan College";

export const SUBJECTS = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "English Literature",
  "Economics",
];

export const CLASSES = ["CS-101", "CS-201", "CS-301", "MATH-201", "PHY-101"];

export const STUDENTS = [
  { id: "S001", name: "Aarav Sharma", roll: "2023001", class: "CS-301" },
  { id: "S002", name: "Diya Patel", roll: "2023002", class: "CS-301" },
  { id: "S003", name: "Rohan Mehta", roll: "2023003", class: "CS-301" },
  { id: "S004", name: "Isha Verma", roll: "2023004", class: "CS-301" },
  { id: "S005", name: "Kabir Singh", roll: "2023005", class: "CS-301" },
  { id: "S006", name: "Ananya Iyer", roll: "2023006", class: "CS-301" },
  { id: "S007", name: "Vivaan Khanna", roll: "2023007", class: "CS-301" },
  { id: "S008", name: "Saanvi Reddy", roll: "2023008", class: "CS-301" },
  { id: "S009", name: "Arjun Nair", roll: "2023009", class: "CS-301" },
  { id: "S010", name: "Myra Kapoor", roll: "2023010", class: "CS-301" },
];

export const RECENT_ACTIVITY = [
  { id: 1, text: "Uploaded notes for Operating Systems — Ch. 4", time: "12 min ago" },
  { id: 2, text: "Marked attendance for CS-301 (28/30 present)", time: "2 hours ago" },
  { id: 3, text: "Published midterm results for Mathematics", time: "Yesterday" },
  { id: 4, text: "Created new assignment: DBMS Normalization", time: "2 days ago" },
];

export const UPLOADED_NOTES = [
  { id: 1, title: "Operating Systems — Process Scheduling", subject: "Computer Science", date: "2026-06-21", size: "1.2 MB" },
  { id: 2, title: "Linear Algebra — Eigenvalues", subject: "Mathematics", date: "2026-06-18", size: "820 KB" },
  { id: 3, title: "Thermodynamics Notes", subject: "Physics", date: "2026-06-15", size: "2.1 MB" },
];

export const ASSIGNMENTS = [
  { id: 1, title: "DBMS Normalization", subject: "Computer Science", due: "2026-07-02", status: "Active", marks: 20 },
  { id: 2, title: "Calculus Problem Set 3", subject: "Mathematics", due: "2026-06-30", status: "Active", marks: 25 },
  { id: 3, title: "Essay: Shakespeare", subject: "English Literature", due: "2026-06-10", status: "Expired", marks: 15 },
];

export const STUDENT_RESULTS = [
  { subject: "Computer Science", obtained: 86, total: 100, grade: "A" },
  { subject: "Mathematics", obtained: 74, total: 100, grade: "B+" },
  { subject: "Physics", obtained: 91, total: 100, grade: "A+" },
  { subject: "Chemistry", obtained: 68, total: 100, grade: "B" },
  { subject: "English Literature", obtained: 79, total: 100, grade: "A-" },
  { subject: "Economics", obtained: 55, total: 100, grade: "C" },
];

export const CALENDAR_EVENTS = [
  { id: 1, title: "Mid-term Exams Begin", date: "2026-07-05", type: "Exam" },
  { id: 2, title: "Independence Day Holiday", date: "2026-07-04", type: "Holiday" },
  { id: 3, title: "Tech Fest 2026", date: "2026-07-12", type: "Event" },
  { id: 4, title: "Assignment Submission Deadline", date: "2026-06-30", type: "Deadline" },
  { id: 5, title: "Guest Lecture: AI in Healthcare", date: "2026-06-28", type: "Event" },
];

export const EVENT_TYPE_COLOR: Record<string, string> = {
  Holiday: "bg-rose-100 text-rose-700 border-rose-200",
  Exam: "bg-amber-100 text-amber-700 border-amber-200",
  Event: "bg-blue-100 text-blue-700 border-blue-200",
  Deadline: "bg-violet-100 text-violet-700 border-violet-200",
};

export function gradeFor(obtained: number, total: number): string {
  const p = (obtained / total) * 100;
  if (p >= 90) return "A+";
  if (p >= 80) return "A";
  if (p >= 75) return "A-";
  if (p >= 70) return "B+";
  if (p >= 60) return "B";
  if (p >= 50) return "C";
  if (p >= 40) return "D";
  return "F";
}
