// src/routes/student/messages.tsx
import { createFileRoute } from "@tanstack/react-router";
import { MessagePage } from "@/components/MessagePage";

export const Route = createFileRoute("/student/messages")({
  component: () => <MessagePage role="Student" userName="Aarav Sharma" />,
});