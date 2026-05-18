"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Flame } from "lucide-react";
import { useState } from "react";

export interface Habit {
  id: string;
  name: string;
  streak: number;
  lastCheckedIn: string | null;
  completedToday: boolean;
}

interface HabitCardProps {
  habit: Habit;
  onCheckIn: (habitId: string) => void;
  animationDelay?: number;
}

export function HabitCard({ habit, onCheckIn, animationDelay = 0 }: HabitCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCheckIn = () => {
    setIsAnimating(true);
    onCheckIn(habit.id);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const encouragingMessages = [
    "You're on fire! 🔥",
    "Keep it up! ✨",
    "Amazing streak! 🎉",
    "You're crushing it! 💪",
    "Unstoppable! 🚀",
  ];

  const getMessage = () => {
    if (habit.completedToday) {
      return encouragingMessages[habit.streak % encouragingMessages.length];
    }
    return habit.streak > 0 ? `${habit.streak} day streak! Keep going! 💫` : "Start your streak today! 🌟";
  };

  return (
    <Card
      className="p-6 transition-all hover:shadow-lg border-2"
      style={{
        animationDelay: `${animationDelay}ms`,
        animation: "fade-in-up 0.5s ease-out backwards",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <h3 className="font-heading font-semibold text-xl text-foreground">{habit.name}</h3>
            {habit.streak > 0 && (
              <Badge variant="secondary" className="gap-1 bg-achievement/10 text-achievement border-achievement/20">
                <Flame className="w-3 h-3" />
                {habit.streak}
              </Badge>
            )}
          </div>

          <p className="text-sm text-muted-foreground font-medium">{getMessage()}</p>

          {habit.lastCheckedIn && !habit.completedToday && (
            <p className="text-xs text-muted-foreground">
              Last check-in: {new Date(habit.lastCheckedIn).toLocaleDateString()}
            </p>
          )}
        </div>

        <Button
          size="lg"
          onClick={handleCheckIn}
          disabled={habit.completedToday}
          className={`rounded-full w-14 h-14 flex-shrink-0 transition-all ${
            habit.completedToday
              ? "bg-success hover:bg-success text-white"
              : "bg-primary hover:bg-primary/90"
          } ${isAnimating ? "animate-scale-in" : ""}`}
        >
          {habit.completedToday ? (
            <Check className="w-6 h-6" />
          ) : (
            <div className="w-6 h-6 rounded-full border-2 border-white" />
          )}
        </Button>
      </div>
    </Card>
  );
}