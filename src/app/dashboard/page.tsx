import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="flex min-h-[calc(100vh-60px)] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display text-4xl font-light text-ink sm:text-5xl">
          Welcome to Your
          <br />
          <em className="italic text-brand-gold">Dashboard</em>
        </h1>
        <p className="mt-6 font-serif text-lg text-ink/70">
          Discover your signature scent through our Find Your Scent quiz.
        </p>
        <div className="mt-10">
          <Link href="/dashboard/find-your-scent">
            <Button variant="gold" size="xl">
              Take the Find Your Scent Quiz
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}