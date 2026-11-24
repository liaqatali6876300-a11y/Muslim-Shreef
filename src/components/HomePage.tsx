import { useMemo, useState } from 'react';
import { ArrowRight, ArrowLeft, Search } from 'lucide-react';
import {
  AUTHOR_PROFILE_FACTS,
  BOOKS_54,
  IMAM_MUSLIM_METHOD,
  IMPORTANCE_SUMMARY,
  INTRODUCTION_PARAGRAPHS,
  VOLUMES,
} from '../data/sahihMuslimMeta';
import { FAMOUS_HADITHS } from '../data/hadithsData';
import {
  AppLanguage,
  AUTHOR_PROFILE_FACTS_URDU,
  BOOK_SUMMARIES_URDU,
  FAMOUS_TITLES_URDU,
  HADITH_EXPLANATIONS_URDU,
  IMAM_MUSLIM_METHOD_URDU,
  IMPORTANCE_SUMMARY_URDU,
  INTRODUCTION_PARAGRAPHS_URDU,
} from '../data/urduContent';
import { ReadingControlsBar } from './ReadingControlsBar';

interface HomePageProps {
  lang: AppLanguage;
  onChangeLang: (lang: AppLanguage) => void;
  fontScale: number;
  onDecreaseFont: () => void;
  onIncreaseFont: () => void;
  onResetFont: () => void;
  isDark: boolean;
  onToggleDark: () => void;
  onOpenSearch: () => void;
  bookmarks: string[];
  onSelectBook: (bookId: number, targetHadithNumber?: number) => void;
}

const CATEGORIES: { id: string; en: string; ur: string; keywords: string[] }[] = [
  { id: 'all', en: 'All Books', ur: 'تمام کتب', keywords: [] },
  { id: 'faith', en: 'Faith', ur: 'ایمان', keywords: ['faith', 'iman'] },
  { id: 'purification', en: 'Purification', ur: 'طہارت', keywords: ['purification', 'menstruation', 'taharah', 'hayd'] },
  { id: 'prayer', en: 'Prayer', ur: 'نماز', keywords: ['prayer', 'salah', 'salat', 'jumuah', 'eid', 'istisqa', 'kusuf'] },
  { id: 'mosques', en: 'Mosques', ur: 'مساجد', keywords: ['mosque', 'masajid'] },
  { id: 'fasting', en: 'Fasting', ur: 'روزہ', keywords: ['fasting', 'itikaf', 'siyam'] },
  { id: 'zakat', en: 'Zakat', ur: 'زکوٰۃ', keywords: ['zakat'] },
  { id: 'hajj', en: 'Hajj', ur: 'حج', keywords: ['hajj'] },
  { id: 'marriage', en: 'Marriage', ur: 'نکاح', keywords: ['marriage', 'nikah', 'breastfeeding', 'divorce', 'lian'] },
  { id: 'business', en: 'Business', ur: 'کاروبار', keywords: ['business', 'sharecropping', 'inheritance', 'gifts', 'will'] },
  { id: 'judgements', en: 'Judgements', ur: 'عدالت و احکام', keywords: ['judgement', 'oaths', 'punishments', 'lost property'] },
  { id: 'jihad', en: 'Jihad', ur: 'جہاد', keywords: ['jihad', 'leadership'] },
  { id: 'manners', en: 'Manners', ur: 'آداب', keywords: ['manners', 'greetings', 'clothing', 'drinks', 'words', 'poetry', 'dreams'] },
  { id: 'virtues', en: 'Virtues', ur: 'فضائل', keywords: ['virtues', 'kindness', 'companions'] },
  { id: 'knowledge', en: 'Knowledge', ur: 'علم و ذکر', keywords: ['knowledge', 'remembrance', 'destiny'] },
  { id: 'repentance', en: 'Repentance', ur: 'توبہ', keywords: ['repentance', 'heart softening', 'hypocrites'] },
  { id: 'paradise', en: 'Paradise', ur: 'جنت', keywords: ['paradise', 'judgment'] },
  { id: 'trials', en: 'Trials', ur: 'فتن', keywords: ['trials', 'fitan'] },
];

