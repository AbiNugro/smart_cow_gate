'use client';

import React, { useState, useMemo } from 'react';
import { IDENTIFICATION_LOGS } from '@/data/cattle-data';
import { CattleAvatar } from './cattle-avatar';
import { StatusBadge } from './status-badge';
import { Search, Filter, Calendar, Clock, MapPin, Radio, Download, CheckCircle2, RotateCcw } from 'lucide-react';

interface IdentificationTableProps {
  onSelectCattleId?: (cattleId: string) => void;
}

export function IdentificationTable({ onSelectCattleId }: IdentificationTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Semua' | 'Berhasil' | 'Tidak Dikenal'>('Semua');
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-05');
  const [useDateFilter, setUseDateFilter] = useState<boolean>(true);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Filtered Logs
  const filteredLogs = useMemo(() => {
    return IDENTIFICATION_LOGS.filter((log) => {
      const matchSearch =
        log.cattleId.toLowerCase().includes(search.toLowerCase()) ||
        log.rfid.includes(search) ||
        log.name.toLowerCase().includes(search.toLowerCase()) ||
        log.gate.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === 'Semua' || log.status === statusFilter;

      let matchDate = true;
      if (useDateFilter && selectedDate) {
        // Parse date e.g. "2026-10-05" -> day: 05, month: 10
        const [year, month, day] = selectedDate.split('-');
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        const shortMonth = monthNames[parseInt(month, 10) - 1];
        const datePattern = `${day} ${shortMonth}`; // e.g. "05 Okt"
        matchDate = log.date.includes(datePattern);
      }

      return matchSearch && matchStatus && matchDate;
    });
  }, [search, statusFilter, selectedDate, useDateFilter]);

  // Export temporary CSV function
  const handleExportCSV = () => {
    const headers = ["ID Log", "Waktu", "Tanggal", "ID Sapi", "Nama Sapi", "Nomor RFID", "Ras", "Gate", "Status Identifikasi"];
    const rows = filteredLogs.map((log) => [
      log.id,
      log.time,
      log.date,
      log.cattleId,
      `"${log.name}"`,
      `'${log.rfid}`,
      log.breed,
      log.gate,
      log.status,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Smart_Cattle_Gate_Log_${selectedDate || 'all'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice(`Berhasil mengekspor ${filteredLogs.length} data pemindaian.`);
    setTimeout(() => setExportNotice(null), 3500);
  };

  return (
    <div className="space-y-4">
      {/* Toast Notice */}
      {exportNotice && (
        <div className="p-3 rounded-xl bg-[#EAF5EF] border border-[#C8E5D5] text-xs font-medium text-[#1F6B4F] flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{exportNotice}</span>
          </div>
          <button onClick={() => setExportNotice(null)} className="text-xs hover:underline">
            Tutup
          </button>
        </div>
      )}

      {/* Toolbar Search & Date Picker & Filter */}
      <div className="farm-card rounded-2xl p-4 bg-white border border-[#E5EAE6] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#6B756E] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari RFID atau ID sapi..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F7F9F7] border border-[#E5EAE6] text-xs text-[#17221C] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1F6B4F] focus:bg-white transition-all"
          />
        </div>

        {/* Date Picker & Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Interactive Date Picker */}
          <div className="flex items-center gap-1.5 p-1 px-2 rounded-xl bg-[#F7F9F7] border border-[#E5EAE6] text-xs">
            <Calendar className="w-3.5 h-3.5 text-[#1F6B4F] shrink-0" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setUseDateFilter(true);
              }}
              className="bg-transparent text-xs font-medium text-[#17221C] focus:outline-none cursor-pointer"
            />
            {useDateFilter && (
              <button
                onClick={() => setUseDateFilter(false)}
                title="Tampilkan Semua Tanggal"
                className="text-[10px] text-[#6B756E] hover:text-[#17221C] px-1 font-medium underline"
              >
                Semua
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-[#F7F9F7] border border-[#E5EAE6] text-xs font-medium text-[#17221C] focus:outline-none focus:border-[#1F6B4F] cursor-pointer"
            >
              <option value="Semua">Semua Status</option>
              <option value="Berhasil">Berhasil</option>
              <option value="Tidak Dikenal">Tidak Dikenal</option>
            </select>
            <Filter className="w-3 h-3 text-[#6B756E] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Export Log Action Button */}
          <button
            onClick={handleExportCSV}
            title="Ekspor CSV Riwayat Pemindaian"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-[#17221C] bg-[#F7F9F7] hover:bg-[#E5EAE6] border border-[#E5EAE6] transition-colors active:scale-[0.96]"
          >
            <Download className="w-3.5 h-3.5 text-[#1F6B4F]" />
            <span>Ekspor Log</span>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="farm-card rounded-2xl bg-white border border-[#E5EAE6] overflow-hidden">
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E5EAE6] bg-[#F7F9F7]/70 text-[#6B756E] uppercase font-medium tracking-wider text-[11px]">
                <th className="py-2.5 px-4">Waktu Pemindaian</th>
                <th className="py-2.5 px-4">ID Sapi</th>
                <th className="py-2.5 px-4">RFID Ear Tag</th>
                <th className="py-2.5 px-4">Ras</th>
                <th className="py-2.5 px-4">Lokasi Gate</th>
                <th className="py-2.5 px-4 text-center">Status Identifikasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAE6]/60">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#6B756E]">
                    Tidak ada riwayat pemindaian untuk tanggal atau kriteria yang dipilih.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  const isUnknown = log.status === 'Tidak Dikenal';

                  return (
                    <tr
                      key={log.id}
                      onClick={() => !isUnknown && onSelectCattleId?.(log.cattleId)}
                      className={`hover:bg-[#F7F9F7] transition-colors group ${
                        !isUnknown ? 'cursor-pointer' : 'bg-[#FFFDF5]/40'
                      }`}
                    >
                      <td className="py-3 px-4 tabular-nums text-[#6B756E] whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#9CA3AF]" />
                          <span className="font-medium text-[#17221C]">{log.time}</span>
                          <span className="text-[11px] text-[#9CA3AF]">({log.date})</span>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          {!isUnknown ? (
                            <CattleAvatar breed={log.breed} id={log.cattleId} size="sm" showTagBadge={false} />
                          ) : (
                            <div className="w-7 h-7 rounded-lg bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0">
                              <Radio className="w-3.5 h-3.5" />
                            </div>
                          )}
                          <div>
                            <span
                              className={`font-semibold text-xs block tabular-nums ${
                                !isUnknown
                                  ? 'text-[#17221C] group-hover:text-[#1F6B4F]'
                                  : 'text-[#B45309]'
                              }`}
                            >
                              {log.cattleId}
                            </span>
                            <span className="text-[11px] text-[#6B756E] block truncate max-w-[120px]">
                              {log.name}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-mono text-[11px] text-[#374151] tabular-nums">
                        <div className="flex items-center gap-1.5">
                          <Radio className="w-3 h-3 text-[#1F6B4F]" />
                          <span>{log.rfid}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-[#17221C] font-medium">
                        {log.breed !== '-' ? log.breed : <span className="text-[#9CA3AF]">-</span>}
                      </td>

                      <td className="py-3 px-4 text-[#4B5563]">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#6B756E]" />
                          <span>{log.gate}</span>
                        </div>
                      </td>

                      {/* Kolom status identifikasi rata tengah & tanpa lingkaran */}
                      <td className="py-3 px-4 text-center">
                        <StatusBadge status={isUnknown ? 'Tidak Dikenal' : 'Berhasil'} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-[#E5EAE6]">
          {filteredLogs.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#6B756E]">
              Tidak ada data riwayat pemindaian.
            </div>
          ) : (
            filteredLogs.map((log) => {
              const isUnknown = log.status === 'Tidak Dikenal';

              return (
                <div
                  key={log.id}
                  onClick={() => !isUnknown && onSelectCattleId?.(log.cattleId)}
                  className={`p-4 transition-colors ${
                    !isUnknown ? 'active:bg-[#F7F9F7]' : 'bg-[#FFFDF5]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 text-xs text-[#6B756E] tabular-nums">
                      <Clock className="w-3 h-3 text-[#9CA3AF]" />
                      <span className="font-semibold text-[#17221C]">{log.time}</span>
                      <span>• {log.date}</span>
                    </div>

                    <div className="text-center">
                      <StatusBadge status={isUnknown ? 'Tidak Dikenal' : 'Berhasil'} />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {!isUnknown ? (
                      <CattleAvatar breed={log.breed} id={log.cattleId} size="sm" showTagBadge={false} />
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0">
                        <Radio className="w-4 h-4" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#17221C]">
                          {log.cattleId}
                        </span>
                        <span className="text-[11px] text-[#6B756E]">
                          • {log.gate}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6B756E] truncate">
                        {log.breed !== '-' ? log.breed : 'Belum Dikenal'} • {log.name}
                      </p>
                      <p className="font-mono text-[10px] text-[#4A5568] tabular-nums mt-0.5">
                        RFID: {log.rfid}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F7F9F7]/70 border-t border-[#E5EAE6] flex items-center justify-between text-xs text-[#6B756E]">
          <span>
            Total ditampilkan: <strong className="text-[#17221C] font-semibold">{filteredLogs.length}</strong> record
          </span>
          <span className="text-[11px]">Format Transponder ISO 11784/11785</span>
        </div>
      </div>
    </div>
  );
}
