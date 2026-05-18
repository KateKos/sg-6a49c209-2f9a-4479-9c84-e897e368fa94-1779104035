export interface Habit {
  id: string;
  name: string;
  streak: number;
  lastCheckedIn: string | null;
  completedToday: boolean;
}

export interface WeeklyStats {
  totalHabits: number;
  completedToday: number;
  weekCompletion: number;
  longestStreak: number;
  currentStreak: number;
}