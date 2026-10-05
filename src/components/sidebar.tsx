'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users2, History, X } from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({ isMobileOpen, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
    },
    {
      label: 'Data Sapi',
      href: '/cattle',
      icon: Users2,
    },
    {
      label: 'Riwayat Identifikasi',
      href: '/history',
      icon: History,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-[#E5EAE6] w-64 select-none">
      {/* Brand Header */}
      <div className="px-5 py-5 border-b border-[#E5EAE6] flex items-center justify-between">
        <Link href="/" className="flex items-center group flex-1 min-w-0">
          <img
            src="/logo.png"
            alt="Smart Cattle Gate - Sistem Monitoring RFID"
            className="w-full max-w-[205px] h-auto max-h-16 object-contain transition-transform duration-150 group-hover:scale-[1.02]"
          />
        </Link>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          aria-label="Tutup menu navigasi"
          className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-[#6B756E] hover:text-[#17221C] hover:bg-[#F3F4F6] shrink-0 ml-2"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3.5 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-semibold text-[#8C9890] uppercase tracking-wider">
          Menu Utama
        </div>

        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 active:scale-[0.98]",
                isActive
                  ? "bg-[#EAF5EF] text-[#1F6B4F] font-semibold shadow-2xs border border-[#C8E5D5]"
                  : "text-[#6B756E] hover:text-[#17221C] hover:bg-[#F7F9F7]"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0 transition-colors",
                  isActive ? "text-[#1F6B4F]" : "text-[#6B756E]"
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Subtle Bottom Footnote */}
      <div className="p-4 px-5 border-t border-[#E5EAE6]/60">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#17221C] mb-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1F6B4F]" />
          <span>Smart Cattle Gate</span>
        </div>
        <p className="text-[11px] text-[#8C9890]">
          Sistem Monitoring RFID • v2.4
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity"
          />
          <div className="relative z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
