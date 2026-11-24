import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Copy,
  Check,
  BookOpen,
} from 'lucide-react';
import { BOOKS_54 } from '../data/sahihMuslimMeta';
import { getHadithsByBook, ALL_HADITHS } from '../data/hadithsData';
import {
  AppLanguage,
  BOOK_SUMMARIES_URDU,
  HADITH_EXPLANATIONS_URDU,
} from '../data/urduContent';
import { ReadingControlsBar } from './ReadingControlsBar';
import { HadithEntry } from '../types/hadith';

interface BookReaderProps {
  lang: AppLanguage;
  onChangeLang: (lang: AppLanguage) => void;
  bookId: number;
  initialHadithNumber?: number;
  fontScale: number;
  onDecreaseFont: () => void;
  onIncreaseFont: () => void;
  onResetFont: () => void;
  isDark: boolean;
  onToggleDark: () => void;
  bookmarks: string[];
  onToggleBookmark: (hadithId: string) => void;
  onSelectBook: (bookId: number, targetHadithNumber?: number) => void;
  onBackToCatalog: () => void;
}

export function BookReader({
  lang,
  onChangeLang,
  bookId,
  initialHadithNumber,
  fontScale,
  onDecreaseFont,
  onIncreaseFont,
  onResetFont,
  isDark,
  onToggleDark,
  bookmarks,
  onToggleBookmark,
  onSelectBook,
  onBackToCatalog,
}: BookReaderProps) {
  const isUrdu = lang === 'ur';

  const book = useMemo(
    () => BOOKS_54.find((b) => b.id === bookId) ?? BOOKS_54[0],
    [bookId]
  );
  const hadiths = useMemo(() => getHadithsByBook(book.id), [book.id]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'focused' | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  useEffect(() => {
    if (initialHadithNumber) {
      const idx = hadiths.findIndex((h) => h.hadithNumber === initialHadithNumber);
      if (idx >= 0) {
        setActiveIndex(idx);
      } else {
        setActiveIndex(0);
      }
    } else {
      setActiveIndex(0);
    }
    setShowSavedOnly(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [bookId, initialHadithNumber, hadiths]);

  const prevBook = BOOKS_54.find((b) => b.id === book.id - 1) ?? null;
  const nextBook = BOOKS_54.find((b) => b.id === book.id + 1) ?? null;

  const displayedHadiths: HadithEntry[] = useMemo(() => {
    if (showSavedOnly) {
      return ALL_HADITHS.filter((h) => bookmarks.includes(h.id));
    }
    if (viewMode === 'focused' && hadiths.length > 0) {
      return [hadiths[Math.min(activeIndex, hadiths.length - 1)]];
    }
    return hadiths;
  }, [showSavedOnly, bookmarks, viewMode, hadiths, activeIndex]);

  const handlePreviousHadithOrBook = () => {
    if (viewMode === 'focused' && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (prevBook) {
      onSelectBook(prevBook.id);
    }
  };

  const handleNextHadithOrBook = () => {
    if (viewMode === 'focused' && activeIndex < hadiths.length - 1) {
      setActiveIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (nextBook) {
      onSelectBook(nextBook.id);
    }
  };

  const handleCopyHadith = (h: HadithEntry) => {
    const urduSharh = HADITH_EXPLANATIONS_URDU[h.id] ?? h.explanation;
    const payload = isUrdu
      ? `صحیح مسلم — کتاب ${book.id}: ${book.urduTitle}\nحدیث #${h.hadithNumber} · ${h.narrator}\n\n${h.arabic}\n\n${h.urdu}\n\nمختصر تشریح: ${urduSharh}`
      : `Sahih Muslim — Book ${book.id}: ${book.translitTitle} (${book.englishTitle})\nHadith #${h.hadithNumber} · ${h.narrator}\n\n${h.arabic}\n\n${h.english}\n\nExplanation: ${h.explanation}`;
    navigator.clipboard?.writeText(payload);
    setCopiedId(h.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const arabicSizePx = Math.round(29 * fontScale);
  const urduSizePx = Math.round(22 * fontScale);
  const proseSizePx = Math.round(19 * fontScale);
  const explanationSizePx = Math.round(17.5 * fontScale);

  return (
    <div className="min-h-screen" dir={isUrdu ? 'rtl' : 'ltr'} lang={isUrdu ? 'ur' : 'en'}>
      <ReadingControlsBar
        lang={lang}
        onChangeLang={onChangeLang}
        fontScale={fontScale}
        onDecreaseFont={onDecreaseFont}
        onIncreaseFont={onIncreaseFont}
        onResetFont={onResetFont}
        isDark={isDark}
        onToggleDark={onToggleDark}
        bookmarkCount={bookmarks.length}
        showBookmarksOnly={showSavedOnly}
        onToggleBookmarksOnly={() => setShowSavedOnly((prev) => !prev)}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
        {/* Top Breadcrumb & Book Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b-2 border-[#C89B3C]">
          <button
            type="button"
            onClick={onBackToCatalog}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-black rounded-md bg-[#F9F2DF] dark:bg-[#182B20] text-[#111814] dark:text-white border-2 border-[#C89B3C] hover:bg-[#F2CE68] hover:text-[#0F3D24] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isUrdu ? 'font-urdu leading-normal' : ''
            }`}
          >
            {isUrdu ? (
              <ArrowRight className="w-4 h-4 stroke-[2.75]" aria-hidden="true" />
            ) : (
              <ArrowLeft className="w-4 h-4 stroke-[2.75]" aria-hidden="true" />
            )}
            <span>{isUrdu ? 'تمام ۵۴ کتب کی فہرست' : 'BACK TO ALL 54 BOOKS'}</span>
          </button>

          <div className="flex items-center gap-3">
            <label
              htmlFor="book-jump-select"
              className={`text-xs font-black text-[#0F3D24] dark:text-[#F2CE68] whitespace-nowrap ${
                isUrdu ? 'font-urdu leading-normal' : ''
              }`}
            >
              {isUrdu ? 'کتاب منتخب کریں:' : 'JUMP TO BOOK:'}
            </label>
            <select
              id="book-jump-select"
              value={book.id}
              onChange={(e) => onSelectBook(Number(e.target.value))}
              className={`px-3 py-2 text-xs sm:text-sm font-extrabold rounded-md border-2 border-[#C89B3C] bg-white dark:bg-[#132219] text-[#111814] dark:text-white max-w-[260px] cursor-pointer ${
                isUrdu ? 'font-urdu leading-normal' : ''
              }`}
            >
              {BOOKS_54.map((b) => (
                <option key={b.id} value={b.id}>
                  {isUrdu
                    ? `${String(b.id).padStart(2, '0')}. ${b.urduTitle}`
                    : `${String(b.id).padStart(2, '0')}. ${b.translitTitle} — ${b.englishTitle}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Book Header Card */}
        <section className="mt-6 p-6 sm:p-8 rounded-xl bg-white dark:bg-[#132219] border-[3px] border-[#C89B3C] space-y-4">
          <div className="text-xs sm:text-sm font-black tracking-wide text-[#0F3D24] dark:text-[#F2CE68] tabular-nums">
            {isUrdu
              ? `جلد نمبر ${book.volume} · کتاب ${book.id} از ۵۴ · کل ${book.totalHadiths} احادیث · #${book.startHadith}–${book.endHadith}`
              : `VOLUME NO ${book.volume} · BOOK ${book.id} OF 54 · ${book.totalHadiths} HADITHS · RANGE #${book.startHadith}–${book.endHadith}`}
          </div>
          <h1
            className={`${
              isUrdu
                ? 'font-urdu text-2xl sm:text-4xl leading-[1.7]'
                : 'font-display text-2xl sm:text-4xl'
            } font-black text-[#0F3D24] dark:text-[#6EE7B7] text-balance`}
          >
            {isUrdu
              ? book.urduTitle
              : `${book.translitTitle.toUpperCase()} — ${book.englishTitle.toUpperCase()}`}
          </h1>
          <p
            className={`text-sm sm:text-base font-bold text-[#111814] dark:text-[#FBF6E9] ${
              isUrdu ? 'font-urdu leading-[2.1]' : 'leading-relaxed'
            }`}
          >
            {isUrdu ? BOOK_SUMMARIES_URDU[book.id] : book.summary}
          </p>

          {/* Reader Display Mode + Quick Hadith Number Chips */}
          {!showSavedOnly && (
            <div className="pt-4 border-t-2 border-[#C89B3C]/40 flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center p-1 rounded-md border-2 border-[#C89B3C] bg-[#F7EFDA] dark:bg-[#0B1410]">
                <button
                  type="button"
                  onClick={() => setViewMode('all')}
                  className={`px-3.5 py-1.5 text-xs font-black rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isUrdu ? 'font-urdu leading-normal' : ''
                  } ${
                    viewMode === 'all'
                      ? 'bg-[#0F3D24] text-[#F2CE68]'
                      : 'text-[#111814] dark:text-[#FBF6E9] hover:text-[#0F3D24]'
                  }`}
                >
                  {isUrdu ? `تمام احادیث (${hadiths.length})` : `ALL HADITHS (${hadiths.length})`}
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('focused')}
                  className={`px-3.5 py-1.5 text-xs font-black rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isUrdu ? 'font-urdu leading-normal' : ''
                  } ${
                    viewMode === 'focused'
                      ? 'bg-[#0F3D24] text-[#F2CE68]'
                      : 'text-[#111814] dark:text-[#FBF6E9] hover:text-[#0F3D24]'
                  }`}
                >
                  {isUrdu ? 'ایک ایک حدیث پڑھیں' : 'SINGLE HADITH VIEW'}
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 text-xs font-black text-[#111814] dark:text-[#FBF6E9]">
                <span className={`mx-1 ${isUrdu ? 'font-urdu leading-normal' : ''}`}>
                  {isUrdu ? 'حدیث نمبر:' : 'HADITH #:'}
                </span>
                {hadiths.map((h, i) => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => {
                      setActiveIndex(i);
                      if (viewMode === 'all') {
                        document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={`px-2.5 py-1 rounded border-2 text-xs font-black tabular-nums transition-colors cursor-pointer ${
                      viewMode === 'focused' && activeIndex === i
                        ? 'border-[#C89B3C] bg-[#0F3D24] text-[#F2CE68]'
                        : 'border-[#C89B3C] bg-[#F9F2DF] dark:bg-[#182B20] text-[#111814] dark:text-white hover:bg-[#F2CE68] hover:text-[#0F3D24]'
                    }`}
                  >
                    #{h.hadithNumber}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Saved filter banner */}
        {showSavedOnly && (
          <div className="mt-6 p-4 rounded-lg border-2 border-[#C89B3C] bg-[#F9F2DF] dark:bg-[#182B20] flex items-center justify-between gap-4">
            <div className={`text-sm font-extrabold text-[#111814] dark:text-white ${isUrdu ? 'font-urdu leading-normal' : ''}`}>
              {isUrdu
                ? `آپ کی محفوظ کردہ احادیث (${displayedHadiths.length} احادیث)۔`
                : `Showing your saved Hadiths across Sahih Muslim (${displayedHadiths.length} saved).`}
            </div>
            <button
              type="button"
              onClick={() => setShowSavedOnly(false)}
              className={`text-xs font-black text-[#0F3D24] dark:text-[#F2CE68] hover:underline whitespace-nowrap shrink-0 cursor-pointer ${
                isUrdu ? 'font-urdu leading-normal' : ''
              }`}
            >
              {isUrdu ? `کتاب ${book.id} پر واپس جائیں` : `RETURN TO BOOK ${book.id}`}
            </button>
          </div>
        )}

        {/* Hadith Entries List */}
        <section className="py-8 space-y-8">
          {displayedHadiths.length === 0 ? (
            <div className="py-16 text-center border-2 border-[#C89B3C] bg-white dark:bg-[#132219] rounded-lg">
              <BookOpen className="w-8 h-8 mx-auto text-[#0F3D24] dark:text-[#F2CE68] mb-3" />
              <p className={`text-sm font-extrabold text-[#111814] dark:text-white ${isUrdu ? 'font-urdu leading-normal' : ''}`}>
                {isUrdu
                  ? 'ابھی کوئی حدیث محفوظ نہیں کی گئی۔'
                  : 'No saved Hadiths yet. Use the SAVE button on any Hadith to bookmark it.'}
              </p>
            </div>
          ) : (
            displayedHadiths.map((hadith) => {
              const isSaved = bookmarks.includes(hadith.id);
              const isCopied = copiedId === hadith.id;
              const entryBook = BOOKS_54.find((b) => b.id === hadith.bookId) ?? book;
              const urduExplanation = HADITH_EXPLANATIONS_URDU[hadith.id] ?? hadith.explanation;

              return (
                <article
                  key={hadith.id}
                  id={hadith.id}
                  className="rounded-xl border-[3px] border-[#C89B3C] bg-white dark:bg-[#132219] overflow-hidden"
                >
                  {/* Dark Green & Gold Hadith Header Bar */}
                  <div className="px-5 sm:px-7 py-4 border-b-2 border-[#C89B3C] bg-[#0F3D24] dark:bg-[#081F13] flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-black text-[#F2CE68] tabular-nums">
                        <span>{isUrdu ? `حدیث #${hadith.hadithNumber}` : `HADITH #${hadith.hadithNumber}`}</span>
                        <span aria-hidden="true">·</span>
                        <span>{isUrdu ? entryBook.urduTitle : entryBook.translitTitle.toUpperCase()}</span>
                        <span aria-hidden="true">·</span>
                        <span>{isUrdu ? `راوی: ${hadith.narrator}` : `NARRATOR: ${hadith.narrator.toUpperCase()}`}</span>
                      </div>
                      <h2
                        className={`${
                          isUrdu ? 'font-urdu text-lg sm:text-xl leading-[1.9]' : 'text-lg sm:text-xl'
                        } font-black text-white mt-1`}
                      >
                        {isUrdu ? hadith.chapterUrdu : hadith.chapter}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopyHadith(hadith)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-md border-2 border-[#C89B3C] bg-[#F9F2DF] text-[#111814] hover:bg-[#F2CE68] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          isUrdu ? 'font-urdu leading-normal' : ''
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#0F3D24] stroke-[2.75]" />
                            <span>{isUrdu ? 'کاپی ہو گیا' : 'COPIED'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>{isUrdu ? 'کاپی' : 'COPY'}</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => onToggleBookmark(hadith.id)}
                        aria-pressed={isSaved}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-md border-2 border-[#C89B3C] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          isUrdu ? 'font-urdu leading-normal' : ''
                        } ${
                          isSaved
                            ? 'bg-[#C89B3C] text-[#0F3D24]'
                            : 'bg-[#0B2919] text-[#F2CE68] hover:bg-[#14532D]'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>{isUrdu ? (isSaved ? 'محفوظ شدہ' : 'محفوظ') : (isSaved ? 'SAVED' : 'SAVE')}</span>
                      </button>
                    </div>
                  </div>

                  {/* Hadith Body */}
                  <div className="p-5 sm:p-8 space-y-6">
                    <div>
                      <div
                        className={`text-xs tracking-widest font-black text-[#0F3D24] dark:text-[#F2CE68] mb-2 ${
                          isUrdu ? 'font-urdu leading-normal' : 'uppercase'
                        }`}
                      >
                        {isUrdu ? 'عربی متنِ حدیث' : 'ARABIC TEXT'}
                      </div>
                      <p
                        dir="rtl"
                        lang="ar"
                        style={{ fontSize: `${arabicSizePx}px` }}
                        className="font-arabic font-bold text-right text-[#111814] dark:text-white"
                      >
                        {hadith.arabic}
                      </p>
                    </div>

                    <hr className="border-[#C89B3C]/40" />

                    {isUrdu ? (
                      <>
                        <div>
                          <div className="font-urdu text-xs font-black text-[#0F3D24] dark:text-[#F2CE68] mb-2 leading-normal">
                            اردو ترجمہ
                          </div>
                          <p
                            dir="rtl"
                            lang="ur"
                            style={{ fontSize: `${urduSizePx}px` }}
                            className="font-urdu font-bold text-right text-[#111814] dark:text-[#FBF6E9]"
                          >
                            {hadith.urdu}
                          </p>
                        </div>

                        <div className="p-4 sm:p-5 rounded-lg bg-[#F9F2DF] dark:bg-[#0D1B14] border-2 border-[#C89B3C]">
                          <div className="font-urdu text-xs text-[#0F3D24] dark:text-[#F2CE68] font-black mb-1.5 leading-normal">
                            مختصر تشریح (شرحِ حدیث)
                          </div>
                          <p
                            dir="rtl"
                            lang="ur"
                            style={{ fontSize: `${Math.round(urduSizePx * 0.92)}px` }}
                            className="font-urdu font-bold text-right text-[#111814] dark:text-[#E5E7EB]"
                          >
                            {urduExplanation}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <div className="text-xs uppercase tracking-widest font-black text-[#0F3D24] dark:text-[#F2CE68] mb-2">
                            ENGLISH TRANSLATION
                          </div>
                          <p
                            style={{ fontSize: `${proseSizePx}px` }}
                            className="font-extrabold leading-relaxed text-[#111814] dark:text-[#FBF6E9]"
                          >
                            {hadith.english}
                          </p>
                        </div>

                        <div className="p-4 sm:p-5 rounded-lg bg-[#F9F2DF] dark:bg-[#0D1B14] border-2 border-[#C89B3C]">
                          <div className="text-xs uppercase tracking-widest text-[#0F3D24] dark:text-[#F2CE68] font-black mb-1.5">
                            SHORT EXPLANATION
                          </div>
                          <p
                            style={{ fontSize: `${explanationSizePx}px` }}
                            className="font-bold leading-relaxed text-[#111814] dark:text-[#E5E7EB]"
                          >
                            {hadith.explanation}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </section>

        {/* Next & Previous Navigation Controls */}
        <nav
          aria-label="Book and Hadith navigation"
          className="pt-8 border-t-2 border-[#C89B3C] space-y-6"
        >
          {viewMode === 'focused' && !showSavedOnly && hadiths.length > 1 && (
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#C89B3C]/40">
              <button
                type="button"
                onClick={handlePreviousHadithOrBook}
                disabled={activeIndex === 0 && !prevBook}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-black rounded-md border-2 border-[#C89B3C] bg-[#F9F2DF] dark:bg-[#182B20] text-[#111814] dark:text-white hover:bg-[#F2CE68] hover:text-[#0F3D24] disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isUrdu ? 'font-urdu leading-normal' : ''
                }`}
              >
                {isUrdu ? (
                  <ChevronRight className="w-4 h-4 stroke-[2.75]" />
                ) : (
                  <ChevronLeft className="w-4 h-4 stroke-[2.75]" />
                )}
                <span>{isUrdu ? 'پچھلی حدیث' : 'PREVIOUS HADITH'}</span>
              </button>

              <span className="text-xs sm:text-sm font-black text-[#0F3D24] dark:text-[#F2CE68] tabular-nums">
                {isUrdu
                  ? `حدیث ${activeIndex + 1} از ${hadiths.length}`
                  : `HADITH ${activeIndex + 1} OF ${hadiths.length} IN BOOK ${book.id}`}
              </span>

              <button
                type="button"
                onClick={handleNextHadithOrBook}
                disabled={activeIndex === hadiths.length - 1 && !nextBook}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-black rounded-md border-2 border-[#C89B3C] bg-[#0F3D24] text-[#F2CE68] hover:bg-[#14532D] disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isUrdu ? 'font-urdu leading-normal' : ''
                }`}
              >
                <span>{isUrdu ? 'اگلی حدیث' : 'NEXT HADITH'}</span>
                {isUrdu ? (
                  <ChevronLeft className="w-4 h-4 stroke-[2.75]" />
                ) : (
                  <ChevronRight className="w-4 h-4 stroke-[2.75]" />
                )}
              </button>
            </div>
          )}

          {/* Previous Book & Next Book Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              {prevBook ? (
                <button
                  type="button"
                  onClick={() => onSelectBook(prevBook.id)}
                  className={`w-full p-4 rounded-lg border-2 border-[#C89B3C] bg-[#0F3D24] hover:bg-[#14532D] transition-colors flex items-center gap-3 cursor-pointer ${
                    isUrdu ? 'text-right' : 'text-left'
                  }`}
                >
                  {isUrdu ? (
                    <ChevronRight className="w-5 h-5 text-[#F2CE68] shrink-0 stroke-[2.75]" />
                  ) : (
                    <ChevronLeft className="w-5 h-5 text-[#F2CE68] shrink-0 stroke-[2.75]" />
                  )}
                  <div className="min-w-0">
                    <div className="text-xs font-black tracking-wider text-[#F2CE68]">
                      {isUrdu
                        ? `پچھلی کتاب · ${String(prevBook.id).padStart(2, '0')}`
                        : `PREVIOUS BOOK · ${String(prevBook.id).padStart(2, '0')}`}
                    </div>
                    <div
                      className={`text-sm font-extrabold text-white truncate ${
                        isUrdu ? 'font-urdu leading-normal' : ''
                      }`}
                    >
                      {isUrdu
                        ? prevBook.urduTitle
                        : `${prevBook.translitTitle} — ${prevBook.englishTitle}`}
                    </div>
                  </div>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onBackToCatalog}
                  className="w-full p-4 rounded-lg border-2 border-[#C89B3C] bg-[#F9F2DF] dark:bg-[#182B20] text-sm font-black text-[#111814] dark:text-white hover:bg-[#F2CE68] hover:text-[#0F3D24] flex items-center gap-2 cursor-pointer"
                >
                  {isUrdu ? (
                    <ArrowRight className="w-4 h-4 stroke-[2.75]" />
                  ) : (
                    <ArrowLeft className="w-4 h-4 stroke-[2.75]" />
                  )}
                  <span className={isUrdu ? 'font-urdu leading-normal' : ''}>
                    {isUrdu ? 'مرکزی فہرست پر واپس جائیں' : 'RETURN TO HOME CATALOG'}
                  </span>
                </button>
              )}
            </div>

            <div>
              {nextBook ? (
                <button
                  type="button"
                  onClick={() => onSelectBook(nextBook.id)}
                  className={`w-full p-4 rounded-lg border-2 border-[#C89B3C] bg-[#0F3D24] hover:bg-[#14532D] transition-colors flex items-center justify-end gap-3 cursor-pointer ${
                    isUrdu ? 'text-left' : 'text-right'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="text-xs font-black tracking-wider text-[#F2CE68]">
                      {isUrdu
                        ? `اگلی کتاب · ${String(nextBook.id).padStart(2, '0')}`
                        : `NEXT BOOK · ${String(nextBook.id).padStart(2, '0')}`}
                    </div>
                    <div
                      className={`text-sm font-extrabold text-white truncate ${
                        isUrdu ? 'font-urdu leading-normal' : ''
                      }`}
                    >
                      {isUrdu
                        ? nextBook.urduTitle
                        : `${nextBook.translitTitle} — ${nextBook.englishTitle}`}
                    </div>
                  </div>
                  {isUrdu ? (
                    <ChevronLeft className="w-5 h-5 text-[#F2CE68] shrink-0 stroke-[2.75]" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-[#F2CE68] shrink-0 stroke-[2.75]" />
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onBackToCatalog}
                  className="w-full p-4 rounded-lg border-2 border-[#C89B3C] bg-[#F9F2DF] dark:bg-[#182B20] text-sm font-black text-[#111814] dark:text-white hover:bg-[#F2CE68] hover:text-[#0F3D24] flex items-center justify-end gap-2 cursor-pointer"
                >
                  <span className={isUrdu ? 'font-urdu leading-normal' : ''}>
                    {isUrdu ? '۵۴ کتب مکمل · مرکزی صفحہ' : 'END OF 54 BOOKS · RETURN HOME'}
                  </span>
                  {isUrdu ? (
                    <ChevronLeft className="w-4 h-4 stroke-[2.75]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 stroke-[2.75]" />
                  )}
                </button>
              )}
            </div>
          </div>
        </nav>
      </main>
    </div>
  );
}
