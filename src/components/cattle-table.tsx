'use client';

import React, { useState, useMemo } from 'react';
import { CATTLE_LIST } from '@/data/cattle-data';
import { Cattle, CattleBreed, CattleStatus } from '@/types';
import { CattleAvatar } from './cattle-avatar';
import { StatusBadge } from './status-badge';
import { Search, Filter, Plus, Eye, Edit3, Trash2, Clock, Radio, ChevronRight, CheckCircle2 } from 'lucide-react';
import { AddCattleModal } from './add-cattle-modal';
import { EditCattleModal } from './edit-cattle-modal';
import { DeleteCattleModal } from './delete-cattle-modal';

interface CattleTableProps {
  onSelectCattle: (cattle: Cattle) => void;
}

export function CattleTable({ onSelectCattle }: CattleTableProps) {
  const [cattleData, setCattleData] = useState<Cattle[]>(CATTLE_LIST);
  const [search, setSearch] = useState('');
  const [selectedBreed, setSelectedBreed] = useState<string>('Semua Ras');
  const [selectedStatus, setSelectedStatus] = useState<string>('Semua');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCattle, setEditingCattle] = useState<Cattle | null>(null);
  const [deletingCattle, setDeletingCattle] = useState<Cattle | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveEdit = (updated: Cattle) => {
    setCattleData((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
    showNotification(`Data sapi ${updated.id} berhasil diperbarui.`);
  };

  const handleDelete = (id: string) => {
    setCattleData((prev) => prev.filter((c) => c.id !== id));
    showNotification(`Data sapi ${id} telah dihapus.`);
  };

  // Filtered List
  const filteredCattle = useMemo(() => {
    return cattleData.filter((item) => {
      const matchSearch =
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.rfid.includes(search) ||
        item.name.toLowerCase().includes(search.toLowerCase());

      const matchBreed =
        selectedBreed === 'Semua Ras' || item.breed === selectedBreed;

      const matchStatus =
        selectedStatus === 'Semua' || item.status === selectedStatus;

      return matchSearch && matchBreed && matchStatus;
    });
  }, [cattleData, search, selectedBreed, selectedStatus]);

  return (
    <div className="space-y-4">
      {/* Toast Notification */}
      {notification && (
        <div className="p-3 rounded-xl bg-[#EAF5EF] border border-[#C8E5D5] text-xs font-medium text-[#1F6B4F] flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{notification}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-xs text-[#1F6B4F] hover:underline"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="farm-card rounded-2xl p-4 bg-white border border-[#E5EAE6] flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#6B756E] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari ID sapi atau RFID..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F7F9F7] border border-[#E5EAE6] text-xs text-[#17221C] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1F6B4F] focus:bg-white transition-all"
          />
        </div>

        {/* Filter Dropdowns + Action Button */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Breed Filter */}
          <div className="relative">
            <select
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-[#F7F9F7] border border-[#E5EAE6] text-xs font-medium text-[#17221C] focus:outline-none focus:border-[#1F6B4F] cursor-pointer"
            >
              <option value="Semua Ras">Semua Ras</option>
              <option value="Limousin">Limousin</option>
              <option value="Simental">Simental</option>
              <option value="Brahman">Brahman</option>
              <option value="PO (Peranakan Ongole)">PO (Peranakan Ongole)</option>
            </select>
            <Filter className="w-3 h-3 text-[#6B756E] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-[#F7F9F7] border border-[#E5EAE6] text-xs font-medium text-[#17221C] focus:outline-none focus:border-[#1F6B4F] cursor-pointer"
            >
              <option value="Semua">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Tidak Aktif">Tidak Aktif</option>
            </select>
            <Filter className="w-3 h-3 text-[#6B756E] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Add Cattle Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#1F6B4F] hover:bg-[#17533D] transition-colors shadow-xs active:scale-[0.96]"
          >
            <Plus className="w-4 h-4" />
            Tambah Sapi
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="farm-card rounded-2xl bg-white border border-[#E5EAE6] overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E5EAE6] bg-[#F7F9F7]/70 text-[#6B756E] uppercase font-medium tracking-wider text-[11px]">
                <th className="py-2.5 px-4">Sapi</th>
                <th className="py-2.5 px-4">RFID Ear Tag</th>
                <th className="py-2.5 px-4">Ras</th>
                <th className="py-2.5 px-4">Kelamin</th>
                <th className="py-2.5 px-4">Umur</th>
                <th className="py-2.5 px-4">Terakhir Terdeteksi</th>
                <th className="py-2.5 px-4 text-center">Status</th>
                <th className="py-2.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAE6]/60">
              {filteredCattle.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#6B756E]">
                    Tidak ditemukan data sapi yang sesuai.
                  </td>
                </tr>
              ) : (
                filteredCattle.map((cattle) => (
                  <tr
                    key={cattle.id}
                    onClick={() => onSelectCattle(cattle)}
                    className="hover:bg-[#F7F9F7] transition-colors group cursor-pointer"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <CattleAvatar breed={cattle.breed} id={cattle.id} size="sm" />
                        <div>
                          <span className="font-semibold text-xs text-[#17221C] group-hover:text-[#1F6B4F] transition-colors block tabular-nums">
                            {cattle.id}
                          </span>
                          <span className="text-[11px] text-[#6B756E] truncate max-w-[130px] block">
                            {cattle.name}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px] text-[#374151] tabular-nums">
                      <div className="flex items-center gap-1.5">
                        <Radio className="w-3 h-3 text-[#1F6B4F]" />
                        <span>{cattle.rfid}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-[#17221C] font-medium">
                      {cattle.breed}
                    </td>

                    <td className="py-3 px-4 text-[#4B5563]">
                      {cattle.gender}
                    </td>

                    <td className="py-3 px-4 text-[#17221C] tabular-nums font-medium">
                      {cattle.age}
                    </td>

                    <td className="py-3 px-4 text-[#6B756E] tabular-nums whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#9CA3AF]" />
                        <span>{cattle.lastDetected}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <StatusBadge status={cattle.status} />
                    </td>

                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onSelectCattle(cattle)}
                          title="Lihat Detail"
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-[#6B756E] hover:text-[#1F6B4F] hover:bg-[#EAF5EF] transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingCattle(cattle)}
                          title="Edit Data Sapi"
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-[#6B756E] hover:text-[#17221C] hover:bg-[#F3F4F6] transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingCattle(cattle)}
                          title="Hapus Data Sapi"
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-[#6B756E] hover:text-[#DC2626] hover:bg-[#FEE2E2] transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden divide-y divide-[#E5EAE6]/80">
          {filteredCattle.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#6B756E]">
              Tidak ditemukan data sapi yang sesuai.
            </div>
          ) : (
            filteredCattle.map((cattle) => (
              <div
                key={cattle.id}
                className="p-4 hover:bg-[#F7F9F7] transition-colors flex items-center justify-between gap-3 cursor-pointer"
              >
                <div
                  onClick={() => onSelectCattle(cattle)}
                  className="flex items-center gap-3 min-w-0 flex-1"
                >
                  <CattleAvatar breed={cattle.breed} id={cattle.id} size="md" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-[#17221C]">
                        {cattle.id}
                      </span>
                      <StatusBadge status={cattle.status} />
                    </div>
                    <p className="text-xs text-[#17221C] font-medium truncate mt-0.5">
                      {cattle.name} • {cattle.breed}
                    </p>
                    <p className="font-mono text-[11px] text-[#6B756E] mt-0.5 tabular-nums flex items-center gap-1">
                      <Radio className="w-2.5 h-2.5 text-[#1F6B4F]" />
                      {cattle.rfid}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1">
                  <button
                    onClick={() => setEditingCattle(cattle)}
                    title="Edit Data Sapi"
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[#6B756E] hover:text-[#17221C] hover:bg-[#F3F4F6]"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeletingCattle(cattle)}
                    title="Hapus Data Sapi"
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[#6B756E] hover:text-[#DC2626] hover:bg-[#FEE2E2]"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onSelectCattle(cattle)}
                    className="text-[#6B756E] pl-1"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Table Footer info */}
        <div className="p-4 bg-[#F7F9F7]/70 border-t border-[#E5EAE6] flex items-center justify-between text-xs text-[#6B756E]">
          <span>
            Menampilkan <strong className="text-[#17221C] font-semibold">{filteredCattle.length}</strong> ekor sapi
          </span>
          <span className="hidden sm:inline">Smart Cattle Gate Registry (ISO 11784)</span>
        </div>
      </div>

      {/* Add Cattle Modal */}
      <AddCattleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => showNotification("Sapi baru berhasil didaftarkan ke sistem.")}
      />

      {/* Edit Cattle Modal */}
      <EditCattleModal
        cattle={editingCattle}
        isOpen={!!editingCattle}
        onClose={() => setEditingCattle(null)}
        onSave={handleSaveEdit}
      />

      {/* Delete Cattle Modal */}
      <DeleteCattleModal
        cattle={deletingCattle}
        isOpen={!!deletingCattle}
        onClose={() => setDeletingCattle(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
