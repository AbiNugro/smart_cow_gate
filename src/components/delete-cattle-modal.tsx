'use client';

import React from 'react';
import { Cattle } from '@/types';
import { Trash2, AlertTriangle, X } from 'lucide-react';

interface DeleteCattleModalProps {
  cattle: Cattle | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export function DeleteCattleModal({ cattle, isOpen, onClose, onConfirm }: DeleteCattleModalProps) {
  if (!isOpen || !cattle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl border border-[#E5EAE6] shadow-2xl p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0 border border-[#FECACA]">
            <Trash2 className="w-5 h-5 stroke-[2]" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-[#17221C]">
              Hapus Data Sapi {cattle.id}?
            </h3>
            <p className="text-xs text-[#6B756E] mt-1 text-pretty">
              Apakah Anda yakin ingin menghapus data <strong>{cattle.name}</strong> ({cattle.rfid}) dari sistem Smart Cattle Gate?
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Batal"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#6B756E] hover:text-[#17221C] hover:bg-[#F3F4F6]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-[#6B756E] hover:text-[#17221C] hover:bg-[#F3F4F6] transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(cattle.id);
              onClose();
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#DC2626] hover:bg-[#B91C1C] transition-colors active:scale-[0.96]"
          >
            Ya, Hapus Data
          </button>
        </div>
      </div>
    </div>
  );
}
