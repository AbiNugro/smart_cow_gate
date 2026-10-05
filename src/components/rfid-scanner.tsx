'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Radio, Wifi, Clock, AlertTriangle, ArrowRight, Cpu } from 'lucide-react';
import { CattleAvatar } from './cattle-avatar';
import { StatusBadge } from './status-badge';
import { CATTLE_LIST } from '@/data/cattle-data';
import Link from 'next/link';

type ScannerMode = 'detected' | 'scanning' | 'waiting' | 'unknown';

export function RfidScanner() {
  const [mode, setMode] = useState<ScannerMode>('detected');
  const sampleCattle = CATTLE_LIST[0]; // SCG-024 Limousin

  return (
    <div className="farm-card rounded-2xl p-6 relative overflow-hidden bg-white border border-[#E5EAE6]">
      {/* Top Header Row with Title & Interactive State Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5EAE6]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#1F6B4F] animate-live-dot" />
            <h2 className="text-lg font-semibold text-[#17221C] tracking-tight">
              RFID Live Identification
            </h2>
          </div>
          <p className="text-xs text-[#6B756E] mt-0.5">
            Data pemindaian antena Smart Cattle Gate (UHF EPC Gen2 - 920-925 MHz)
          </p>
        </div>

        {/* State Switcher */}
        <div className="flex items-center gap-1 p-1 bg-[#F7F9F7] rounded-xl border border-[#E5EAE6] text-xs self-start sm:self-auto">
          <span className="text-[11px] text-[#6B756E] px-2 font-medium hidden md:inline">
            Status:
          </span>
          <button
            onClick={() => setMode('detected')}
            className={cn(
              "px-2.5 py-1 rounded-lg font-medium transition-all duration-150 active:scale-[0.96]",
              mode === 'detected'
                ? "bg-white text-[#1F6B4F] shadow-xs border border-[#E5EAE6]"
                : "text-[#6B756E] hover:text-[#17221C]"
            )}
          >
            Terdeteksi
          </button>
          <button
            onClick={() => setMode('scanning')}
            className={cn(
              "px-2.5 py-1 rounded-lg font-medium transition-all duration-150 active:scale-[0.96]",
              mode === 'scanning'
                ? "bg-white text-[#1F6B4F] shadow-xs border border-[#E5EAE6]"
                : "text-[#6B756E] hover:text-[#17221C]"
            )}
          >
            Scanning
          </button>
          <button
            onClick={() => setMode('waiting')}
            className={cn(
              "px-2.5 py-1 rounded-lg font-medium transition-all duration-150 active:scale-[0.96]",
              mode === 'waiting'
                ? "bg-white text-[#1F6B4F] shadow-xs border border-[#E5EAE6]"
                : "text-[#6B756E] hover:text-[#17221C]"
            )}
          >
            Menunggu
          </button>
          <button
            onClick={() => setMode('unknown')}
            className={cn(
              "px-2.5 py-1 rounded-lg font-medium transition-all duration-150 active:scale-[0.96]",
              mode === 'unknown'
                ? "bg-white text-[#92400E] shadow-xs border border-[#FDE68A]"
                : "text-[#6B756E] hover:text-[#17221C]"
            )}
          >
            Unknown
          </button>
        </div>
      </div>

      {/* Main Scanner Body */}
      <div className="pt-6">
        {mode === 'detected' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Visual Identification Photo & Signal Indicator */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="relative">
                {/* Concentric Border Radius & Image Depth */}
                <div className="p-2.5 rounded-3xl bg-[#F7F9F7] border border-[#E5EAE6] relative group">
                  <CattleAvatar
                    breed={sampleCattle.breed}
                    id={sampleCattle.id}
                    size="xl"
                    className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl shadow-xs outline-1 outline-black/5"
                  />
                </div>

                {/* Antenna Radar Animation Ring (Subtle) */}
                <div className="absolute -inset-1 rounded-3xl border border-[#1F6B4F]/20 pointer-events-none animate-radar-pulse" />
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-[#6B756E]">
                <Wifi className="w-3.5 h-3.5 text-[#1F6B4F]" />
                <span className="tabular-nums font-mono">RSSI: -52 dBm</span>
                <span className="text-[#C5D0C9]">•</span>
                <span className="tabular-nums">Gate 01 (922.5 MHz)</span>
              </div>
            </div>

            {/* Cattle Metadata Columns */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              {/* Status Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F6B4F]">
                    <span className="h-2 w-2 rounded-full bg-[#1F6B4F] animate-live-dot" />
                    RFID Detected
                  </span>
                  <span className="text-xs text-[#6B756E] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="tabular-nums font-medium text-[#17221C]">10:42:16 WIB</span>
                  </span>
                </div>

                <StatusBadge status="Aktif" />
              </div>

              {/* Grid of Key Properties */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 p-4 rounded-xl bg-[#F7F9F7] border border-[#E5EAE6]">
                <div>
                  <span className="text-[11px] font-medium text-[#6B756E] block mb-0.5">
                    Kode Sapi
                  </span>
                  <span className="text-base font-semibold text-[#17221C] tabular-nums tracking-tight">
                    {sampleCattle.id}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-medium text-[#6B756E] block mb-0.5">
                    Nama / Identitas
                  </span>
                  <span className="text-sm font-semibold text-[#17221C] truncate block">
                    {sampleCattle.name}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-medium text-[#6B756E] block mb-0.5">
                    Ras Ternak
                  </span>
                  <span className="text-sm font-medium text-[#1F6B4F]">
                    {sampleCattle.breed}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-medium text-[#6B756E] block mb-0.5">
                    Jenis Kelamin
                  </span>
                  <span className="text-sm text-[#17221C]">
                    {sampleCattle.gender}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-medium text-[#6B756E] block mb-0.5">
                    Estimasi Umur
                  </span>
                  <span className="text-sm text-[#17221C] tabular-nums">
                    {sampleCattle.age}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-medium text-[#6B756E] block mb-0.5">
                    Bobot Terakhir
                  </span>
                  <span className="text-sm font-semibold text-[#17221C] tabular-nums">
                    {sampleCattle.weight}
                  </span>
                </div>
              </div>

              {/* RFID Code Banner */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-white border border-[#E5EAE6]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F7F9F7] text-[#1F6B4F] flex items-center justify-center shrink-0 border border-[#E5EAE6]">
                    <Radio className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#6B756E] tracking-wider block">
                      Electronic Ear Tag RFID (ISO 11784/11785)
                    </span>
                    <span className="font-mono text-sm font-semibold text-[#17221C] tracking-wide tabular-nums">
                      982 000 412 345 678
                    </span>
                  </div>
                </div>

                <Link
                  href="/cattle"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#1F6B4F] bg-[#EAF5EF] hover:bg-[#DDF0E5] transition-colors active:scale-[0.96] shrink-0"
                >
                  Detail Ternak
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {mode === 'scanning' && (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="relative mb-5">
              <div className="w-20 h-20 rounded-full bg-[#EAF5EF] border border-[#C8E5D5] flex items-center justify-center text-[#1F6B4F]">
                <Radio className="w-9 h-9 animate-pulse" />
              </div>
              <div className="absolute -inset-3 rounded-full border-2 border-[#1F6B4F]/30 animate-radar-pulse" />
            </div>

            <div className="inline-flex items-center gap-2 text-[#1F6B4F] text-xs font-semibold mb-2">
              <span className="h-2 w-2 rounded-full bg-[#1F6B4F] animate-ping" />
              Scanning...
            </div>
            <h3 className="text-base font-semibold text-[#17221C]">
              Mendeteksi Gelombang RFID Gate 01
            </h3>
            <p className="text-xs text-[#6B756E] max-w-sm mt-1">
              Antena UHF aktif memindai transponder ear tag saat sapi melintasi gerbang lorong.
            </p>
          </div>
        )}

        {mode === 'waiting' && (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#F7F9F7] border border-[#E5EAE6] flex items-center justify-center text-[#6B756E] mb-4">
              <Cpu className="w-8 h-8 opacity-60 stroke-[1.5]" />
            </div>
            <div className="text-xs font-medium text-[#6B756E] mb-1">
              Standby Mode
            </div>
            <h3 className="text-base font-semibold text-[#17221C]">
              Menunggu RFID...
            </h3>
            <p className="text-xs text-[#6B756E] max-w-sm mt-1">
              Reader siap mendeteksi RFID ternak yang melewati Smart Cattle Gate.
            </p>
          </div>
        )}

        {mode === 'unknown' && (
          <div className="p-6 rounded-xl bg-[#FFFDF5] border border-[#FDE68A] flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1 text-xs text-[#6B756E]">
                <span className="font-semibold text-[#92400E]">Anomali Deteksi</span>
                <span>•</span>
                <span className="tabular-nums">10:33:01 WIB • Gate 01</span>
              </div>
              <h3 className="text-base font-semibold text-[#17221C]">
                RFID Tidak Dikenal
              </h3>
              <p className="text-xs text-[#6B756E] mt-0.5 mb-3">
                Transponder RFID terbaca tetapi nomor ID ini belum terdaftar pada basis data Smart Cattle Gate.
              </p>
              <div className="font-mono text-xs font-semibold text-[#17221C] bg-white px-3 py-1.5 rounded-lg border border-[#FDE68A] inline-block mb-3 tabular-nums">
                RFID: 982000499999992
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <Link
                  href="/cattle"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-[#1F6B4F] hover:bg-[#17533D] transition-colors active:scale-[0.96]"
                >
                  Daftarkan Sapi Baru
                </Link>
                <button
                  onClick={() => setMode('detected')}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#6B756E] hover:text-[#17221C] transition-colors"
                >
                  Abaikan Notifikasi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
