import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { QuizFlow } from "@/components/quiz/QuizFlow";

export default async function FindYourScentPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/dashboard/find-your-scent");
  }

  return <QuizFlow userId={session.user.id} />;
}