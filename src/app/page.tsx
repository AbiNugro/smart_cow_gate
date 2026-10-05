'use client';

import React from 'react';
import { AppShell } from '@/components/app-shell';
import { StatCard } from '@/components/stat-card';
import { RfidScanner } from '@/components/rfid-scanner';
import { RecentIdentifications } from '@/components/recent-identifications';
import { ActivityChart } from '@/components/activity-chart';
import { Users, CheckCircle, Activity, Radio } from 'lucide-react';
import { Cattle } from '@/types';

export default function DashboardPage() {
  return (
    <AppShell
      title="Dashboard"
      subtitle="Monitoring identifikasi dan aktivitas ternak secara real-time."
    >
      {({ onSelectCattle }: { onSelectCattle: (cattle: Cattle | string) => void }) => (
        <div className="space-y-6">
          {/* Welcome / Overview Header - Clean without AI slop badges */}
          <div className="farm-card rounded-2xl p-5 sm:p-6 bg-white border border-[#E5EAE6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#6B756E]">
                <span className="inline-flex items-center gap-1.5 font-medium text-[#1F6B4F]">
                  <span className="h-2 w-2 rounded-full bg-[#1F6B4F] animate-live-dot" />
                  Sistem Aktif
                </span>
                <span className="text-[#D3DDD5]">•</span>
                <span>Kandang Komunal Sapi Potong</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17221C] tracking-tight">
                Smart Cattle Gate
              </h2>
              <p className="text-xs sm:text-sm text-[#6B756E] max-w-2xl text-pretty">
                Sistem identifikasi dan pencatatan data sapi secara otomatis menggunakan RFID untuk monitoring mobilitas, kesehatan, dan bobot ternak.
              </p>
            </div>

            <div className="shrink-0 text-left sm:text-right text-xs">
              <div className="font-semibold text-[#17221C]">Gate 01: Lorong Timbang</div>
              <div className="text-[11px] text-[#6B756E] tabular-nums mt-0.5">Antena UHF 920-925 MHz Online</div>
            </div>
          </div>

          {/* Statistics Cards Grid - Minimal & Pure Typography */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Sapi"
              value="128"
              subtitle="Terdaftar dalam sistem"
              icon={Users}
            />
            <StatCard
              title="Terdeteksi Hari Ini"
              value="34"
              subtitle="Melalui cattle gate"
              icon={CheckCircle}
            />
            <StatCard
              title="Aktivitas Hari Ini"
              value="51"
              subtitle="Total pemindaian RFID"
              icon={Activity}
            />
            <StatCard
              title="RFID Reader"
              value="Online"
              subtitle="Terhubung dengan sistem"
              icon={Radio}
            />
          </div>

          {/* Section: RFID Live Scanner Card */}
          <section>
            <RfidScanner />
          </section>

          {/* Section: Activity Chart + Recent Identifications Grid (Matched Height) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7 flex flex-col">
              <RecentIdentifications onSelectCattle={onSelectCattle} limit={5} />
            </div>

            <div className="lg:col-span-5 flex flex-col">
              <ActivityChart />
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
