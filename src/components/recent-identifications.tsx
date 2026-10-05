'use client';

import React from 'react';
import { IDENTIFICATION_LOGS } from '@/data/cattle-data';
import { CattleAvatar } from './cattle-avatar';
import { StatusBadge } from './status-badge';
import Link from 'next/link';
import { ArrowUpRight, Clock, MapPin } from 'lucide-react';

interface RecentIdentificationsProps {
  onSelectCattle?: (cattleId: string) => void;
  limit?: number;
}

export function RecentIdentifications({ onSelectCattle, limit = 5 }: RecentIdentificationsProps) {
  const recentLogs = IDENTIFICATION_LOGS.slice(0, limit);

  return (
    <div className="farm-card rounded-2xl p-6 bg-white border border-[#E5EAE6] h-full flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base font-semibold text-[#17221C] tracking-tight">
              Identifikasi Terbaru
            </h3>
            <p className="text-xs text-[#6B756E] mt-0.5">
              Log lintasan ternak melalui smart gate hari ini
            </p>
          </div>

          <Link
            href="/history"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#1F6B4F] hover:text-[#17533D] transition-colors"
          >
            Lihat Semua
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E5EAE6] text-[#6B756E] uppercase font-medium tracking-wider text-[11px]">
                <th className="py-2.5 px-3">Sapi</th>
                <th className="py-2.5 px-3">RFID Tag</th>
                <th className="py-2.5 px-3">Ras</th>
                <th className="py-2.5 px-3">Waktu</th>
                <th className="py-2.5 px-3">Lokasi Gate</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAE6]/60">
              {recentLogs.map((log) => (
                <tr
                  key={log.id}
                  onClick={() => log.cattleId !== 'Unknown' && onSelectCattle?.(log.cattleId)}
                  className="hover:bg-[#F7F9F7] transition-colors group cursor-pointer"
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <CattleAvatar breed={log.breed} id={log.cattleId} size="sm" showTagBadge={false} />
                      <div>
                        <span className="font-semibold text-[#17221C] group-hover:text-[#1F6B4F] transition-colors block tabular-nums">
                          {log.cattleId}
                        </span>
                        <span className="text-[11px] text-[#6B756E] truncate max-w-[120px] block">
                          {log.name}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 font-mono text-[11px] text-[#4A5568] tabular-nums">
                    {log.rfid}
                  </td>

                  <td className="py-3 px-3 text-[#17221C] font-medium">
                    {log.breed !== '-' ? log.breed : <span className="text-[#9CA3AF]">-</span>}
                  </td>

                  <td className="py-3 px-3 text-[#6B756E] tabular-nums whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#9CA3AF]" />
                      <span>{log.time}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-[#4B5563] text-xs">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#6B756E]" />
                      <span>{log.gate}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-center">
                    <StatusBadge status={log.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-2.5">
          {recentLogs.map((log) => (
            <div
              key={log.id}
              onClick={() => log.cattleId !== 'Unknown' && onSelectCattle?.(log.cattleId)}
              className="p-3.5 rounded-xl border border-[#E5EAE6] bg-[#F7F9F7] flex items-center justify-between gap-3 active:scale-[0.98] transition-transform"
            >
              <div className="flex items-center gap-3 min-w-0">
                <CattleAvatar breed={log.breed} id={log.cattleId} size="md" showTagBadge={false} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-[#17221C]">
                      {log.cattleId}
                    </span>
                    <span className="text-[11px] text-[#6B756E]">
                      {log.gate}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6B756E] truncate mt-0.5">
                    {log.breed !== '-' ? log.breed : 'Tidak Terdaftar'} • {log.time}
                  </p>
                  <p className="font-mono text-[10px] text-[#9CA3AF] tabular-nums">
                    {log.rfid}
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-center pl-2">
                <StatusBadge status={log.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
