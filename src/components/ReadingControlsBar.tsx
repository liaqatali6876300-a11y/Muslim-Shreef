import { Minus, Plus, Moon, Sun, Bookmark } from 'lucide-react';
import { AppLanguage } from '../data/urduContent';

interface ReadingControlsBarProps {
  lang: AppLanguage;
  onChangeLang: (lang: AppLanguage) => void;
  fontScale: number;
  onDecreaseFont: () => void;
  onIncreaseFont: () => void;
  onResetFont: () => void;
  isDark: boolean;
  onToggleDark: () => void;
  bookmarkCount: number;
  showBookmarksOnly?: boolean;
  onToggleBookmarksOnly?: () => void;
}

export function ReadingControlsBar({
  lang,
  onChangeLang,
  fontScale,
  onDecreaseFont,
  onIncreaseFont,
  onResetFont,
  isDark,
  onToggleDark,
  bookmarkCount,
  showBookmarksOnly,
  onToggleBookmarksOnly,
}: ReadingControlsBarProps) {
  const scalePercent = Math.round(fontScale * 100);
  const isUrdu = lang === 'ur';

  return (
    <div
      role="region"
      dir={isUrdu ? 'rtl' : 'ltr'}
      aria-label="Font size, language, and display controls"
      className="bg-[#F7EFDA] dark:bg-[#102218] border-b-2 border-[#C89B3C]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {/* Language Switch: ENGLISH | اردو */}
        <div
          role="group"
          aria-label="Language selection"
          dir="ltr"
          className="inline-flex items-center rounded-md border-2 border-[#C89B3C] bg-white dark:bg-[#0B1410] p-0.5"
        >
          <button
            type="button"
            onClick={() => onChangeLang('en')}
            aria-pressed={lang === 'en'}
            className={`px-3 py-1.5 text-xs sm:text-sm font-black rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              lang === 'en'
                ? 'bg-[#0F3D24] text-[#F2CE68]'
                : 'text-[#111814] dark:text-[#FBF6E9] hover:text-[#0F3D24]'
            }`}
          >
            ENGLISH
          </button>
          <button
            type="button"
            onClick={() => onChangeLang('ur')}
            aria-pressed={lang === 'ur'}
            className={`px-3 py-1.5 font-urdu text-xs sm:text-sm font-bold leading-normal rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              lang === 'ur'
                ? 'bg-[#0F3D24] text-[#F2CE68]'
                : 'text-[#111814] dark:text-[#FBF6E9] hover:text-[#0F3D24]'
            }`}
          >
            اردو
          </button>
        </div>

        {/* Font Size - and + buttons in middle */}
        <div
          dir="ltr"
          className="inline-flex items-center rounded-md border-2 border-[#C89B3C] bg-white dark:bg-[#0B1410]"
          aria-label="Font size controls"
        >
          <button
            type="button"
            onClick={onDecreaseFont}
            disabled={fontScale <= 0.85}
            aria-label="Decrease font size"
            className={`inline-flex items-center gap-1 px-3.5 py-2 text-xs sm:text-sm font-black text-[#0F3D24] dark:text-[#F2CE68] hover:bg-[#F7EFDA] dark:hover:bg-[#152C1F] disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-l-sm whitespace-nowrap shrink-0 cursor-pointer ${
              isUrdu ? 'font-urdu leading-normal' : ''
            }`}
          >
            <Minus className="w-4 h-4 stroke-[2.75]" aria-hidden="true" />
            <span>{isUrdu ? 'فونٹ -' : 'FONT -'}</span>
          </button>

          <button
            type="button"
            onClick={onResetFont}
            title="Reset font size to 100%"
            className="px-3 py-2 text-xs sm:text-sm font-black tabular-nums text-[#111814] dark:text-white border-x-2 border-[#C89B3C] hover:bg-[#F7EFDA] dark:hover:bg-[#152C1F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {scalePercent}%
          </button>

          <button
            type="button"
            onClick={onIncreaseFont}
            disabled={fontScale >= 1.45}
            aria-label="Increase font size"
            className={`inline-flex items-center gap-1 px-3.5 py-2 text-xs sm:text-sm font-black text-[#0F3D24] dark:text-[#F2CE68] hover:bg-[#F7EFDA] dark:hover:bg-[#152C1F] disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-r-sm whitespace-nowrap shrink-0 cursor-pointer ${
              isUrdu ? 'font-urdu leading-normal' : ''
            }`}
          >
            <Plus className="w-4 h-4 stroke-[2.75]" aria-hidden="true" />
            <span>{isUrdu ? 'فونٹ +' : 'FONT +'}</span>
          </button>
        </div>

        {/* Night Mode button */}
        <button
          type="button"
          onClick={onToggleDark}
          aria-pressed={isDark}
          className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-black rounded-md border-2 border-[#C89B3C] bg-[#0F3D24] text-[#F2CE68] hover:bg-[#14532D] dark:bg-[#C89B3C] dark:text-[#0B1410] dark:hover:bg-[#F2CE68] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            isUrdu ? 'font-urdu leading-normal' : ''
          }`}
        >
          {isDark ? (
            <>
              <Sun className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
              <span>{isUrdu ? 'ڈے موڈ' : 'DAY MODE'}</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
              <span>{isUrdu ? 'نائٹ موڈ' : 'NIGHT MODE'}</span>
            </>
          )}
        </button>

        {/* Optional Saved Bookmarks Toggle inside Book Reader */}
        {onToggleBookmarksOnly && (
          <button
            type="button"
            onClick={onToggleBookmarksOnly}
            aria-pressed={showBookmarksOnly}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-black rounded-md border-2 border-[#C89B3C] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isUrdu ? 'font-urdu leading-normal' : ''
            } ${
              showBookmarksOnly
                ? 'bg-[#0F3D24] text-white dark:bg-[#F2CE68] dark:text-[#0B1410]'
                : 'bg-white dark:bg-[#0B1410] text-[#111814] dark:text-[#FBF6E9] hover:bg-[#F7EFDA] dark:hover:bg-[#152C1F]'
            }`}
          >
            <Bookmark className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
            <span>{isUrdu ? 'محفوظ' : 'SAVED'}</span>
            <span className="tabular-nums">({bookmarkCount})</span>
          </button>
        )}
      </div>
    </div>
  );
}
