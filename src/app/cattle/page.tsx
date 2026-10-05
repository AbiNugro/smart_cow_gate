'use client';

import React from 'react';
import { AppShell } from '@/components/app-shell';
import { CattleTable } from '@/components/cattle-table';
import { Cattle } from '@/types';
import { Tag } from 'lucide-react';

export default function CattlePage() {
  return (
    <AppShell
      title="Data Sapi"
      subtitle="Kelola dan lihat informasi ternak yang terdaftar pada sistem RFID."
    >
      {({ onSelectCattle }: { onSelectCattle: (cattle: Cattle | string) => void }) => (
        <div className="space-y-6">
          {/* Top Info Notice */}
          <div className="p-4 rounded-2xl bg-white border border-[#E5EAE6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F7F9F7] text-[#1F6B4F] border border-[#E5EAE6] flex items-center justify-center shrink-0">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-[#17221C] block">
                  Standar Transponder RFID ISO 11784/11785
                </span>
                <span className="text-[#6B756E]">
                  Seluruh ternak memiliki kode identitas 15-digit unik untuk pencatatan otomatis saat melintasi gerbang timbang.
                </span>
              </div>
            </div>

            <div className="text-[#6B756E] tabular-nums text-left sm:text-right shrink-0">
              <span className="font-semibold text-[#17221C]">128 ekor</span> terdaftar aktif
            </div>
          </div>

          {/* Cattle Table with Search & Filter */}
          <CattleTable onSelectCattle={onSelectCattle} />
        </div>
      )}
    </AppShell>
  );
}
