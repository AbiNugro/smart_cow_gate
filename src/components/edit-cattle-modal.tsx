'use client';

import React, { useState, useEffect } from 'react';
import { Cattle, CattleBreed, CattleGender, CattleStatus } from '@/types';
import { X, Check, Edit3 } from 'lucide-react';

interface EditCattleModalProps {
  cattle: Cattle | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Cattle) => void;
}

export function EditCattleModal({ cattle, isOpen, onClose, onSave }: EditCattleModalProps) {
  const [formData, setFormData] = useState<Partial<Cattle>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (cattle) {
      setFormData({ ...cattle });
    }
  }, [cattle]);

  if (!isOpen || !cattle) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSave({ ...cattle, ...formData } as Cattle);
      setSubmitted(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl border border-[#E5EAE6] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5EAE6] bg-[#F7F9F7] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#EAF5EF] text-[#1F6B4F] flex items-center justify-center">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#17221C]">
                Edit Data Sapi: {cattle.id}
              </h3>
              <p className="text-xs text-[#6B756E]">
                Perbarui informasi biometrik atau nomor tag RFID
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup edit modal"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B756E] hover:text-[#17221C] hover:bg-[#E5EAE6] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#EAF5EF] text-[#1F6B4F] flex items-center justify-center border border-[#C8E5D5]">
              <Check className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h4 className="text-sm font-semibold text-[#17221C]">
              Perubahan Disimpan
            </h4>
            <p className="text-xs text-[#6B756E]">
              Data sapi {cattle.id} berhasil diperbarui.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block font-medium text-[#17221C] mb-1">
                  Kode Sapi
                </label>
                <input
                  type="text"
                  value={formData.id || ''}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5EAE6] bg-[#F7F9F7] text-[#17221C] font-mono focus:bg-white focus:border-[#1F6B4F] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-[#17221C] mb-1">
                  Nama / Julukan Sapi
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5EAE6] bg-[#F7F9F7] text-[#17221C] focus:bg-white focus:border-[#1F6B4F] focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-[#17221C] mb-1">
                Nomor RFID Ear Tag (15 Digit)
              </label>
              <input
                type="text"
                value={formData.rfid || ''}
                onChange={(e) => setFormData({ ...formData, rfid: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#E5EAE6] bg-[#F7F9F7] text-[#17221C] font-mono focus:bg-white focus:border-[#1F6B4F] focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block font-medium text-[#17221C] mb-1">
                  Ras Ternak
                </label>
                <select
                  value={formData.breed || 'Limousin'}
                  onChange={(e) => setFormData({ ...formData, breed: e.target.value as CattleBreed })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5EAE6] bg-[#F7F9F7] text-[#17221C] focus:bg-white focus:border-[#1F6B4F] focus:outline-none"
                >
                  <option value="Limousin">Limousin</option>
                  <option value="Simental">Simental</option>
                  <option value="Brahman">Brahman</option>
                  <option value="PO (Peranakan Ongole)">PO (Peranakan Ongole)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-[#17221C] mb-1">
                  Jenis Kelamin
                </label>
                <select
                  value={formData.gender || 'Jantan'}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as CattleGender })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5EAE6] bg-[#F7F9F7] text-[#17221C] focus:bg-white focus:border-[#1F6B4F] focus:outline-none"
                >
                  <option value="Jantan">Jantan</option>
                  <option value="Betina">Betina</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block font-medium text-[#17221C] mb-1">
                  Umur
                </label>
                <input
                  type="text"
                  value={formData.age || ''}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5EAE6] bg-[#F7F9F7] text-[#17221C] focus:bg-white focus:border-[#1F6B4F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-[#17221C] mb-1">
                  Bobot
                </label>
                <input
                  type="text"
                  value={formData.weight || ''}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5EAE6] bg-[#F7F9F7] text-[#17221C] focus:bg-white focus:border-[#1F6B4F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-[#17221C] mb-1">
                  Status
                </label>
                <select
                  value={formData.status || 'Aktif'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as CattleStatus })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5EAE6] bg-[#F7F9F7] text-[#17221C] focus:bg-white focus:border-[#1F6B4F] focus:outline-none"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Tidak Aktif">Tidak Aktif</option>
                </select>
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
                Simpan Perubahan
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
