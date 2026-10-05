import React from 'react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'Berhasil' | 'Tidak Dikenal' | 'Aktif' | 'Tidak Aktif' | 'Online' | 'Offline' | string;
  className?: string;
  showIcon?: boolean;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  if (status === 'Berhasil' || status === 'Aktif') {
    return (
      <span className={cn("text-xs font-semibold text-[#1F6B4F] tabular-nums inline-block", className)}>
        {status}
      </span>
    );
  }

  if (status === 'Tidak Dikenal' || status === 'Unknown RFID') {
    return (
      <span className={cn("text-xs font-semibold text-[#B45309] tabular-nums inline-block", className)}>
        {status === 'Unknown RFID' ? 'Unknown RFID' : 'Tidak Dikenal'}
      </span>
    );
  }

  if (status === 'Tidak Aktif' || status === 'Karantina') {
    return (
      <span className={cn("text-xs font-medium text-[#6B756E] tabular-nums inline-block", className)}>
        {status}
      </span>
    );
  }

  if (status === 'Online') {
    return (
      <span className={cn("text-xs font-semibold text-[#1F6B4F] tabular-nums inline-block", className)}>
        Online
      </span>
    );
  }

  return (
    <span className={cn("text-xs font-medium text-[#6B756E] tabular-nums inline-block", className)}>
      {status}
    </span>
  );
}
