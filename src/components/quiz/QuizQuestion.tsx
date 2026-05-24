"use client";

import { motion } from "motion/react";
import { questions } from "@/lib/quiz-logic";
import { Button } from "@/components/ui/button";
import { RevealItem, RevealStagger } from "@/components/motion/RevealStagger";

export function QuizQuestion({
  questionId,
  onSelect,
}: {
  questionId: number;
  onSelect: (value: string) => void;
}) {
  const question = questions.find((q) => q.id === questionId);
  if (!question) return null;

  return (
    <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold">
          Question {questionId} of {questions.length}
        </span>
      </motion.div>

       <RevealItem>
         <h2 className="font-display text-[clamp(2rem,5vw,3.2rem)] font-light leading-tight text-ink">
           {question.question}
         </h2>
       </RevealItem>

      <RevealStagger className="mt-12 grid gap-4 sm:grid-cols-2" stagger={0.1}>
        {question.options.map((option) => (
          <motion.div
            key={option.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="goldOutline"
              size="xl"
              onClick={() => onSelect(option.value)}
              className="w-full justify-start px-8 py-6 text-left transition-all duration-500 hover:bg-brand-gold hover:text-ink"
            >
              <span className="font-display text-lg">{option.label}</span>
            </Button>
          </motion.div>
        ))}
      </RevealStagger>
    </div>
  );
}