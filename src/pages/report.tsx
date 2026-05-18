import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, TrendingUp, Award, Calendar, Flame } from "lucide-react";
import Link from "next/link";
import type { Habit } from "@/types/habit";

const mockHabits: Habit[] = [
  { id: "1", name: "Morning Exercise", streak: 7, lastCheckedIn: "2026-05-18", completedToday: true },
  { id: "2", name: "Read 30 Minutes", streak: 12, lastCheckedIn: "2026-05-18", completedToday: true },
  { id: "3", name: "Drink 8 Glasses of Water", streak: 5, lastCheckedIn: "2026-05-18", completedToday: true },
  { id: "4", name: "Meditation", streak: 3, lastCheckedIn: "2026-05-17", completedToday: false },
  { id: "5", name: "Practice Guitar", streak: 1, lastCheckedIn: "2026-05-16", completedToday: false },
];

const weeklyCompletionData = [
  { day: "Mon", completed: 3, total: 5, percentage: 60 },
  { day: "Tue", completed: 4, total: 5, percentage: 80 },
  { day: "Wed", completed: 5, total: 5, percentage: 100 },
  { day: "Thu", completed: 4, total: 5, percentage: 80 },
  { day: "Fri", completed: 3, total: 5, percentage: 60 },
  { day: "Sat", completed: 5, total: 5, percentage: 100 },
  { day: "Sun", completed: 3, total: 5, percentage: 60 },
];

export default function WeeklyReport() {
  const totalHabits = mockHabits.length;
  const averageCompletion = Math.round(
    weeklyCompletionData.reduce((sum, day) => sum + day.percentage, 0) / weeklyCompletionData.length
  );
  const longestStreak = Math.max(...mockHabits.map((h) => h.streak));
  const perfectDays = weeklyCompletionData.filter((d) => d.percentage === 100).length;

  const getMotivationalMessage = () => {
    if (averageCompletion >= 80) {
      return "Outstanding week! You're building incredible momentum! 🎉✨";
    } else if (averageCompletion >= 60) {
      return "Great progress this week! Keep the momentum going! 💪";
    } else if (averageCompletion >= 40) {
      return "You're making progress! Every day counts! 🌟";
    } else {
      return "New week, fresh start! You've got this! 🚀";
    }
  };

  return (
    <>
      <SEO
        title="Weekly Report - Habit Tracker"
        description="View your weekly habit tracking progress and insights"
      />

      <div className="min-h-screen bg-background">
        <div className="container py-8 space-y-8">
          <header className="space-y-4 animate-fade-in-up">
            <Link href="/">
              <Button variant="ghost" className="gap-2 -ml-2 mb-4">
                <ArrowLeft className="w-4 h-4" />
                Back to Habits
              </Button>
            </Link>

            <div className="space-y-2">
              <h1 className="font-heading font-semibold text-5xl md:text-6xl text-foreground">
                Weekly Report
              </h1>
              <p className="text-lg text-muted-foreground">{getMotivationalMessage()}</p>
            </div>
          </header>

          <div className="grid md:grid-cols-4 gap-4 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <Card className="p-6 bg-gradient-to-br from-achievement/10 to-achievement/5 border-achievement/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-achievement/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-achievement" />
                </div>
                <h3 className="font-heading font-semibold text-sm text-muted-foreground">Avg. Completion</h3>
              </div>
              <p className="text-3xl font-heading font-semibold text-foreground">{averageCompletion}%</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-sm text-muted-foreground">Longest Streak</h3>
              </div>
              <p className="text-3xl font-heading font-semibold text-foreground">{longestStreak} days</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-sm text-muted-foreground">Perfect Days</h3>
              </div>
              <p className="text-3xl font-heading font-semibold text-foreground">{perfectDays}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-success/10 to-success/5 border-success/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-success" />
                </div>
                <h3 className="font-heading font-semibold text-sm text-muted-foreground">Active Habits</h3>
              </div>
              <p className="text-3xl font-heading font-semibold text-foreground">{totalHabits}</p>
            </Card>
          </div>

          <Card className="p-8 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <h2 className="font-heading font-semibold text-2xl text-foreground mb-6">7-Day Progress</h2>
            <div className="grid grid-cols-7 gap-3">
              {weeklyCompletionData.map((day, index) => (
                <div
                  key={day.day}
                  className="space-y-3 animate-fade-in-up"
                  style={{ animationDelay: `${300 + index * 50}ms` }}
                >
                  <div className="text-center">
                    <p className="font-heading text-sm font-semibold text-muted-foreground mb-2">{day.day}</p>
                    <div
                      className={`mx-auto rounded-xl border-2 transition-all ${
                        day.percentage === 100
                          ? "bg-achievement/20 border-achievement/40 h-32"
                          : day.percentage >= 80
                          ? "bg-success/20 border-success/40 h-28"
                          : day.percentage >= 60
                          ? "bg-accent/20 border-accent/40 h-24"
                          : "bg-muted border-border h-20"
                      }`}
                      style={{
                        width: "100%",
                      }}
                    >
                      <div className="h-full flex items-center justify-center">
                        <span className="font-heading font-semibold text-lg">{day.completed}/{day.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            <h2 className="font-heading font-semibold text-2xl text-foreground mb-6">Habit Breakdown</h2>
            <div className="space-y-5">
              {mockHabits.map((habit, index) => (
                <div
                  key={habit.id}
                  className="space-y-3 animate-fade-in-up"
                  style={{ animationDelay: `${500 + index * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="font-heading font-semibold text-lg text-foreground">{habit.name}</h3>
                      {habit.streak > 0 && (
                        <Badge variant="secondary" className="gap-1 bg-achievement/10 text-achievement border-achievement/20">
                          <Flame className="w-3 h-3" />
                          {habit.streak} day streak
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-muted-foreground">
                      {Math.round((habit.streak / 7) * 100)}% this week
                    </span>
                  </div>
                  <Progress value={(habit.streak / 7) * 100} className="h-3" />
                </div>
              ))}
            </div>
          </Card>

          {perfectDays >= 2 && (
            <Card
              className="p-8 text-center bg-gradient-to-br from-achievement/20 to-achievement/10 border-achievement/30 animate-scale-in"
              style={{ animationDelay: "700ms" }}
            >
              <Award className="w-16 h-16 mx-auto mb-4 text-achievement" />
              <h2 className="font-heading font-semibold text-2xl text-foreground mb-2">
                Achievement Unlocked! 🏆
              </h2>
              <p className="text-lg text-muted-foreground">
                You completed all habits on {perfectDays} days this week! Keep this amazing momentum going!
              </p>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}