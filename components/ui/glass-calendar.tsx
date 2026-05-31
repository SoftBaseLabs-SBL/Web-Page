"use client";

import * as React from "react";
import { Clock, Edit2, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths, isSameDay, isToday, getDate, getDay, getDaysInMonth, startOfMonth } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Half-hour slots from 7:00 AM through 7:00 PM
const DEFAULT_TIME_SLOTS = (() => {
  const slots: string[] = [];
  for (let minutes = 7 * 60; minutes <= 19 * 60; minutes += 30) {
    const h24 = Math.floor(minutes / 60);
    const min = minutes % 60;
    const period = h24 >= 12 ? "PM" : "AM";
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    slots.push(`${h12}:${min.toString().padStart(2, "0")} ${period}`);
  }
  return slots;
})();

// --- TYPE DEFINITIONS ---
interface Day {
  date: Date;
  isToday: boolean;
  isSelected: boolean;
}

interface GlassCalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  selectedTime?: string;
  onTimeSelect?: (time: string) => void;
  onNoteChange?: (note: string) => void;
  timeSlots?: string[];
  className?: string;
}

// --- HELPER TO HIDE SCROLLBAR ---
const ScrollbarHide = () => (
  <style>{`
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
);


// --- MAIN COMPONENT ---
export const GlassCalendar = React.forwardRef<HTMLDivElement, GlassCalendarProps>(
  ({ className, selectedDate: propSelectedDate, onDateSelect, selectedTime: propSelectedTime, onTimeSelect, onNoteChange, timeSlots = DEFAULT_TIME_SLOTS, ...props }, ref) => {
    const [currentMonth, setCurrentMonth] = React.useState(propSelectedDate || new Date());
    const [selectedDate, setSelectedDate] = React.useState(propSelectedDate || new Date());
    const [selectedTime, setSelectedTime] = React.useState<string | undefined>(propSelectedTime);
    const [note, setNote] = React.useState("");
    const [showNote, setShowNote] = React.useState(false);
    const [showTimes, setShowTimes] = React.useState(false);
    const timesScrollRef = React.useRef<HTMLDivElement>(null);

    const scrollTimes = (direction: number) => {
      timesScrollRef.current?.scrollBy({ left: direction * 160, behavior: "smooth" });
    };

    const firstDayOffset = getDay(startOfMonth(currentMonth));
    const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"];

    const handleNoteChange = (value: string) => {
      setNote(value);
      onNoteChange?.(value);
    };

    const handleTimeSelect = (time: string) => {
      setSelectedTime(time);
      onTimeSelect?.(time);
    };

    // Generate all days for the current month
    const monthDays = React.useMemo(() => {
        const start = startOfMonth(currentMonth);
        const totalDays = getDaysInMonth(currentMonth);
        const days: Day[] = [];
        for (let i = 0; i < totalDays; i++) {
            const date = new Date(start.getFullYear(), start.getMonth(), i + 1);
            days.push({
                date,
                isToday: isToday(date),
                isSelected: isSameDay(date, selectedDate),
            });
        }
        return days;
    }, [currentMonth, selectedDate]);

    const handleDateClick = (date: Date) => {
      setSelectedDate(date);
      onDateSelect?.(date);
    };

    const handlePrevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-[360px] rounded-3xl p-5 shadow-2xl overflow-hidden",
          "bg-black/20 backdrop-blur-xl border border-white/10",
          "text-white font-sans",
          className
        )}
        {...props}
      >
        <ScrollbarHide />
        {/* Date Display and Navigation */}
        <div className="mb-6 flex items-center justify-between">
            <motion.p
              key={format(currentMonth, "MMMM")}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-4xl font-bold tracking-tight"
            >
                {format(currentMonth, "MMMM")}
            </motion.p>
            <div className="flex items-center space-x-2">
                <button onClick={handlePrevMonth} className="p-1 rounded-full text-white/70 transition-colors hover:bg-black/20">
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={handleNextMonth} className="p-1 rounded-full text-white/70 transition-colors hover:bg-black/20">
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>
        </div>

        {/* Monthly Calendar Grid */}
        <div>
            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1">
                {weekdayLabels.map((label, i) => (
                    <div key={i} className="flex h-8 items-center justify-center text-xs font-bold text-white/50">
                        {label}
                    </div>
                ))}
            </div>
            {/* Date cells */}
            <div className="mt-1 grid grid-cols-7 gap-1">
                {Array.from({ length: firstDayOffset }).map((_, i) => (
                    <div key={`blank-${i}`} />
                ))}
                {monthDays.map((day) => (
                    <button
                        key={format(day.date, "yyyy-MM-dd")}
                        onClick={() => handleDateClick(day.date)}
                        className={cn(
                            "relative mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200",
                            day.isSelected
                                ? "bg-gradient-to-br from-pink-500 to-orange-400 text-white shadow-lg"
                                : "text-white hover:bg-white/20",
                        )}
                    >
                        {day.isToday && !day.isSelected && (
                            <span className="absolute bottom-1 h-1 w-1 rounded-full bg-pink-400"></span>
                        )}
                        {getDate(day.date)}
                    </button>
                ))}
            </div>
        </div>

        {/* Divider */}
        <div className="mt-6 h-px bg-white/20" />

        {/* Footer Actions */}
        <div className="mt-4 flex items-center justify-between space-x-4">
           <button
             onClick={() => setShowNote((v) => !v)}
             className={cn(
               "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-white",
               showNote || note ? "text-white" : "text-white/70",
             )}
           >
             <Edit2 className="h-4 w-4" />
             <span>{note ? "Edit note" : "Add a note..."}</span>
           </button>
           <button
             onClick={() => setShowTimes((v) => !v)}
             className="flex items-center space-x-2 rounded-lg bg-black/20 px-3 py-2 text-xs font-bold text-white shadow-md transition-colors hover:bg-black/30"
           >
             <Clock className="h-4 w-4" />
             <span>{selectedTime ?? "Choose time"}</span>
           </button>
        </div>

        {/* Time slots */}
        <AnimatePresence initial={false}>
          {showTimes && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => scrollTimes(-1)}
                  aria-label="Earlier times"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/20 text-white/70 transition-colors hover:bg-black/30 hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div
                  ref={timesScrollRef}
                  className="flex flex-1 gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
                >
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={cn(
                        "shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200",
                        selectedTime === time
                          ? "bg-gradient-to-br from-pink-500 to-orange-400 text-white shadow-lg"
                          : "bg-black/20 text-white/80 hover:bg-white/20 hover:text-white",
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => scrollTimes(1)}
                  aria-label="Later times"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/20 text-white/70 transition-colors hover:bg-black/30 hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Note input */}
        <AnimatePresence initial={false}>
          {showNote && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <textarea
                value={note}
                onChange={(e) => handleNoteChange(e.target.value)}
                rows={3}
                autoFocus
                placeholder="Add a note about your project..."
                className="mt-4 w-full resize-none rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-white/30"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

GlassCalendar.displayName = "GlassCalendar";
