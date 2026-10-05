'use client';

import React, { useState } from 'react';
import { X, Radio, Plus, Check } from 'lucide-react';
import { CattleBreed, CattleGender } from '@/types';

interface AddCattleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AddCattleModal({ isOpen, onClose, onSuccess }: AddCattleModalProps) {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      onSuccess?.();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-[#E5EAE6] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5EAE6] bg-[#F7F9F7] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#EAF5EF] text-[#1F6B4F] flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#17221C]">
                Registrasi Sapi Baru
              </h3>
              <p className="text-xs text-[#6B756E]">
                Masukkan data biometrik dan pasang transponder RFID ear tag
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup form"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B756E] hover:text-[#17221C] hover:bg-[#E5EAE6] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        {submitted ? (
          <div className="p-10 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#EAF5EF] text-[#1F6B4F] flex items-center justify-center border border-[#C8E5D5] animate-bounce">
              <Check className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h4 className="text-base font-semibold text-[#17221C]">
              Sapi Berhasil Didaftarkan
            </h4>
            <p className="text-xs text-[#6B756E]">
              Data ternak dan nomor RFID telah terhubung pada sistem Smart Cattle Gate.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-[#17221C] mb-1">
                  Kode Identifikasi Sapi *
                </label>
                <input
                  type="text"
                  required
                  defaultValue="SCG-105"
                  className="w-full px-3 py-2 rounded-xl border border-[#E5EAE6] bg-[#F7F9F7] text-[#17221C] focus:outline-none focus:border-[#1F6B4F] focus:bg-white font-mono"
                  placeholder="Contoh: SCG-105"
                />
              </div>

              <div>
                <label className="block font-medium text-[#17221C] mb-1">
                  Nama / Julukan
                </label>
                <input
                  type="text"
                  defaultValue="Sapi 105 (Guntur)"
                  className="w-full px-3 py-2 rounded-xl border border-[#E5EAE6] bg-[#F7F9F7] text-[#17221C] focus:outline-none focus:border-[#1F6B4F] focus:bg-white"
                  placeholder="Contoh: Guntur"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-[#17221C] mb-1">
                Nomor RFID Ear Tag (ISO 11784/11785) *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  defaultValue="982000412346129"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E5EAE6] bg-[#F7F9F7] text-[#17221C] focus:outline-none focus:border-[#1F6B4F] focus:bg-white font-mono"
                  placeholder="15 digit RFID"
                />
                <Radio className="w-4 h-4 text-[#1F6B4F] absolute left-3 top-2.5" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-[#17221C] mb-1">
                  Ras Ternak *
                </label>
                <select
                  defaultValue="Limousin"
                  className="w-full px-3 py-2 rounded-xl border border-[#E5EAE6] bg-[#F7F9F7] text-[#17221C] focus:outline-none focus:border-[#1F6B4F] focus:bg-white"
                >
                  <option value="Limousin">Limousin</option>
                  <option value="Simental">Simental</option>
                  <option value="Brahman">Brahman</option>
                  <option value="PO (Peranakan Ongole)">PO (Peranakan Ongole)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-[#17221C] mb-1">
                  Jenis Kelamin *
                </label>
                <select
                  defaultValue="Jantan"
                  className="w-full px-3 py-2 rounded-xl border border-[#E5EAE6] bg-[#F7F9F7] text-[#17221C] focus:outline-none focus:border-[#1F6B4F] focus:bg-white"
                >
                  <option value="Jantan">Jantan</option>
                  <option value="Betina">Betina</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-[#17221C] mb-1">
                  Estimasi Umur
                </label>
                <input
                  type="text"
                  defaultValue="16 bulan"
                  className="w-full px-3 py-2 rounded-xl border border-[#E5EAE6] bg-[#F7F9F7] text-[#17221C] focus:outline-none focus:border-[#1F6B4F] focus:bg-white"
                  placeholder="Contoh: 18 bulan"
                />
              </div>

              <div>
                <label className="block font-medium text-[#17221C] mb-1">
                  Bobot Awal (kg)
                </label>
                <input
                  type="text"
                  defaultValue="510 kg"
                  className="w-full px-3 py-2 rounded-xl border border-[#E5EAE6] bg-[#F7F9F7] text-[#17221C] focus:outline-none focus:border-[#1F6B4F] focus:bg-white"
                  placeholder="Contoh: 520 kg"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-[#E5EAE6] flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#6B756E] hover:text-[#17221C] hover:bg-[#F3F4F6] transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#1F6B4F] hover:bg-[#17533D] transition-colors active:scale-[0.96]"
              >
                Simpan & Daftarkan
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
