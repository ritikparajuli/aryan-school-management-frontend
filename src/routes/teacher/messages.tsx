// src/routes/teacher/messages.tsx
import { createFileRoute } from "@tanstack/react-router";
import { MessagePage } from "@/components/MessagePage";

export const Route = createFileRoute("/teacher/messages")({
  component: () => <MessagePage role="Teacher" userName="Dr. Priya Menon" />,
});