export interface BookInfo {
  id: number;
  volume: number;
  translitTitle: string;
  englishTitle: string;
  arabicTitle: string;
  urduTitle: string;
  totalHadiths: number;
  startHadith: number;
  endHadith: number;
  summary: string;
}

export interface VolumeInfo {
  number: number;
  roman: string;
  title: string;
  urduTitle: string;
  bookRange: string;
  hadithRange: string;
}

export interface HadithEntry {
  id: string;
  bookId: number;
  hadithNumber: number;
  chapter: string;
  chapterUrdu: string;
  narrator: string;
  arabic: string;
  urdu: string;
  english: string;
  explanation: string;
  isFamous?: boolean;
  famousTitle?: string;
}

export interface ProfileFact {
  label: string;
  value: string;
}
