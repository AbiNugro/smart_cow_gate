export type CattleBreed = 
  | 'Limousin' 
  | 'Simental' 
  | 'Brahman' 
  | 'PO (Peranakan Ongole)'
  | 'Angus';

export type CattleGender = 'Jantan' | 'Betina';

export type CattleStatus = 'Aktif' | 'Tidak Aktif';

export interface DetectionRecord {
  id: string;
  timestamp: string;
  date: string;
  gate: string;
  status: 'Berhasil' | 'Tidak Dikenal';
  notes?: string;
}

export interface Cattle {
  id: string;
  rfid: string;
  name: string;
  breed: CattleBreed;
  gender: CattleGender;
  birthDate: string;
  age: string;
  weight: string;
  registeredDate: string;
  lastDetected: string;
  lastGate: string;
  status: CattleStatus;
  healthStatus?: 'Sehat' | 'Pemeriksaan' | 'Karantina';
  history: DetectionRecord[];
}

export interface LiveScannerState {
  status: 'scanning' | 'detected' | 'waiting' | 'unknown';
  cattle?: Cattle;
  unknownRfid?: string;
  detectedAt?: string;
  signalStrength?: number; // dBm e.g. -54
  frequency?: string; // e.g. 920-925 MHz UHF EPC Gen2
  gateName: string;
}

export interface WeeklyStat {
  day: string;
  count: number;
}
