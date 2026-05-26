"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { getJapanTodayDate } from "@/lib/japan-date"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

// ライブ日程をハイライトするためにカスタムした
export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  highlightedDates?: string[] // ハイライトする日付のリストを追加
}

function subscribeToDateChange(onStoreChange: () => void) {
  const intervalId = window.setInterval(onStoreChange, 60 * 1000)
  window.addEventListener('focus', onStoreChange)

  return () => {
    window.clearInterval(intervalId)
    window.removeEventListener('focus', onStoreChange)
  }
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  highlightedDates = [], // デフォルト値を設定
  ...props
}: CalendarProps) {
  const [todayJST, setTodayJST] = React.useState(getJapanTodayDate)

  React.useEffect(() => {
    return subscribeToDateChange(() => {
      setTodayJST(getJapanTodayDate())
    })
  }, [])

  const modifiers = {
    highlighted: (date: Date) => {
      const dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000) // 日本時間に合わせる
        .toISOString()
        .split('T')[0];
      return highlightedDates.includes(dateString);
    }
  }

  const modifiersClassNames = {
    highlighted:
      "bg-red-600 text-white font-extrabold shadow-md shadow-red-950/30 hover:bg-red-500 hover:text-white" // 濃いめの赤背景、白文字、太字
  }

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      fixedWeeks
      today={todayJST}
      className={cn(
        "w-full max-w-[360px] rounded-3xl border bg-card/80 p-3 shadow-lg shadow-black/10 sm:max-w-[430px] sm:p-6",
        className
      )}
      modifiers={modifiers} // ハイライトの修飾子を追加
      modifiersClassNames={modifiersClassNames} // 修飾子に対応するクラスを追加
      classNames={{
        months: "flex flex-col",
        month: "space-y-4 sm:space-y-5",
        caption: "relative flex items-center justify-center px-10 sm:px-12",
        caption_label: "text-2xl font-extrabold tracking-tight sm:text-4xl",
        nav: "flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-9 w-9 rounded-full bg-secondary/80 p-0 text-foreground opacity-90 shadow-sm hover:bg-secondary hover:opacity-100 sm:h-11 sm:w-11"
        ),
        nav_button_previous: "absolute left-0",
        nav_button_next: "absolute right-0",
        table: "w-full border-collapse",
        head_row: "flex justify-between",
        head_cell:
          "w-9 rounded-md text-center text-[0.7rem] font-bold text-muted-foreground sm:w-12 sm:text-xs",
        row: "mt-1.5 flex w-full justify-between sm:mt-2",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 rounded-full p-0 text-base font-extrabold transition-transform hover:scale-105 hover:bg-secondary aria-selected:opacity-100 sm:h-12 sm:w-12 sm:text-xl"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground shadow-md shadow-black/20 hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "ring-2 ring-red-500 ring-offset-2 ring-offset-background",
        day_outside:
          "day-outside text-muted-foreground opacity-30 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-5 w-5" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-5 w-5" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }

