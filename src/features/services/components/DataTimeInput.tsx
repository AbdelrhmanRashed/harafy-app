import { format } from "date-fns"
import { ar } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {  buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function DataTimeInput({ date, setDate }: { date: Date | undefined; setDate: (d: Date | undefined) => void }) {

  return (
    <Popover modal={false}>
      <PopoverTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "default" }),
          "w-full h-12 justify-start text-right font-normal rounded-2xl bg-muted/50 border-border/30 px-4 flex items-center"
        )}
      >
        <CalendarIcon className="ml-2 h-4 w-4 text-primary" />
        <span className={cn(!date && "text-muted-foreground")}>
          {date ? format(date, "PPP p", { locale: ar }) : "اختر الموعد"}
        </span>
      </PopoverTrigger>

      <PopoverContent onPointerDown={(e) => e.stopPropagation()} 
      className="w-auto p-0 rounded-2xl z-9999" align="center" >

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={ar}
          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}