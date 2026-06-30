// src/components/Footer.tsx
import { COLLEGE_NAME } from "@/lib/mock-data";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card px-6 py-4 text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} {COLLEGE_NAME}. All rights reserved.
    </footer>
  );
}
