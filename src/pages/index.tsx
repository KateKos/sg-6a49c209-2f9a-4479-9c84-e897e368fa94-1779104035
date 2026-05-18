import { SEO } from "@/components/SEO";
import { HabitCard } from "@/components/HabitCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, TrendingUp, Award, BarChart3 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import type { Habit } from "@/types/habit";

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "1",
      name: "Morning Exercise",
      streak: 7,
      lastCheckedIn: "2026-05-17",
      completedToday: false,
    },
    {
      id: "2",
      name: "Read 30 Minutes",
      streak: 12,
      lastCheckedIn: "2026-05-17",
      completedToday: false,
    },
    {
      id: "3",
      name: "Drink 8 Glasses of Water",
      streak: 5,
      lastCheckedIn: "2026-05-17",
      completedToday: false,
    },
    {
      id: "4",
      name: "Meditation",
      streak: 3,
      lastCheckedIn: "2026-05-17",
      completedToday: false,
    },
    {
      id: "5",
      name: "Practice Guitar",
      streak: 0,
      lastCheckedIn: null,
      completedToday: false,
    },
  ]);

  const handleCheckIn = (habitId: string) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id === habitId && !habit.completedToday) {
          return {
            ...habit,
            completedToday: true,
            streak: habit.streak + 1,
            lastCheckedIn: new Date().toISOString(),
          };
        }
        return habit;
      })
    );
  };

  const completedCount = habits.filter((h) => h.completedToday).length;
  const totalHabits = habits.length;
  const completionPercentage = Math.round((completedCount / totalHabits) * 100);

  return (
    <>
      <SEO
        title="Habit Tracker - Build Better Habits"
        description="Track your daily habits, build streaks, and celebrate your progress"
      />

      <div className="min-h-screen bg-background">
        <div className="container py-8 space-y-8">
          <header className="text-center space-y-4 animate-fade-in-up">
            <div className="flex justify-end mb-4">
              <Link href="/report">
                <Button variant="outline" className="gap-2 border-accent/20 hover:bg-accent/10">
                  <BarChart3 className="w-4 h-4" />
                  Weekly Report
                </Button>
              </Link>
            </div>
            
            <h1 className="font-heading font-semibold text-5xl md:text-6xl text-foreground">
              Your Daily Habits
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {completedCount === 0
                ? "Ready to start your day? Check in to build your streaks! 🌟"
                : completedCount === totalHabits
                ? "Incredible! All habits completed today! 🎉🎊"
                : `${completedCount} of ${totalHabits} completed today. You're doing great! 💪`}
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-4 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-sm text-muted-foreground">Today's Progress</h3>
              </div>
              <p className="text-3xl font-heading font-semibold text-foreground">{completionPercentage}%</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-sm text-muted-foreground">Longest Streak</h3>
              </div>
              <p className="text-3xl font-heading font-semibold text-foreground">
                {Math.max(...habits.map((h) => h.streak), 0)} days
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-achievement/10 to-achievement/5 border-achievement/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-achievement/20 flex items-center justify-center">
                  <Plus className="w-5 h-5 text-achievement" />
                </div>
                <h3 className="font-heading font-semibold text-sm text-muted-foreground">Active Habits</h3>
              </div>
              <p className="text-3xl font-heading font-semibold text-foreground">{totalHabits}</p>
            </Card>
          </div>

          <div className="space-y-4">
            {habits.map((habit, index) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onCheckIn={handleCheckIn}
                animationDelay={200 + index * 100}
              />
            ))}
          </div>

          <div className="fixed bottom-8 right-8 z-50">
            <Button
              size="lg"
              className="rounded-full h-16 w-16 shadow-lg hover:shadow-xl transition-all bg-accent hover:bg-accent/90 animate-scale-in"
              style={{ animationDelay: "600ms" }}
            >
              <Plus className="w-8 h-8" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}