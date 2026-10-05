'use client';

import React from 'react';
import { AppShell } from '@/components/app-shell';
import { IdentificationTable } from '@/components/identification-table';
import { Cattle } from '@/types';
import { History, Radio, Clock, AlertTriangle } from 'lucide-react';

export default function HistoryPage() {
  return (
    <AppShell
      title="Riwayat Identifikasi"
      subtitle="Riwayat sapi yang terdeteksi melalui RFID Smart Cattle Gate."
    >
      {({ onSelectCattle }: { onSelectCattle: (cattle: Cattle | string) => void }) => (
        <div className="space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="farm-card p-4 rounded-2xl bg-white border border-[#E5EAE6] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#6B756E] block">Total Pemindaian Hari Ini</span>
                <span className="text-2xl font-bold text-[#17221C] tabular-nums">51 scan</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[#EAF5EF] text-[#1F6B4F] flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>

            <div className="farm-card p-4 rounded-2xl bg-white border border-[#E5EAE6] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#6B756E] block">Identifikasi Berhasil</span>
                <span className="text-2xl font-bold text-[#1F6B4F] tabular-nums">49 ekor</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[#EAF5EF] text-[#1F6B4F] flex items-center justify-center">
                <Radio className="w-4 h-4" />
              </div>
            </div>

            <div className="farm-card p-4 rounded-2xl bg-white border border-[#E5EAE6] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#6B756E] block">RFID Tidak Dikenal</span>
                <span className="text-2xl font-bold text-[#B45309] tabular-nums">2 anomali</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Historical Logs Table */}
          <IdentificationTable onSelectCattleId={onSelectCattle} />
        </div>
      )}
    </AppShell>
  );
}
