export const MOCK_TODAY = "2026-07-19";

export type DeadlineGroup = "today" | "thisWeek" | "nextWeek" | "later";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export function isoToDate(value: string) {
  return new Date(`${value}T12:00:00Z`);
}

export function getDaysRemaining(deadline?: string, today = MOCK_TODAY) {
  if (!deadline) return null;
  return Math.round((isoToDate(deadline).getTime() - isoToDate(today).getTime()) / DAY_IN_MS);
}

export function getDeadlineGroup(deadline: string, today = MOCK_TODAY): DeadlineGroup {
  const days = getDaysRemaining(deadline, today) ?? 0;
  if (days <= 0) return "today";
  if (days <= 7) return "thisWeek";
  if (days <= 14) return "nextWeek";
  return "later";
}

export function isWithinNextDays(deadline: string | undefined, days: number, today = MOCK_TODAY) {
  const remaining = getDaysRemaining(deadline, today);
  return remaining !== null && remaining >= 0 && remaining <= days;
}
