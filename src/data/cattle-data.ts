import { Cattle, DetectionRecord, WeeklyStat } from '@/types';

export const CATTLE_LIST: Cattle[] = [
  {
    id: 'SCG-024',
    rfid: '982000412345678',
    name: 'Sapi 024 (Bima)',
    breed: 'Limousin',
    gender: 'Jantan',
    birthDate: '12 April 2025',
    age: '18 bulan',
    weight: '582 kg',
    registeredDate: '14 Mei 2025',
    lastDetected: 'Hari ini, 10:42',
    lastGate: 'Gate 01',
    status: 'Aktif',
    healthStatus: 'Sehat',
    history: [
      { id: 'REC-101', timestamp: '10:42:16', date: '05 Oktober 2026', gate: 'Gate 01', status: 'Berhasil' },
      { id: 'REC-102', timestamp: '07:15:30', date: '05 Oktober 2026', gate: 'Gate 01', status: 'Berhasil' },
      { id: 'REC-103', timestamp: '16:52:11', date: '04 Oktober 2026', gate: 'Gate 02', status: 'Berhasil' },
      { id: 'REC-104', timestamp: '08:10:44', date: '04 Oktober 2026', gate: 'Gate 01', status: 'Berhasil' },
    ]
  },
  {
    id: 'SCG-017',
    rfid: '982000412345613',
    name: 'Sapi 017 (Melati)',
    breed: 'Simental',
    gender: 'Betina',
    birthDate: '18 Oktober 2024',
    age: '24 bulan',
    weight: '520 kg',
    registeredDate: '01 Desember 2024',
    lastDetected: 'Hari ini, 10:37',
    lastGate: 'Gate 01',
    status: 'Aktif',
    healthStatus: 'Sehat',
    history: [
      { id: 'REC-105', timestamp: '10:37:28', date: '05 Oktober 2026', gate: 'Gate 01', status: 'Berhasil' },
      { id: 'REC-106', timestamp: '06:45:10', date: '05 Oktober 2026', gate: 'Gate 01', status: 'Berhasil' },
      { id: 'REC-107', timestamp: '15:20:05', date: '03 Oktober 2026', gate: 'Gate 02', status: 'Berhasil' },
    ]
  },
  {
    id: 'SCG-081',
    rfid: '982000412345722',
    name: 'Sapi 081 (Arjuna)',
    breed: 'Brahman',
    gender: 'Jantan',
    birthDate: '05 Februari 2025',
    age: '20 bulan',
    weight: '615 kg',
    registeredDate: '20 Maret 2025',
    lastDetected: 'Hari ini, 10:31',
    lastGate: 'Gate 01',
    status: 'Aktif',
    healthStatus: 'Sehat',
    history: [
      { id: 'REC-108', timestamp: '10:31:40', date: '05 Oktober 2026', gate: 'Gate 01', status: 'Berhasil' },
      { id: 'REC-109', timestamp: '07:05:12', date: '05 Oktober 2026', gate: 'Gate 01', status: 'Berhasil' },
    ]
  },
  {
    id: 'SCG-043',
    rfid: '982000412345699',
    name: 'Sapi 043 (Gatot)',
    breed: 'Limousin',
    gender: 'Jantan',
    birthDate: '28 Juni 2025',
    age: '15 bulan',
    weight: '495 kg',
    registeredDate: '10 Juli 2025',
    lastDetected: 'Hari ini, 10:19',
    lastGate: 'Gate 01',
    status: 'Aktif',
    healthStatus: 'Sehat',
    history: [
      { id: 'REC-110', timestamp: '10:19:55', date: '05 Oktober 2026', gate: 'Gate 01', status: 'Berhasil' },
      { id: 'REC-111', timestamp: '16:11:02', date: '04 Oktober 2026', gate: 'Gate 01', status: 'Berhasil' },
    ]
  },
  {
    id: 'SCG-005',
    rfid: '982000412345511',
    name: 'Sapi 005 (Sari)',
    breed: 'PO (Peranakan Ongole)',
    gender: 'Betina',
    birthDate: '10 Januari 2024',
    age: '33 bulan',
    weight: '440 kg',
    registeredDate: '15 Maret 2024',
    lastDetected: 'Hari ini, 09:48',
    lastGate: 'Gate 02',
    status: 'Aktif',
    healthStatus: 'Sehat',
    history: [
      { id: 'REC-112', timestamp: '09:48:21', date: '05 Oktober 2026', gate: 'Gate 02', status: 'Berhasil' },
      { id: 'REC-113', timestamp: '06:12:40', date: '05 Oktober 2026', gate: 'Gate 01', status: 'Berhasil' },
    ]
  },
  {
    id: 'SCG-012',
    rfid: '982000412345580',
    name: 'Sapi 012 (Bravo)',
    breed: 'Simental',
    gender: 'Jantan',
    birthDate: '02 Mei 2025',
    age: '17 bulan',
    weight: '560 kg',
    registeredDate: '18 Juni 2025',
    lastDetected: 'Hari ini, 09:12',
    lastGate: 'Gate 01',
    status: 'Aktif',
    healthStatus: 'Sehat',
    history: [
      { id: 'REC-114', timestamp: '09:12:08', date: '05 Oktober 2026', gate: 'Gate 01', status: 'Berhasil' },
    ]
  },
  {
    id: 'SCG-056',
    rfid: '982000412345832',
    name: 'Sapi 056 (Puspa)',
    breed: 'PO (Peranakan Ongole)',
    gender: 'Betina',
    birthDate: '14 September 2024',
    age: '25 bulan',
    weight: '415 kg',
    registeredDate: '05 November 2024',
    lastDetected: 'Hari ini, 08:35',
    lastGate: 'Gate 02',
    status: 'Aktif',
    healthStatus: 'Sehat',
    history: [
      { id: 'REC-115', timestamp: '08:35:19', date: '05 Oktober 2026', gate: 'Gate 02', status: 'Berhasil' },
    ]
  },
  {
    id: 'SCG-090',
    rfid: '982000412345914',
    name: 'Sapi 090 (Raja)',
    breed: 'Brahman',
    gender: 'Jantan',
    birthDate: '19 Juli 2024',
    age: '26 bulan',
    weight: '640 kg',
    registeredDate: '01 September 2024',
    lastDetected: 'Kemarin, 17:10',
    lastGate: 'Gate 01',
    status: 'Aktif',
    healthStatus: 'Sehat',
    history: [
      { id: 'REC-116', timestamp: '17:10:45', date: '04 Oktober 2026', gate: 'Gate 01', status: 'Berhasil' },
    ]
  },
  {
    id: 'SCG-003',
    rfid: '982000412345498',
    name: 'Sapi 003 (Kencana)',
    breed: 'Limousin',
    gender: 'Betina',
    birthDate: '11 Maret 2024',
    age: '30 bulan',
    weight: '510 kg',
    registeredDate: '22 April 2024',
    lastDetected: 'Kemarin, 15:30',
    lastGate: 'Gate 02',
    status: 'Aktif',
    healthStatus: 'Pemeriksaan',
    history: [
      { id: 'REC-117', timestamp: '15:30:12', date: '04 Oktober 2026', gate: 'Gate 02', status: 'Berhasil' },
    ]
  },
  {
    id: 'SCG-104',
    rfid: '982000412346001',
    name: 'Sapi 104 (Mega)',
    breed: 'Simental',
    gender: 'Betina',
    birthDate: '03 Desember 2024',
    age: '22 bulan',
    weight: '480 kg',
    registeredDate: '15 Januari 2025',
    lastDetected: '02 Okt, 14:15',
    lastGate: 'Gate 01',
    status: 'Tidak Aktif',
    healthStatus: 'Karantina',
    history: [
      { id: 'REC-118', timestamp: '14:15:33', date: '02 Oktober 2026', gate: 'Gate 01', status: 'Berhasil' },
    ]
  }
];

