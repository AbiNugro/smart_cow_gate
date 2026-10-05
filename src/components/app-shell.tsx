'use client';

import React, { useState } from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { CattleDetailDrawer } from './cattle-detail-drawer';
import { Cattle } from '@/types';
import { CATTLE_LIST } from '@/data/cattle-data';

interface AppShellProps {
  title: string;
  subtitle: string;
  children:
    | React.ReactNode
    | ((props: { onSelectCattle: (cattle: Cattle | string) => void }) => React.ReactNode);
}

export function AppShell({ title, subtitle, children }: AppShellProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedCattle, setSelectedCattle] = useState<Cattle | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenCattleDetail = (cattle: Cattle | string) => {
    if (typeof cattle === 'string') {
      const found = CATTLE_LIST.find((c) => c.id === cattle);
      if (found) {
        setSelectedCattle(found);
        setIsDrawerOpen(true);
      }
    } else {
      setSelectedCattle(cattle);
      setIsDrawerOpen(true);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F7F9F7] text-[#17221C]">
      {/* Sidebar */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          title={title}
          subtitle={subtitle}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
          {typeof children === 'function'
            ? (children as any)({ onSelectCattle: handleOpenCattleDetail })
            : React.cloneElement(children as React.ReactElement<any>, {
                onSelectCattle: handleOpenCattleDetail,
              })}
        </main>
      </div>

      {/* Shared Detail Drawer */}
      <CattleDetailDrawer
        cattle={selectedCattle}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
