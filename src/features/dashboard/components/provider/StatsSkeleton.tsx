import { Skeleton } from "@/components/ui/skeleton";

export default function StatsSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="p-4 border rounded-xl">
          <Skeleton className="w-20 h-4 mb-2" />
          <Skeleton className="w-12 h-6" />
        </div>
      ))}
    </div>
  );
}