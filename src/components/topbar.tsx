'use client';

import React from 'react';
import { Menu, Calendar } from 'lucide-react';

interface TopbarProps {
  title: string;
  subtitle: string;
  onOpenMobileSidebar: () => void;
}

export function Topbar({ title, subtitle, onOpenMobileSidebar }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#E5EAE6] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 transition-all">
      {/* Left: Mobile Toggle + Page Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          aria-label="Buka menu navigasi"
          className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-[#6B756E] hover:text-[#17221C] hover:bg-[#F3F4F6] border border-[#E5EAE6]"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-bold text-[#17221C] tracking-tight truncate">
            {title}
          </h1>
          <p className="text-xs text-[#6B756E] truncate hidden sm:block">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right: Hanya tanggal saja */}
      <div className="flex items-center gap-1.5 text-xs text-[#6B756E] tabular-nums font-medium">
        <Calendar className="w-3.5 h-3.5 text-[#6B756E]" />
        <span>05 Oktober 2026</span>
      </div>
    </header>
  );
}
