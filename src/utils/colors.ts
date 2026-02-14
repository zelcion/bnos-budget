import { COLORS, THRESHOLDS } from "../constants";

export function getColorForRatio(ratio: number): string {
  if (ratio >= THRESHOLDS.green) return COLORS.green;
  if (ratio >= THRESHOLDS.yellow) return COLORS.yellow;
  if (ratio >= THRESHOLDS.red) return COLORS.red;
  if (ratio >= THRESHOLDS.purple) return COLORS.purple;
  return COLORS.darkPurple;
}
