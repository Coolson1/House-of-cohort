import { ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-parchment">
      <header className="border-b border-ink/10 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-ink/70 hover:text-ink"
          >
            <ChevronLeft className="h-4 w-4" />
            House of Cohort
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}