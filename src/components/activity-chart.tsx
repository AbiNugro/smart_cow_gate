'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { WEEKLY_ACTIVITY } from '@/data/cattle-data';
import { BarChart3, TrendingUp, Calendar } from 'lucide-react';

export function ActivityChart() {
  const [activeDay, setActiveDay] = useState<string | null>('Kamis');
  const maxVal = Math.max(...WEEKLY_ACTIVITY.map(d => d.count));
  const totalWeekly = WEEKLY_ACTIVITY.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="farm-card rounded-2xl p-6 bg-white border border-[#E5EAE6] h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#1F6B4F]" />
            <h3 className="text-base font-semibold text-[#17221C] tracking-tight">
              Aktivitas Identifikasi Mingguan
            </h3>
          </div>
          <p className="text-xs text-[#6B756E] mt-0.5">
            Total pemindaian RFID melalui Gate 01 & Gate 02 (7 hari terakhir)
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-2xl font-bold text-[#17221C] tabular-nums block leading-none">
            {totalWeekly}
          </span>
          <span className="text-[11px] text-[#6B756E] flex items-center justify-end gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-[#1F6B4F]" />
            <span className="font-medium text-[#1F6B4F]">+12.4%</span>
            <span className="hidden sm:inline">minggu ini</span>
          </span>
        </div>
      </div>

      {/* Bar Chart Visualization - Expanded to fill matching height */}
      <div className="flex-1 flex flex-col justify-end py-4">
        <div className="grid grid-cols-7 gap-2.5 sm:gap-4 items-end h-52">
          {WEEKLY_ACTIVITY.map((item) => {
            const heightPercent = Math.round((item.count / maxVal) * 100);
            const isHovered = activeDay === item.day;

            return (
              <div
                key={item.day}
                onMouseEnter={() => setActiveDay(item.day)}
                className="group relative flex flex-col items-center h-full justify-end cursor-pointer"
              >
                {/* Tooltip on Hover */}
                <div
                  className={cn(
                    "absolute -top-8 px-2 py-0.5 rounded-md text-[11px] font-semibold transition-all duration-150 pointer-events-none tabular-nums z-10 whitespace-nowrap shadow-xs",
                    isHovered
                      ? "bg-[#17221C] text-white opacity-100 transform -translate-y-1"
                      : "opacity-0"
                  )}
                >
                  {item.count} scan
                </div>

                {/* Bar */}
                <div className="w-full max-w-[44px] bg-[#F7F9F7] rounded-xl overflow-hidden flex flex-col justify-end p-1 h-full border border-[#E5EAE6] group-hover:border-[#C8E5D5] transition-colors">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={cn(
                      "w-full rounded-lg transition-all duration-300 ease-out",
                      isHovered
                        ? "bg-[#1F6B4F] shadow-xs"
                        : "bg-[#2D8564]/80 group-hover:bg-[#1F6B4F]"
                    )}
                  />
                </div>

                {/* Day Label */}
                <span
                  className={cn(
                    "text-[11px] font-medium mt-2.5 transition-colors",
                    isHovered ? "text-[#1F6B4F] font-semibold" : "text-[#6B756E]"
                  )}
                >
                  {item.day.slice(0, 3)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Insights Footnote */}
      <div className="pt-3 border-t border-[#E5EAE6] flex items-center justify-between text-[11px] text-[#6B756E]">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#1F6B4F]" />
          Puncak: <strong className="text-[#17221C] font-semibold">Kamis ({WEEKLY_ACTIVITY[3].count} scan)</strong>
        </span>
        <span className="tabular-nums">Rata-rata: 47 scan/hari</span>
      </div>
    </div>
  );
}
