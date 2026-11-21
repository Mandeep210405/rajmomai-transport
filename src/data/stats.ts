/**
 * Verified figures only. Do not add turnover, customer counts, fleet size or tonnage
 * unless they are confirmed. `value` is the number that counts up; `suffix` follows it.
 */
export interface Stat {
  value: number;
  suffix?: string;
  label: string;
  caption?: string;
}

export const stats: Stat[] = [
  { value: 16, suffix: "+", label: "Years of Industry Experience" },
  { value: 5, suffix: "–10", label: "Trucks Per Day", caption: "Arrangement capacity, subject to availability" },
  { value: 5, label: "Industrial Material Categories" },
  { value: 2, label: "Core Business Divisions" },
];
