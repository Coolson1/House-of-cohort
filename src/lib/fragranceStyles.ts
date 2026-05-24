// Fragrance category hover animations utility

export type FragranceCategory = 
  | "oud" 
  | "floral" 
  | "woody" 
  | "citrus-fresh" 
  | "oriental-amber" 
  | "gourmand" 
  | "musk"
  | null
  | undefined;

/**
 * Returns Tailwind classes for fragrance category-specific hover effects
 */
export function getFragranceHoverClasses(categorySlug: string | null | undefined): string {
  const base = "transition-all duration-500 ease-out will-change-transform";
  
  if (!categorySlug) {
    // Neutral fallback
    return `${base} group-hover:scale-[1.04] group-hover:shadow-[0_0_40px_rgba(201,168,76,0.3)]`;
  }

  switch (categorySlug) {
    case "oud":
      // Dark luxury glow, gold shadow, slow scale-up, smoky overlay
      return `${base} group-hover:scale-[1.05] group-hover:shadow-[0_0_50px_rgba(201,168,76,0.4)] group-hover:-rotate-1`;
    case "floral":
      // Soft float, pastel glow, gentle upward movement
      return `${base} group-hover:scale-[1.04] group-hover:-translate-y-1 group-hover:shadow-[0_0_35px_rgba(184,133,122,0.4)]`;
    case "woody":
      // Earthy shadow, warm brown gradient feel
      return `${base} group-hover:scale-[1.05] group-hover:shadow-[0_0_40px_rgba(92,107,88,0.4)]`;
    case "citrus-fresh":
      // Bright glow, fast clean hover, slight shine/ripple effect
      return `${base} group-hover:scale-[1.06] group-hover:shadow-[0_0_45px_rgba(255,199,66,0.5)]`;
    case "oriental-amber":
      // Warm amber glow, cinematic fade, soft rotate effect
      return `${base} group-hover:scale-[1.05] group-hover:rotate-1 group-hover:shadow-[0_0_40px_rgba(184,133,122,0.5)]`;
    case "gourmand":
      // Warm creamy glow, soft bounce animation
      return `${base} group-hover:scale-[1.04] group-hover:-translate-y-0.5 group-hover:shadow-[0_0_35px_rgba(232,212,158,0.5)]`;
    case "musk":
      // Minimal clean blur-to-focus effect, white glow
      return `${base} group-hover:scale-[1.03] group-hover:shadow-[0_0_30px_rgba(250,250,250,0.6)]`;
    default:
      return `${base} group-hover:scale-[1.04] group-hover:shadow-[0_0_40px_rgba(201,168,76,0.3)]`;
  }
}

/**
 * Returns Tailwind classes for dynamic overlay based on category
 */
export function getOverlayClasses(categorySlug: string | null | undefined): string {
  if (!categorySlug) {
    return "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none";
  }

  switch (categorySlug) {
    case "oud":
      return "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none";
    case "floral":
      return "absolute inset-0 bg-gradient-to-t from-brand-rose/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none";
    case "woody":
      return "absolute inset-0 bg-gradient-to-t from-brand-moss/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none";
    case "citrus-fresh":
      return "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden";
    case "oriental-amber":
      return "absolute inset-0 bg-gradient-to-t from-brand-gold/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none";
    case "gourmand":
      return "absolute inset-0 bg-gradient-to-t from-brand-gold-light/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none";
    case "musk":
      return "absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none";
    default:
      return "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none";
  }
}

/**
 * Returns appropriate animation class for category-specific keyframes
 */
export function getAnimationClass(categorySlug: string | null | undefined): string {
  if (!categorySlug) return "";
  
  switch (categorySlug) {
    case "floral":
      return "group-hover:animate-float";
    case "oud":
      return "group-hover:animate-glow-pulse";
    case "gourmand":
      return "group-hover:animate-bounce-subtle";
    default:
      return "";
  }
}

/**
 * Returns shimmer overlay class for citrus-fresh category
 */
export function getShimmerOverlayClass(categorySlug: string | null | undefined): string {
  if (categorySlug !== "citrus-fresh") return "";
  return "absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500";
}