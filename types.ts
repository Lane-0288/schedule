export interface ScheduleItem {
  period: number;
  className: string;
  room: string;
  teacher: string;
}

export enum Grade {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  F = 'F',
}

export interface Course {
  id: string;
  name: string;
  grade: Grade;
  credits: number; // 0.25 to 1.0
  isAP: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  image?: string; // Base64 string
  isLoading?: boolean;
}
