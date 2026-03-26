import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
<<<<<<< HEAD
      className={cn("animate-pulse rounded-md bg-muted", className)}
=======
      className={cn("animate-pulse rounded-md bg-accent", className)}
>>>>>>> feature/dashboard
      {...props}
    />
  )
}

export { Skeleton }
