import { NextResponse } from "next/server";

// Full Monime-backed handler is implemented in Phase 6. For Phase 5 the
// checkout form posts here so the UI is fully wired, but actual order
// creation + payment session creation is deferred.
export async function POST() {
  return NextResponse.json(
    { error: "Checkout is coming soon — payments wiring is in progress." },
    { status: 501 },
  );
}
