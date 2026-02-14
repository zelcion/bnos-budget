import type { Month } from "../types";

export const DEFAULT_EMOJIS = ["🍔", "🚗", "🏠", "🛒", "💊", "🎮"];

export const COLORS = {
  green: "#22C55E",
  yellow: "#EAB308",
  red: "#EF4444",
  purple: "#A855F7",
  darkPurple: "#7C3AED",
} as const;

export const THRESHOLDS = {
  green: 0.5,
  yellow: 0.25,
  red: 0.1,
  purple: 0,
} as const;

export function getCurrentMonth(): Month {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1 };
}
