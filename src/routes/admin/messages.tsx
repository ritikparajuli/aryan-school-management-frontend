// src/routes/admin/messages.tsx
import { createFileRoute } from "@tanstack/react-router";
import { MessagePage } from "@/components/MessagePage";

export const Route = createFileRoute("/admin/messages")({
  component: () => <MessagePage role="Admin" userName="Admin" />,
});