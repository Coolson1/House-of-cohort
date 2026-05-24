"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { categoryDescriptions } from "@/lib/quiz-logic";
import type { QuizAnswer, FragranceCategory } from "@/lib/quiz-logic";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
};

export function QuizResult({ answers, userId }: { answers: QuizAnswer[]; userId: string }) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [categories, setCategories] = useState<FragranceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        console.log('Fetching recommendations for answers:', answers, 'and userId:', userId);
        const res = await fetch("/api/find-your-scent/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers, userId }),
        });
        console.log('API response status:', res.status);
        const data = await res.json();
        console.log('API response data:', data);
        if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch recommendations');
        }
        setRecommendations(data.products || []);
        setCategories(data.categories || []);
      } catch (e) {
        console.error('Quiz recommendation error:', e);
        setError(e instanceof Error ? e.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchRecommendations();
  }, [answers, userId]);

  const primaryCategory = categories[0];
  const description = primaryCategory ? categoryDescriptions[primaryCategory] : null;

  return (
    <div className="bg-parchment pb-32">
      <header className="border-b border-ink/10 bg-parchment-soft pb-10 pt-10 sm:pt-12 sm:pb-12 lg:pt-24 lg:pb-12">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-[9px] uppercase tracking-[0.45em] text-brand-gold sm:text-[10px] sm:tracking-[0.5em]"
          >
            Your olfactory identity
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 font-display text-[clamp(2.6rem,6vw,4.8rem)] font-light leading-[0.95] tracking-[-0.015em] text-ink"
          >
            You belong to the world of{" "}
            <em className="italic text-brand-gold">{description?.title || "Fragrance"}</em>
          </motion.h1>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-4 font-serif text-base leading-relaxed text-ink/70 sm:mt-6 sm:max-w-2xl sm:text-lg"
            >
              {description.description}
            </motion.p>
          )}
        </div>
      </header>

      <div className="mx-auto mt-12 max-w-[1200px] px-5 sm:mt-16 sm:px-8 lg:px-12">
        {loading ? (
          <div className="flex flex-col items-center py-16 text-center sm:py-24">
            <p className="font-display text-xl italic text-ink/65 sm:text-2xl">Curating your selection...</p>
          </div>
        ) : (
          <>
            {error && (
              <div className="flex flex-col items-center py-16 text-center text-destructive sm:py-24">
                <p className="font-display text-xl italic sm:text-2xl">{error}</p>
              </div>
            )}
            {!error && recommendations.length > 0 && (
              <div className="space-y-12 sm:space-y-14 md:space-y-16">
                <div className="flex items-center gap-2 sm:gap-3">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-brand-gold sm:text-[10px] sm:tracking-[0.4em]">
                    Recommended for you
                  </p>
                  <span className="inline-block h-px flex-1 bg-ink/15" />
                </div>
                 <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
                  {recommendations.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Link href={`/products/${product.slug}`} className="group block">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-parchment-deep">
                          {product.images?.[0] && (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover transition-transform duration-[1100ms] group-hover:scale-105"
                            />
                          )}
                        </div>
                        <div className="mt-4">
                          <h3 className="font-display text-lg text-ink transition-colors group-hover:text-brand-gold sm:text-xl">
                            {product.name}
                          </h3>
                          {product.description && (
                            <p className="mt-2 font-serif text-sm text-ink/65 line-clamp-2">
                              {product.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            {!error && recommendations.length === 0 && (
              <div className="flex flex-col items-center py-16 text-center sm:py-24">
                <p className="font-display text-xl italic text-ink/65 sm:text-2xl">
                  No perfumes found for your category. Please try again or explore our collections.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}