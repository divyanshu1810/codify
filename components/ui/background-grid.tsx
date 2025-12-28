import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
      </div>
      {children}
    </div>
  );
};
