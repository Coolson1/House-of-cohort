import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateScores, getTopCategories } from "@/lib/quiz-logic";
import type { QuizAnswer } from "@/lib/quiz-logic";

export async function POST(request: NextRequest) {
  try {
    const { answers } = (await request.json()) as { answers: QuizAnswer[] };

    const scores = calculateScores(answers);
    const topCategories = getTopCategories(scores, 3);
    const primaryCategory = topCategories[0];

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        category: {
          name: primaryCategory,
        },
      },
      include: {
        category: true,
        variants: true,
      },
      take: 6,
    });

    return NextResponse.json({
      products: products.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        images: p.images,
      })),
      categories: topCategories,
    });
  } catch (error) {
    console.error("Quiz recommendation error:", error);
    return NextResponse.json(
      { error: "Failed to fetch recommendations" },
      { status: 500 }
    );
  }
}