export function HomePage({
  lang,
  onChangeLang,
  fontScale,
  onDecreaseFont,
  onIncreaseFont,
  onResetFont,
  isDark,
  onToggleDark,
  onOpenSearch,
  bookmarks,
  onSelectBook,
}: HomePageProps) {
  const [selectedVolume, setSelectedVolume] = useState<number | 'all'>('all');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [bookFilter, setBookFilter] = useState('');

  const isUrdu = lang === 'ur';

  const filteredBooks = useMemo(() => {
    const q = bookFilter.trim().toLowerCase();
    const catObj = CATEGORIES.find((c) => c.id === selectedCategoryId);
    const catKeywords = catObj?.keywords ?? [];

    return BOOKS_54.filter((book) => {
      const matchesVolume = selectedVolume === 'all' || book.volume === selectedVolume;
      if (!matchesVolume) return false;

      if (catKeywords.length > 0) {
        const hay = `${book.translitTitle} ${book.englishTitle} ${book.summary}`.toLowerCase();
        const matchesCat = catKeywords.some((kw) => hay.includes(kw));
        if (!matchesCat) return false;
      }

      if (!q) return true;
      const num = Number(q);
      const inRange =
        !Number.isNaN(num) &&
        Number.isInteger(num) &&
        num >= book.startHadith &&
        num <= book.endHadith;
      return (
        inRange ||
        String(book.id) === q ||
        book.translitTitle.toLowerCase().includes(q) ||
        book.englishTitle.toLowerCase().includes(q) ||
        book.urduTitle.includes(bookFilter.trim()) ||
        (BOOK_SUMMARIES_URDU[book.id] ?? '').includes(bookFilter.trim()) ||
        book.summary.toLowerCase().includes(q)
      );
    });
  }, [selectedVolume, selectedCategoryId, bookFilter]);

  const arabicSizePx = Math.round(27 * fontScale);
  const urduSizePx = Math.round(21 * fontScale);
  const proseSizePx = Math.round(18 * fontScale);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const profileFacts = isUrdu ? AUTHOR_PROFILE_FACTS_URDU : AUTHOR_PROFILE_FACTS;
  const introParagraphs = isUrdu ? INTRODUCTION_PARAGRAPHS_URDU : INTRODUCTION_PARAGRAPHS;
  const methodSteps = isUrdu ? IMAM_MUSLIM_METHOD_URDU : IMAM_MUSLIM_METHOD;
  const importanceText = isUrdu ? IMPORTANCE_SUMMARY_URDU : IMPORTANCE_SUMMARY;

  return (
    <div dir={isUrdu ? 'rtl' : 'ltr'} lang={isUrdu ? 'ur' : 'en'}>
      {/* 2. Below Header: Language Toggle, Font Size +/- in Middle, and Night Mode Button */}
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
      />

      {/* 3. Home Card: White background, thick gold border, bold thick text */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 pb-6">
        <div className="rounded-xl bg-white dark:bg-[#132219] border-[3px] border-[#C89B3C] px-6 sm:px-10 py-8 sm:py-11 text-center shadow-sm space-y-4">
          <p
            className={`text-sm sm:text-base lg:text-lg font-extrabold tracking-wide text-[#111814] dark:text-[#F2CE68] ${
              isUrdu ? 'font-urdu leading-normal' : ''
            }`}
          >
            {isUrdu
              ? 'امام مسلم بن حجاج القشیری النیشاپوری رحمہ اللہ'
              : 'IMAM MUSLIM BIN HAJJAJ AL-NISHAPURI'}
          </p>

          <p
            className={`text-sm sm:text-base lg:text-lg font-extrabold tracking-wide text-[#374151] dark:text-[#FBF6E9] tabular-nums ${
              isUrdu ? 'font-urdu leading-normal' : ''
            }`}
          >
            {isUrdu
              ? 'کل ۵۴ کتب - ۷۵۶۳ احادیث'
              : 'TOTAL 54 BOOKS - 7563 HADITHS'}
          </p>

          <h1
            className={`${
              isUrdu
                ? 'font-urdu text-2xl sm:text-4xl lg:text-5xl leading-[1.6]'
                : 'font-display text-2xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight'
            } font-black text-[#0F3D24] dark:text-[#6EE7B7] text-balance`}
          >
            {isUrdu
              ? 'صحیح مسلم شریف - مکمل ۷ جلدیں'
              : 'SAHIH MUSLIM SHARIF - COMPLETE 7 VOLUMES'}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              type="button"
              onClick={() => onSelectBook(1, 1)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-black rounded-md bg-[#0F3D24] text-[#F2CE68] border-2 border-[#C89B3C] hover:bg-[#14532D] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isUrdu ? 'font-urdu leading-normal' : ''
              }`}
            >
              <span>
                {isUrdu
                  ? 'کتاب ۱: کتاب الایمان (پہلی ۱۰ احادیث) پڑھیں'
                  : 'OPEN BOOK 1: KITAB AL-IMAN (HADITH 1–10)'}
              </span>
              {isUrdu ? (
                <ArrowLeft className="w-4 h-4 stroke-[2.75]" aria-hidden="true" />
              ) : (
                <ArrowRight className="w-4 h-4 stroke-[2.75]" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('books')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-black rounded-md bg-[#F9F2DF] dark:bg-[#182B20] text-[#111814] dark:text-white border-2 border-[#C89B3C] hover:bg-[#F2CE68] hover:text-[#0F3D24] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isUrdu ? 'font-urdu leading-normal' : ''
              }`}
            >
              <span>{isUrdu ? 'تمام ۵۴ کتب دیکھیں' : 'BROWSE ALL 54 BOOKS'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Volume Cards: Dark green background, gold border, very bold thick white and gold text */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2
            className={`text-xl sm:text-2xl font-black text-[#0F3D24] dark:text-[#F2CE68] tracking-tight ${
              isUrdu ? 'font-urdu leading-normal' : ''
            }`}
          >
            {isUrdu ? 'مکمل ۷ جلدیں' : 'COMPLETE 7 VOLUMES'}
          </h2>
          {selectedVolume !== 'all' && (
            <button
              type="button"
              onClick={() => setSelectedVolume('all')}
              className={`px-3.5 py-1.5 text-xs font-black rounded-md bg-[#F9F2DF] dark:bg-[#182B20] text-[#111814] dark:text-white border-2 border-[#C89B3C] hover:bg-[#F2CE68] hover:text-[#0F3D24] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isUrdu ? 'font-urdu leading-normal' : ''
              }`}
            >
              {isUrdu ? 'تمام ۷ جلدیں دکھائیں' : 'SHOW ALL 7 VOLUMES'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {VOLUMES.map((vol) => {
            const isSelected = selectedVolume === vol.number;
            return (
              <button
                key={vol.number}
                type="button"
                onClick={() => {
                  setSelectedVolume(isSelected ? 'all' : vol.number);
                  setSelectedCategoryId('all');
                  scrollToSection('books');
                }}
                aria-pressed={isSelected}
                className={`p-4 rounded-lg bg-[#0F3D24] dark:bg-[#092416] border-[2.5px] transition-transform hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between gap-2 ${
                  isUrdu ? 'text-right' : 'text-left'
                } ${
                  isSelected
                    ? 'border-white dark:border-[#6EE7B7] ring-2 ring-[#C89B3C]'
                    : 'border-[#C89B3C]'
                }`}
              >
                <div
                  className={`text-base sm:text-lg font-black text-[#F2CE68] tracking-wide ${
                    isUrdu ? 'font-urdu leading-normal' : ''
                  }`}
                >
                  {isUrdu ? `جلد نمبر ${vol.number}` : `VOLUME NO ${vol.number}`}
                </div>
                <div
                  className={`text-sm font-extrabold text-white ${
                    isUrdu ? 'font-urdu leading-[1.9]' : 'leading-snug'
                  }`}
                >
                  {isUrdu ? vol.urduTitle : vol.title}
                </div>
                <div className="text-xs font-extrabold text-[#F7EFDA] tabular-nums pt-1 border-t border-[#C89B3C]/40">
                  {isUrdu
                    ? `کتب ${vol.bookRange.replace('Books ', '')} · احادیث ${vol.hadithRange}`
                    : `${vol.bookRange} · Hadiths ${vol.hadithRange}`}
                </div>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => {
              setSelectedVolume('all');
              setSelectedCategoryId('all');
              scrollToSection('books');
            }}
            className={`p-4 rounded-lg bg-[#0F3D24] dark:bg-[#092416] border-[2.5px] transition-transform hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between gap-2 ${
              isUrdu ? 'text-right' : 'text-left'
            } ${
              selectedVolume === 'all'
                ? 'border-white dark:border-[#6EE7B7] ring-2 ring-[#C89B3C]'
                : 'border-[#C89B3C]'
            }`}
          >
            <div
              className={`text-base sm:text-lg font-black text-[#F2CE68] tracking-wide ${
                isUrdu ? 'font-urdu leading-normal' : ''
              }`}
            >
              {isUrdu ? 'تمام ۷ جلدیں' : 'ALL 7 VOLUMES'}
            </div>
            <div
              className={`text-sm font-extrabold text-white ${
                isUrdu ? 'font-urdu leading-[1.9]' : 'leading-snug'
              }`}
            >
              {isUrdu ? 'مکمل صحیح مسلم مجموعہ' : 'Complete Sahih Muslim Collection'}
            </div>
            <div className="text-xs font-extrabold text-[#F7EFDA] tabular-nums pt-1 border-t border-[#C89B3C]/40">
              {isUrdu ? '۵۴ کتب · ۷,۵۶۳ احادیث' : '54 Books · 7,563 Hadiths'}
            </div>
          </button>
        </div>
      </section>

      {/* 5. Category Buttons: Light cream background, gold border, very bold thick black text */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
        <h2
          className={`text-xl sm:text-2xl font-black text-[#0F3D24] dark:text-[#F2CE68] tracking-tight mb-4 ${
            isUrdu ? 'font-urdu leading-normal' : ''
          }`}
        >
          {isUrdu ? 'موضوعات (کیٹیگریز)' : 'CATEGORIES'}
        </h2>
        <div className="flex flex-wrap items-center gap-2.5">
          {CATEGORIES.map((cat) => {
            const active = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategoryId(cat.id);
                  setSelectedVolume('all');
                  scrollToSection('books');
                }}
                aria-pressed={active}
                className={`px-4 py-2 text-xs sm:text-sm font-black rounded-md border-2 border-[#C89B3C] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isUrdu ? 'font-urdu leading-normal' : ''
                } ${
                  active
                    ? 'bg-[#0F3D24] text-[#F2CE68] dark:bg-[#C89B3C] dark:text-[#0F3D24]'
                    : 'bg-[#F9F2DF] dark:bg-[#182B20] text-[#111111] dark:text-[#FBF6E9] hover:bg-[#F2CE68] hover:text-[#0F3D24]'
                }`}
              >
                {isUrdu ? cat.ur : cat.en}
              </button>
            );
          })}
        </div>
      </section>

      {/* Complete List of 54 Books */}
      <section
        id="books"
        className="max-w-6xl mx-auto px-4 sm:px-8 py-10 border-t-2 border-[#C89B3C]/50"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h2
              className={`text-2xl sm:text-3xl font-black text-[#0F3D24] dark:text-[#F2CE68] ${
                isUrdu ? 'font-urdu leading-[1.7]' : ''
              }`}
            >
              {isUrdu
                ? `مکمل ۵۴ کتب کی فہرست (${filteredBooks.length})`
                : `COMPLETE LIST OF 54 BOOKS (${filteredBooks.length})`}
            </h2>
            <p
              className={`text-sm sm:text-base font-bold text-[#374151] dark:text-[#D1D5DB] mt-1 ${
                isUrdu ? 'font-urdu leading-[2]' : ''
              }`}
            >
              {isUrdu
                ? 'عربی متن، اردو ترجمہ اور مختصر تشریح پڑھنے کے لیے کسی بھی کتاب پر کلک کریں۔'
                : 'Click any book to read its Hadiths, Arabic text, translation, and explanation.'}
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search
                className={`w-4 h-4 text-[#0F3D24] dark:text-[#F2CE68] absolute top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5] ${
                  isUrdu ? 'right-3' : 'left-3'
                }`}
                aria-hidden="true"
              />
              <input
                type="text"
                value={bookFilter}
                onChange={(e) => setBookFilter(e.target.value)}
                placeholder={isUrdu ? 'کتاب یا حدیث نمبر...' : 'Filter book or Hadith #...'}
                aria-label="Filter books by title or Hadith number"
                className={`w-full py-2 text-sm font-bold rounded-md border-2 border-[#C89B3C] bg-white dark:bg-[#132219] text-[#111814] dark:text-white placeholder:text-[#6B7280] focus:outline-none focus:border-[#0F3D24] dark:focus:border-[#F2CE68] ${
                  isUrdu ? 'pr-9 pl-3 font-urdu leading-normal' : 'pl-9 pr-3'
                }`}
              />
            </div>
            <button
              type="button"
              onClick={onOpenSearch}
              className={`px-4 py-2 text-sm font-black rounded-md border-2 border-[#C89B3C] bg-[#0F3D24] text-[#F2CE68] hover:bg-[#14532D] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isUrdu ? 'font-urdu leading-normal' : ''
              }`}
            >
              {isUrdu ? 'تفصیلی تلاش' : 'DEEP SEARCH'}
            </button>
          </div>
        </div>

        {filteredBooks.length === 0 ? (
          <div className="p-10 text-center rounded-lg border-2 border-[#C89B3C] bg-white dark:bg-[#132219] text-base font-extrabold text-[#111814] dark:text-white">
            {isUrdu ? 'کوئی کتاب نہیں ملی۔ ' : 'No books matched your filter. '}
            <button
              type="button"
              onClick={() => {
                setSelectedCategoryId('all');
                setSelectedVolume('all');
                setBookFilter('');
              }}
              className="underline text-[#0F3D24] dark:text-[#F2CE68] mx-1 cursor-pointer"
            >
              {isUrdu ? 'دوبارہ دکھائیں' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBooks.map((book) => (
              <button
                key={book.id}
                type="button"
                onClick={() => onSelectBook(book.id)}
                className={`group p-5 rounded-lg border-2 border-[#C89B3C] bg-white dark:bg-[#132219] hover:bg-[#F9F2DF] dark:hover:bg-[#192F23] transition-colors flex flex-col justify-between gap-3 cursor-pointer ${
                  isUrdu ? 'text-right' : 'text-left'
                }`}
              >
                <div className="flex items-start justify-between gap-4 w-full">
                  <div className="min-w-0">
                    <div className="text-xs font-black text-[#0F3D24] dark:text-[#F2CE68] tabular-nums mb-1">
                      {isUrdu
                        ? `کتاب ${String(book.id).padStart(2, '0')} · جلد نمبر ${book.volume} · ${book.totalHadiths} احادیث · #${book.startHadith}–${book.endHadith}`
                        : `BOOK ${String(book.id).padStart(2, '0')} · VOLUME NO ${book.volume} · ${book.totalHadiths} HADITHS · RANGE #${book.startHadith}–${book.endHadith}`}
                    </div>
                    <h3
                      className={`${
                        isUrdu ? 'font-urdu text-lg sm:text-xl leading-[1.9]' : 'text-lg sm:text-xl'
                      } font-black text-[#111814] dark:text-white group-hover:text-[#0F3D24] dark:group-hover:text-[#F2CE68] transition-colors`}
                    >
                      {isUrdu ? book.urduTitle : `${book.translitTitle} — ${book.englishTitle}`}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2 border-t border-[#C89B3C]/40 w-full">
                  <span
                    className={`text-xs sm:text-sm font-bold text-[#374151] dark:text-[#D1D5DB] line-clamp-1 ${
                      isUrdu ? 'font-urdu leading-normal' : ''
                    }`}
                  >
                    {isUrdu ? BOOK_SUMMARIES_URDU[book.id] : book.summary}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-black text-[#0F3D24] dark:text-[#F2CE68] whitespace-nowrap shrink-0 ${
                      isUrdu ? 'font-urdu leading-normal' : ''
                    }`}
                  >
                    <span>{isUrdu ? 'کتاب کھولیں' : 'OPEN BOOK'}</span>
                    {isUrdu ? (
                      <ArrowLeft className="w-4 h-4 stroke-[2.75] transition-transform group-hover:-translate-x-0.5" />
                    ) : (
                      <ArrowRight className="w-4 h-4 stroke-[2.75] transition-transform group-hover:translate-x-0.5" />
                    )}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Author & Archive Profile (#overview) */}
      <section
        id="overview"
        className="max-w-6xl mx-auto px-4 sm:px-8 py-12 border-t-2 border-[#C89B3C]/50"
      >
        <h2
          className={`text-2xl sm:text-3xl font-black text-[#0F3D24] dark:text-[#F2CE68] mb-6 ${
            isUrdu ? 'font-urdu leading-[1.7]' : ''
          }`}
        >
          {isUrdu ? 'صحیح مسلم شریف — مکمل تعارف' : 'SAHIH MUSLIM SHARIF — A TO Z PROFILE'}
        </h2>
        <div className="rounded-lg border-[3px] border-[#C89B3C] bg-white dark:bg-[#132219] overflow-hidden">
          <dl className="divide-y-2 divide-[#E6D5A9] dark:divide-[#1F3A2B]">
            {profileFacts.map((item) => (
              <div
                key={item.label}
                className="px-5 py-4 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4"
              >
                <dt
                  className={`sm:col-span-4 text-xs sm:text-sm font-black text-[#0F3D24] dark:text-[#F2CE68] self-center ${
                    isUrdu ? 'font-urdu leading-normal' : 'uppercase tracking-wider'
                  }`}
                >
                  {item.label}
                </dt>
                <dd
                  className={`sm:col-span-8 text-sm sm:text-base font-extrabold text-[#111814] dark:text-white tabular-nums ${
                    isUrdu ? 'font-urdu leading-[2]' : ''
                  }`}
                >
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 10 Famous Hadiths (#famous-hadiths) */}
      <section
        id="famous-hadiths"
        className="max-w-6xl mx-auto px-4 sm:px-8 py-12 border-t-2 border-[#C89B3C]/50"
      >
        <h2
          className={`text-2xl sm:text-3xl font-black text-[#0F3D24] dark:text-[#F2CE68] mb-2 ${
            isUrdu ? 'font-urdu leading-[1.7]' : ''
          }`}
        >
          {isUrdu ? 'صحیح مسلم کی ۱۰ مشہور احادیث' : '10 FAMOUS HADITHS IN SAHIH MUSLIM'}
        </h2>
        <p
          className={`text-sm sm:text-base font-bold text-[#374151] dark:text-[#D1D5DB] mb-6 ${
            isUrdu ? 'font-urdu leading-[2]' : ''
          }`}
        >
          {isUrdu
            ? 'نمایاں نبوی ارشادات عربی متن، اردو ترجمہ اور کتاب کے لنک کے ساتھ۔'
            : 'Key Prophetic narrations with Arabic text, bold English translation, and direct links to each book.'}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {FAMOUS_HADITHS.map((hadith, idx) => {
            const book = BOOKS_54.find((b) => b.id === hadith.bookId);
            return (
              <article
                key={hadith.id}
                className="p-6 rounded-lg border-2 border-[#C89B3C] bg-white dark:bg-[#132219] flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="text-xs font-black text-[#0F3D24] dark:text-[#F2CE68] tabular-nums">
                    {isUrdu
                      ? `${String(idx + 1).padStart(2, '0')} · حدیث #${hadith.hadithNumber} · ${book?.urduTitle}`
                      : `${String(idx + 1).padStart(2, '0')} · HADITH #${hadith.hadithNumber} · ${book?.translitTitle}`}
                  </div>
                  <h3
                    className={`${
                      isUrdu ? 'font-urdu text-lg sm:text-xl leading-[1.9]' : 'text-lg sm:text-xl'
                    } font-black text-[#111814] dark:text-white`}
                  >
                    {isUrdu
                      ? FAMOUS_TITLES_URDU[hadith.id] ?? hadith.famousTitle
                      : hadith.famousTitle}
                  </h3>

                  <p
                    dir="rtl"
                    lang="ar"
                    style={{ fontSize: `${arabicSizePx}px` }}
                    className="font-arabic font-bold text-right text-[#0F3D24] dark:text-[#6EE7B7]"
                  >
                    {hadith.arabic}
                  </p>

                  {isUrdu ? (
                    <>
                      <p
                        dir="rtl"
                        lang="ur"
                        style={{ fontSize: `${urduSizePx}px` }}
                        className="font-urdu font-bold text-right text-[#111814] dark:text-[#FBF6E9]"
                      >
                        {hadith.urdu}
                      </p>
                      <p className="font-urdu text-sm font-bold text-[#374151] dark:text-[#D1D5DB] leading-[2.1]">
                        {HADITH_EXPLANATIONS_URDU[hadith.id] ?? hadith.explanation}
                      </p>
                    </>
                  ) : (
                    <p
                      style={{ fontSize: `${proseSizePx}px` }}
                      className="font-extrabold text-[#111814] dark:text-[#FBF6E9] leading-relaxed"
                    >
                      {hadith.english}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-[#C89B3C]/40 flex items-center justify-between gap-4">
                  <span className="text-xs font-extrabold text-[#4B5563] dark:text-[#D1D5DB]">
                    {isUrdu ? `راوی: ${hadith.narrator}` : `Narrated by ${hadith.narrator}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectBook(hadith.bookId, hadith.hadithNumber)}
                    className={`inline-flex items-center gap-1.5 text-xs font-black text-[#0F3D24] dark:text-[#F2CE68] hover:underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer ${
                      isUrdu ? 'font-urdu leading-normal' : ''
                    }`}
                  >
                    <span>
                      {isUrdu ? `کتاب ${hadith.bookId} میں پڑھیں` : `READ IN BOOK ${hadith.bookId}`}
                    </span>
                    {isUrdu ? (
                      <ArrowLeft className="w-3.5 h-3.5 stroke-[2.75]" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.75]" />
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Introduction, Method of Imam Muslim & Importance (#methodology) */}
      <section
        id="methodology"
        className="max-w-6xl mx-auto px-4 sm:px-8 py-12 border-t-2 border-[#C89B3C]/50 space-y-10"
      >
        <div className="space-y-4">
          <h2
            className={`text-2xl sm:text-3xl font-black text-[#0F3D24] dark:text-[#F2CE68] ${
              isUrdu ? 'font-urdu leading-[1.7]' : ''
            }`}
          >
            {isUrdu
              ? 'مقدمہ اور امام مسلم رحمہ اللہ کا اصولِ تدوین'
              : 'INTRODUCTION & METHOD OF IMAM MUSLIM'}
          </h2>
          <div className="space-y-4 p-6 rounded-lg border-2 border-[#C89B3C] bg-white dark:bg-[#132219]">
            {introParagraphs.map((para, i) => (
              <p
                key={i}
                style={{ fontSize: `${proseSizePx}px` }}
                className={`font-bold text-[#111814] dark:text-[#FBF6E9] ${
                  isUrdu ? 'font-urdu leading-[2.25]' : 'leading-relaxed'
                }`}
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h3
            className={`text-xl sm:text-2xl font-black text-[#0F3D24] dark:text-[#F2CE68] mb-4 ${
              isUrdu ? 'font-urdu leading-[1.7]' : ''
            }`}
          >
            {isUrdu
              ? 'امام مسلم رحمہ اللہ کے ۶ بنیادی اصول'
              : 'METHOD OF IMAM MUSLIM (6 PRINCIPLES)'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {methodSteps.map((step) => (
              <div
                key={step.number}
                className="p-5 rounded-lg border-2 border-[#C89B3C] bg-[#0F3D24] dark:bg-[#092416]"
              >
                <div
                  className={`text-sm font-black text-[#F2CE68] mb-1 ${
                    isUrdu ? 'font-urdu leading-[1.9]' : ''
                  }`}
                >
                  {step.number}. {isUrdu ? step.title : step.title.toUpperCase()}
                </div>
                <p
                  className={`text-sm font-bold text-white ${
                    isUrdu ? 'font-urdu leading-[2.1]' : 'leading-relaxed'
                  }`}
                >
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-lg border-[3px] border-[#C89B3C] bg-white dark:bg-[#132219] space-y-2">
          <h3
            className={`text-xl sm:text-2xl font-black text-[#0F3D24] dark:text-[#F2CE68] ${
              isUrdu ? 'font-urdu leading-[1.7]' : ''
            }`}
          >
            {isUrdu ? 'صحیح مسلم کی اہمیت و افادیت' : 'WHY SAHIH MUSLIM IS IMPORTANT'}
          </h3>
          <p
            style={{ fontSize: `${proseSizePx}px` }}
            className={`font-extrabold text-[#111814] dark:text-[#FBF6E9] ${
              isUrdu ? 'font-urdu leading-[2.25]' : 'leading-relaxed'
            }`}
          >
            {importanceText}
          </p>
        </div>
      </section>
    </div>
  );
}
