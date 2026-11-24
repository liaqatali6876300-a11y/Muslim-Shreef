import { HADITHS_BOOKS_1_TO_27 } from './hadithsBooks1to27';
import { HADITHS_BOOKS_28_TO_54 } from './hadithsBooks28to54';
import { HadithEntry } from '../types/hadith';

export const ALL_HADITHS: HadithEntry[] = [
  ...HADITHS_BOOKS_1_TO_27,
  ...HADITHS_BOOKS_28_TO_54,
];

export const FAMOUS_HADITHS: HadithEntry[] = ALL_HADITHS.filter((h) => h.isFamous);

export function getHadithsByBook(bookId: number): HadithEntry[] {
  return ALL_HADITHS.filter((h) => h.bookId === bookId).sort(
    (a, b) => a.hadithNumber - b.hadithNumber
  );
}
