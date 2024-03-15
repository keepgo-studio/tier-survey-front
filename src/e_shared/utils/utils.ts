export function parseNumMinMax(num: number, min: number, max: number) {
  if (num < min) return min;
  else if (num > max) return max;
  return num;
}