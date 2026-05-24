export type QuizAnswer = {
  questionId: number;
  answer: string;
};

export type FragranceCategory =
  | "Citrus & Fresh"
  | "Floral"
  | "Gourmand"
  | "Musk"
  | "Oriental & Amber"
  | "Oud"
  | "Woody";

export type Question = {
  id: number;
  question: string;
  options: { label: string; value: string; category: FragranceCategory }[];
};

export const questions: Question[] = [
  {
    id: 1,
    question: "What energy describes you best?",
    options: [
      { label: "Bright & Energetic", value: "bright-energetic", category: "Citrus & Fresh" },
      { label: "Soft & Romantic", value: "soft-romantic", category: "Floral" },
      { label: "Warm & Seductive", value: "warm-seductive", category: "Oriental & Amber" },
      { label: "Deep & Mysterious", value: "deep-mysterious", category: "Oud" },
    ],
  },
  {
    id: 2,
    question: "Choose your ideal atmosphere",
    options: [
      { label: "Ocean breeze at sunrise", value: "ocean-sunrise", category: "Citrus & Fresh" },
      { label: "Candlelit dinner", value: "candlelit-dinner", category: "Gourmand" },
      { label: "Luxury hotel lobby", value: "hotel-lobby", category: "Oriental & Amber" },
      { label: "Rainy midnight drive", value: "midnight-drive", category: "Woody" },
    ],
  },
  {
    id: 3,
    question: "What type of presence do you leave behind?",
    options: [
      { label: "Clean & refreshing", value: "clean-refreshing", category: "Citrus & Fresh" },
      { label: "Sweet & addictive", value: "sweet-addictive", category: "Gourmand" },
      { label: "Bold & unforgettable", value: "bold-unforgettable", category: "Oud" },
      { label: "Elegant & sensual", value: "elegant-sensual", category: "Musk" },
    ],
  },
  {
    id: 4,
    question: "What season feels most like you?",
    options: [
      { label: "Summer", value: "summer", category: "Citrus & Fresh" },
      { label: "Spring", value: "spring", category: "Floral" },
      { label: "Autumn", value: "autumn", category: "Woody" },
      { label: "Winter", value: "winter", category: "Oud" },
    ],
  },
];

export function calculateScores(answers: QuizAnswer[]): Record<FragranceCategory, number> {
  const scores: Record<FragranceCategory, number> = {
    "Citrus & Fresh": 0,
    Floral: 0,
    Gourmand: 0,
    Musk: 0,
    "Oriental & Amber": 0,
    Oud: 0,
    Woody: 0,
  };

  for (const answer of answers) {
    const question = questions.find((q) => q.id === answer.questionId);
    if (question) {
      const option = question.options.find((o) => o.value === answer.answer);
      if (option) {
        scores[option.category] += 1;
      }
    }
  }

  return scores;
}

export function getTopCategories(
  scores: Record<FragranceCategory, number>,
  count: number = 3
): FragranceCategory[] {
  const maxScore = Math.max(...Object.values(scores));
  const tiedCategories = Object.entries(scores)
    .filter(([, score]) => score === maxScore && score > 0)
    .map(([category]) => category as FragranceCategory);

  if (tiedCategories.length > 0) {
    return tiedCategories.slice(0, count);
  }

  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([category]) => category as FragranceCategory);
}

export const categoryDescriptions: Record<FragranceCategory, { title: string; description: string }> = {
  "Citrus & Fresh": {
    title: "Citrus & Fresh",
    description: "Radiant, luminous, and invigorating. You embody the essence of brightness and vitality.",
  },
  Floral: {
    title: "Floral",
    description: "Romantic, graceful, and enchanting. Your presence carries the delicate beauty of blossoming flowers.",
  },
  Gourmand: {
    title: "Gourmand",
    description: "Sweet, indulgent, and irresistibly captivating. You leave a trail of delicious warmth.",
  },
  Musk: {
    title: "Musk",
    description: "Sensual, intimate, and profoundly elegant. Your aura exudes quiet confidence.",
  },
  "Oriental & Amber": {
    title: "Oriental & Amber",
    description: "Warm, opulent, and seductively rich. You radiate sophistication and depth.",
  },
  Oud: {
    title: "Oud",
    description: "Dark, magnetic, and unforgettable. Your essence commands attention and reverence.",
  },
  Woody: {
    title: "Woody",
    description: "Earthy, refined, and grounded. You carry the strength of ancient forests.",
  },
};