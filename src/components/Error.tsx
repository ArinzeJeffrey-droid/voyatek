import { cn } from "@/lib/utils";

export interface ErrorProps {
  className?: string;
}

export default function Error({ className }: ErrorProps) {
  return (
    <div className={cn("flex justify-center items-center h-full", className)}>
      <div className="font-bold">
        <h1 className="text-2xl">Error</h1>
        <p>Something went wrong</p>
      </div>
    </div>
  );
}
