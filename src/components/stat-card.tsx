import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "farm-card rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between transition-all duration-200",
        className
      )}
    >
      {/* Top row: Label + Subtle Icon */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-medium text-[#6B756E]">
          {title}
        </span>
        <div className="w-8 h-8 rounded-lg bg-[#F7F9F7] text-[#1F6B4F] flex items-center justify-center shrink-0 border border-[#E5EAE6]">
          <Icon className="w-4 h-4 stroke-[1.8]" />
        </div>
      </div>

      {/* Main Metric Value */}
      <div className="mb-1">
        <span className="text-3xl font-semibold tracking-tight text-[#17221C] tabular-nums">
          {value}
        </span>
      </div>

      {/* Subtitle */}
      <p className="text-xs text-[#6B756E] line-clamp-1">
        {subtitle}
      </p>
    </div>
  );
}
