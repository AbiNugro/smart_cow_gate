'use client';

import React, { useEffect } from 'react';
import { Cattle } from '@/types';
import { CattleAvatar } from './cattle-avatar';
import { StatusBadge } from './status-badge';
import { X, Radio, Calendar, Clock, MapPin, Tag, Activity, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface CattleDetailDrawerProps {
  cattle: Cattle | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CattleDetailDrawer({ cattle, isOpen, onClose }: CattleDetailDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !cattle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-[3px] transition-opacity duration-200 animate-in fade-in"
      />

      {/* Centered Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl border border-[#E5EAE6] shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh] animate-in fade-in zoom-in-95 duration-200 ease-out">
        {/* Modal Topbar */}
        <div className="px-6 py-4 border-b border-[#E5EAE6] flex items-center justify-between bg-[#F7F9F7]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-[#6B756E]">
              Detail Informasi Ternak
            </span>
            <StatusBadge status={cattle.status} />
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup detail sapi"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B756E] hover:text-[#17221C] hover:bg-[#E5EAE6] transition-colors active:scale-[0.96]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Header Identity Card */}
          <div className="p-4 rounded-2xl bg-[#F7F9F7] border border-[#E5EAE6] flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="p-1 rounded-2xl bg-white border border-[#E5EAE6] shrink-0">
              <CattleAvatar
                breed={cattle.breed}
                id={cattle.id}
                size="lg"
                className="rounded-xl outline-1 outline-black/5"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-xl font-bold text-[#17221C] tabular-nums tracking-tight">
                  {cattle.id}
                </h3>
                <span className="text-xs font-medium text-[#1F6B4F]">
                  • {cattle.breed}
                </span>
              </div>
              <p className="text-xs text-[#6B756E] font-medium truncate mt-0.5">
                {cattle.name}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-xs text-[#1F6B4F] font-mono">
                <Radio className="w-3.5 h-3.5 shrink-0" />
                <span className="tabular-nums font-semibold">RFID: {cattle.rfid}</span>
              </div>
            </div>
          </div>

          {/* General Metadata Section */}
          <div>
            <h4 className="text-xs font-medium text-[#6B756E] mb-3">
              Informasi Biometrik & Fisik
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-white border border-[#E5EAE6]">
                <span className="text-[11px] text-[#6B756E] block mb-0.5">Jenis Kelamin</span>
                <span className="text-sm font-semibold text-[#17221C]">{cattle.gender}</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E5EAE6]">
                <span className="text-[11px] text-[#6B756E] block mb-0.5">Umur Saat Ini</span>
                <span className="text-sm font-semibold text-[#17221C] tabular-nums">{cattle.age}</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E5EAE6]">
                <span className="text-[11px] text-[#6B756E] block mb-0.5">Bobot Ternak</span>
                <span className="text-sm font-semibold text-[#17221C] tabular-nums">{cattle.weight}</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E5EAE6]">
                <span className="text-[11px] text-[#6B756E] block mb-0.5">Kondisi Fisik</span>
                <span className="text-sm font-semibold text-[#1F6B4F] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {cattle.healthStatus || 'Sehat'}
                </span>
              </div>
            </div>
          </div>

          {/* Registration & Detection Record */}
          <div>
            <h4 className="text-xs font-medium text-[#6B756E] mb-3">
              Pencatatan Sistem
            </h4>

            <div className="p-3.5 rounded-xl bg-[#F7F9F7] border border-[#E5EAE6] space-y-2.5 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-[#E5EAE6]/60">
                <span className="text-[#6B756E] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Tanggal Lahir
                </span>
                <span className="font-medium text-[#17221C]">{cattle.birthDate}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-[#E5EAE6]/60">
                <span className="text-[#6B756E] flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  Tanggal Terdaftar
                </span>
                <span className="font-medium text-[#17221C]">{cattle.registeredDate}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-[#6B756E] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Terakhir Terdeteksi
                </span>
                <span className="font-medium text-[#1F6B4F] tabular-nums">
                  {cattle.lastDetected} ({cattle.lastGate})
                </span>
              </div>
            </div>
          </div>

          {/* Riwayat Identifikasi Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-medium text-[#6B756E]">
                Riwayat Identifikasi
              </h4>
              <span className="text-[11px] text-[#6B756E]">Aktivitas Terakhir</span>
            </div>

            <div className="space-y-2">
              {cattle.history.slice(0, 4).map((rec) => (
                <div
                  key={rec.id}
                  className="p-3 rounded-xl bg-white border border-[#E5EAE6] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#F7F9F7] text-[#1F6B4F] flex items-center justify-center shrink-0 border border-[#E5EAE6]">
                      <Activity className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-medium text-[#17221C] block tabular-nums">
                        {rec.date} - {rec.timestamp}
                      </span>
                      <span className="text-[11px] text-[#6B756E] flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 text-[#6B756E]" />
                        {rec.gate}
                      </span>
                    </div>
                  </div>

                  <StatusBadge status={rec.status} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 px-6 border-t border-[#E5EAE6] bg-[#F7F9F7] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-[#6B756E] hover:text-[#17221C] bg-white border border-[#E5EAE6] hover:bg-[#F3F4F6] transition-colors active:scale-[0.96]"
          >
            Tutup
          </button>

          <Link
            href="/history"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#1F6B4F] hover:bg-[#17533D] transition-colors flex items-center gap-1.5 active:scale-[0.96]"
          >
            Buka Riwayat Lengkap
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