export interface IdentificationHistoryLog {
  id: string;
  time: string;
  date: string;
  cattleId: string;
  name: string;
  rfid: string;
  breed: string;
  gate: string;
  status: 'Berhasil' | 'Tidak Dikenal';
}

export const IDENTIFICATION_LOGS: IdentificationHistoryLog[] = [
  {
    id: 'LOG-001',
    time: '10:42:16',
    date: '05 Okt 2026',
    cattleId: 'SCG-024',
    name: 'Sapi 024 (Bima)',
    rfid: '982000412345678',
    breed: 'Limousin',
    gate: 'Gate 01',
    status: 'Berhasil'
  },
  {
    id: 'LOG-002',
    time: '10:37:28',
    date: '05 Okt 2026',
    cattleId: 'SCG-017',
    name: 'Sapi 017 (Melati)',
    rfid: '982000412345613',
    breed: 'Simental',
    gate: 'Gate 01',
    status: 'Berhasil'
  },
  {
    id: 'LOG-003',
    time: '10:33:01',
    date: '05 Okt 2026',
    cattleId: 'Unknown',
    name: 'Tidak Terdaftar',
    rfid: '982000499999992',
    breed: '-',
    gate: 'Gate 01',
    status: 'Tidak Dikenal'
  },
  {
    id: 'LOG-004',
    time: '10:31:40',
    date: '05 Okt 2026',
    cattleId: 'SCG-081',
    name: 'Sapi 081 (Arjuna)',
    rfid: '982000412345722',
    breed: 'Brahman',
    gate: 'Gate 01',
    status: 'Berhasil'
  },
  {
    id: 'LOG-005',
    time: '10:19:55',
    date: '05 Okt 2026',
    cattleId: 'SCG-043',
    name: 'Sapi 043 (Gatot)',
    rfid: '982000412345699',
    breed: 'Limousin',
    gate: 'Gate 01',
    status: 'Berhasil'
  },
  {
    id: 'LOG-006',
    time: '09:48:21',
    date: '05 Okt 2026',
    cattleId: 'SCG-005',
    name: 'Sapi 005 (Sari)',
    rfid: '982000412345511',
    breed: 'PO (Peranakan Ongole)',
    gate: 'Gate 02',
    status: 'Berhasil'
  },
  {
    id: 'LOG-007',
    time: '09:12:08',
    date: '05 Okt 2026',
    cattleId: 'SCG-012',
    name: 'Sapi 012 (Bravo)',
    rfid: '982000412345580',
    breed: 'Simental',
    gate: 'Gate 01',
    status: 'Berhasil'
  },
  {
    id: 'LOG-008',
    time: '08:55:14',
    date: '05 Okt 2026',
    cattleId: 'Unknown',
    name: 'Tag Tagar Lepas',
    rfid: '982000488881230',
    breed: '-',
    gate: 'Gate 02',
    status: 'Tidak Dikenal'
  },
  {
    id: 'LOG-009',
    time: '08:35:19',
    date: '05 Okt 2026',
    cattleId: 'SCG-056',
    name: 'Sapi 056 (Puspa)',
    rfid: '982000412345832',
    breed: 'PO (Peranakan Ongole)',
    gate: 'Gate 02',
    status: 'Berhasil'
  },
  {
    id: 'LOG-010',
    time: '07:15:30',
    date: '05 Okt 2026',
    cattleId: 'SCG-024',
    name: 'Sapi 024 (Bima)',
    rfid: '982000412345678',
    breed: 'Limousin',
    gate: 'Gate 01',
    status: 'Berhasil'
  },
  {
    id: 'LOG-011',
    time: '07:05:12',
    date: '05 Okt 2026',
    cattleId: 'SCG-081',
    name: 'Sapi 081 (Arjuna)',
    rfid: '982000412345722',
    breed: 'Brahman',
    gate: 'Gate 01',
    status: 'Berhasil'
  },
  {
    id: 'LOG-012',
    time: '06:45:10',
    date: '05 Okt 2026',
    cattleId: 'SCG-017',
    name: 'Sapi 017 (Melati)',
    rfid: '982000412345613',
    breed: 'Simental',
    gate: 'Gate 01',
    status: 'Berhasil'
  }
];

export const WEEKLY_ACTIVITY: WeeklyStat[] = [
  { day: 'Senin', count: 42 },
  { day: 'Selasa', count: 56 },
  { day: 'Rabu', count: 49 },
  { day: 'Kamis', count: 63 },
  { day: 'Jumat', count: 58 },
  { day: 'Sabtu', count: 35 },
  { day: 'Minggu', count: 28 },
];
