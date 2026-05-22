import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) redirect("/auth/signin?callbackUrl=/admin");
  if (session.user.role === "CUSTOMER") redirect("/");

  return (
    <div className="min-h-screen bg-brand-white">
      <AdminSidebar
        role={session.user.role}
        userEmail={session.user.email ?? ""}
      />
      <main className="lg:pl-64 min-h-screen">
        <div className="px-4 sm:px-6 py-6 sm:py-8 lg:px-10 lg:py-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
