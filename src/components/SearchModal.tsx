import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X, BookOpen, ArrowRight, ArrowLeft } from 'lucide-react';
import { BOOKS_54 } from '../data/sahihMuslimMeta';
import { ALL_HADITHS } from '../data/hadithsData';
import {
  AppLanguage,
  BOOK_SUMMARIES_URDU,
  HADITH_EXPLANATIONS_URDU,
} from '../data/urduContent';
import { BookInfo, HadithEntry } from '../types/hadith';

interface SearchModalProps {
  lang: AppLanguage;
  isOpen: boolean;
  onClose: () => void;
  onSelectBook: (bookId: number, targetHadithNumber?: number) => void;
}

export function SearchModal({ lang, isOpen, onClose, onSelectBook }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const isUrdu = lang === 'ur';

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const { matchedBooks, matchedHadiths, numericRangeBook } = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        matchedBooks: BOOKS_54.slice(0, 6),
        matchedHadiths: ALL_HADITHS.filter((h) => h.isFamous).slice(0, 5),
        numericRangeBook: null as BookInfo | null,
      };
    }

    const num = Number(q);
    const isNum = !Number.isNaN(num) && Number.isInteger(num) && num >= 1 && num <= 7563;
    const rangeBook = isNum
      ? BOOKS_54.find((b) => num >= b.startHadith && num <= b.endHadith) ?? null
      : null;

    const books = BOOKS_54.filter(
      (b) =>
        b.translitTitle.toLowerCase().includes(q) ||
        b.englishTitle.toLowerCase().includes(q) ||
        b.arabicTitle.includes(q) ||
        b.urduTitle.includes(q) ||
        b.summary.toLowerCase().includes(q) ||
        (BOOK_SUMMARIES_URDU[b.id] ?? '').includes(query.trim()) ||
        String(b.id) === q
    ).slice(0, 8);

    const hadiths = ALL_HADITHS.filter(
      (h) =>
        String(h.hadithNumber) === q ||
        String(h.hadithNumber).includes(q) ||
        h.english.toLowerCase().includes(q) ||
        h.explanation.toLowerCase().includes(q) ||
        h.chapter.toLowerCase().includes(q) ||
        h.narrator.toLowerCase().includes(q) ||
        h.arabic.includes(query.trim()) ||
        h.urdu.includes(query.trim()) ||
        h.chapterUrdu.includes(query.trim()) ||
        (HADITH_EXPLANATIONS_URDU[h.id] ?? '').includes(query.trim()) ||
        (h.famousTitle && h.famousTitle.toLowerCase().includes(q))
    ).slice(0, 12);

    return { matchedBooks: books, matchedHadiths: hadiths, numericRangeBook: rangeBook };
  }, [query]);

  if (!isOpen) return null;

  const getBookForHadith = (h: HadithEntry) => BOOKS_54.find((b) => b.id === h.bookId);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Sahih Muslim Sharif"
      dir={isUrdu ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-lg border-[3px] border-[#C89B3C] bg-white dark:bg-[#0F1E16] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div className="flex items-center gap-3 px-4 py-4 bg-[#0F3D24] dark:bg-[#081F13] border-b-2 border-[#C89B3C]">
          <Search className="w-5 h-5 text-[#F2CE68] shrink-0 stroke-[2.5]" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isUrdu
                ? 'حدیث نمبر (۱ تا ۷۵۶۳)، کتاب کا نام یا اردو/انگریزی لفظ تلاش کریں...'
                : 'Search by Hadith # (1–7563), book name, or English keyword...'
            }
            className={`w-full bg-transparent text-sm sm:text-base font-bold text-white placeholder:text-[#D9C79B] focus:outline-none ${
              isUrdu ? 'font-urdu leading-normal' : ''
            }`}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-xs font-extrabold text-[#F2CE68] hover:text-white px-2 py-1 cursor-pointer"
            >
              {isUrdu ? 'صاف' : 'CLEAR'}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 rounded-md text-[#F2CE68] hover:bg-[#14532D] cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Quick suggestions */}
        <div className="px-4 py-2.5 border-b-2 border-[#C89B3C]/50 bg-[#F7EFDA] dark:bg-[#12261B] flex items-center gap-2 overflow-x-auto text-xs font-extrabold text-[#111814] dark:text-[#FBF6E9]">
          <span className={`shrink-0 ${isUrdu ? 'font-urdu leading-normal' : ''}`}>
            {isUrdu ? 'مثالیں:' : 'TRY:'}
          </span>
          {['1', '16', 'ایمان', 'نماز', 'نیت', 'Faith', 'Prayer'].map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => setQuery(term)}
              className="px-2.5 py-1 rounded border-2 border-[#C89B3C] bg-white dark:bg-[#0B1410] hover:bg-[#0F3D24] hover:text-[#F2CE68] whitespace-nowrap shrink-0 cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="max-h-[62vh] overflow-y-auto divide-y-2 divide-[#E6D5A9] dark:divide-[#1F3A2B]">
          {numericRangeBook && (
            <div className="p-4 bg-[#F7EFDA] dark:bg-[#13291D]">
              <div className="text-xs uppercase tracking-wider text-[#0F3D24] dark:text-[#F2CE68] font-extrabold mb-1">
                {isUrdu
                  ? `حدیث نمبر ${query.trim()} اس کتاب میں شامل ہے`
                  : `Hadith #${query.trim()} Range Match`}
              </div>
              <button
                type="button"
                onClick={() => {
                  onSelectBook(numericRangeBook.id, Number(query.trim()));
                  onClose();
                }}
                className={`w-full flex items-center justify-between gap-4 group cursor-pointer ${
                  isUrdu ? 'text-right' : 'text-left'
                }`}
              >
                <div>
                  <div
                    className={`text-base font-extrabold text-[#0F3D24] dark:text-white group-hover:underline ${
                      isUrdu ? 'font-urdu leading-normal' : ''
                    }`}
                  >
                    {isUrdu
                      ? `کتاب ${numericRangeBook.id}: ${numericRangeBook.urduTitle}`
                      : `Book ${numericRangeBook.id}: ${numericRangeBook.translitTitle} — ${numericRangeBook.englishTitle}`}
                  </div>
                  <div className="text-xs font-bold text-[#374151] dark:text-[#D1D5DB] mt-0.5 tabular-nums">
                    {isUrdu
                      ? `جلد نمبر ${numericRangeBook.volume} · سلسلہ #${numericRangeBook.startHadith}–${numericRangeBook.endHadith}`
                      : `Volume No ${numericRangeBook.volume} · Range #${numericRangeBook.startHadith}–${numericRangeBook.endHadith}`}
                  </div>
                </div>
                {isUrdu ? (
                  <ArrowLeft className="w-5 h-5 text-[#0F3D24] dark:text-[#F2CE68] shrink-0 stroke-[2.5]" />
                ) : (
                  <ArrowRight className="w-5 h-5 text-[#0F3D24] dark:text-[#F2CE68] shrink-0 stroke-[2.5]" />
                )}
              </button>
            </div>
          )}

          {/* Matched Books */}
          {matchedBooks.length > 0 && (
            <div className="p-4">
              <div
                className={`text-xs tracking-wider text-[#0F3D24] dark:text-[#F2CE68] font-extrabold mb-3 ${
                  isUrdu ? 'font-urdu leading-normal' : 'uppercase'
                }`}
              >
                {isUrdu
                  ? query
                    ? 'متعلقہ کتب'
                    : 'نمایاں کتب (کل ۵۴ کتب)'
                  : query
                    ? 'Matching Books'
                    : 'Featured Books (54 Total)'}
              </div>
              <div className="space-y-2">
                {matchedBooks.map((book) => (
                  <button
                    key={book.id}
                    type="button"
                    onClick={() => {
                      onSelectBook(book.id);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-md border-2 border-[#C89B3C]/60 bg-[#FBF6E9] dark:bg-[#13261C] hover:border-[#0F3D24] dark:hover:border-[#F2CE68] transition-colors cursor-pointer ${
                      isUrdu ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <BookOpen className="w-4 h-4 text-[#0F3D24] dark:text-[#F2CE68] shrink-0 stroke-[2.5]" aria-hidden="true" />
                      <div className="min-w-0">
                        <div
                          className={`text-sm font-extrabold text-[#111814] dark:text-white truncate ${
                            isUrdu ? 'font-urdu leading-normal' : ''
                          }`}
                        >
                          <span className="tabular-nums text-[#0F3D24] dark:text-[#F2CE68] mx-1">
                            {String(book.id).padStart(2, '0')}.
                          </span>
                          {isUrdu ? book.urduTitle : `${book.translitTitle} — ${book.englishTitle}`}
                        </div>
                        <div className="text-xs font-bold text-[#4B5563] dark:text-[#D1D5DB] tabular-nums">
                          {isUrdu
                            ? `جلد نمبر ${book.volume} · ${book.totalHadiths} احادیث · #${book.startHadith}–${book.endHadith}`
                            : `Volume No ${book.volume} · ${book.totalHadiths} Hadiths · Range #${book.startHadith}–${book.endHadith}`}
                        </div>
                      </div>
                    </div>
                    {isUrdu ? (
                      <ArrowLeft className="w-4 h-4 text-[#0F3D24] dark:text-[#F2CE68] shrink-0 stroke-[2.5]" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-[#0F3D24] dark:text-[#F2CE68] shrink-0 stroke-[2.5]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Hadiths */}
          {matchedHadiths.length > 0 && (
            <div className="p-4">
              <div
                className={`text-xs tracking-wider text-[#0F3D24] dark:text-[#F2CE68] font-extrabold mb-3 ${
                  isUrdu ? 'font-urdu leading-normal' : 'uppercase'
                }`}
              >
                {isUrdu
                  ? query
                    ? 'متعلقہ احادیث'
                    : 'مشہور احادیث'
                  : query
                    ? 'Matching Hadiths'
                    : 'Famous Hadiths'}
              </div>
              <div className="space-y-2.5">
                {matchedHadiths.map((hadith) => {
                  const book = getBookForHadith(hadith);
                  return (
                    <button
                      key={hadith.id}
                      type="button"
                      onClick={() => {
                        onSelectBook(hadith.bookId, hadith.hadithNumber);
                        onClose();
                      }}
                      className={`w-full block p-3.5 rounded-md border-2 border-[#C89B3C]/60 hover:border-[#0F3D24] dark:hover:border-[#F2CE68] bg-[#FBF6E9] dark:bg-[#13261C] transition-colors cursor-pointer ${
                        isUrdu ? 'text-right' : 'text-left'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-xs font-extrabold text-[#0F3D24] dark:text-[#F2CE68] mb-1">
                        <span className="tabular-nums">
                          {isUrdu ? `حدیث #${hadith.hadithNumber}` : `HADITH #${hadith.hadithNumber}`}
                        </span>
                        <span>
                          {isUrdu
                            ? `کتاب ${hadith.bookId}: ${book?.urduTitle}`
                            : `Book ${hadith.bookId}: ${book?.translitTitle}`}
                        </span>
                      </div>
                      <p
                        className={`text-sm font-bold text-[#111814] dark:text-white line-clamp-2 ${
                          isUrdu ? 'font-urdu leading-[2]' : ''
                        }`}
                      >
                        {isUrdu ? hadith.urdu : hadith.english}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {matchedBooks.length === 0 && matchedHadiths.length === 0 && !numericRangeBook && (
            <div className="p-10 text-center text-sm font-extrabold text-[#374151] dark:text-[#D1D5DB]">
              {isUrdu
                ? `“${query}” کے لیے کوئی کتاب یا حدیث نہیں ملی۔`
                : `No books or Hadiths matched “${query}”.`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
