import { Search } from 'lucide-react';
import { AppLanguage } from '../data/urduContent';

interface HeaderProps {
  lang: AppLanguage;
  onNavigateHome: (sectionId?: string) => void;
  onOpenSearch: () => void;
}

export function Header({ lang, onNavigateHome, onOpenSearch }: HeaderProps) {
  const isUrdu = lang === 'ur';

  return (
    <header
      dir={isUrdu ? 'rtl' : 'ltr'}
      className="bg-[#0F3D24] dark:bg-[#071D11] border-b-[3px] border-[#C89B3C]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Title */}
        <button
          type="button"
          onClick={() => onNavigateHome()}
          className={`${
            isUrdu
              ? 'font-urdu text-base sm:text-lg lg:text-xl leading-normal'
              : 'font-display text-sm sm:text-base lg:text-lg tracking-wide'
          } font-black text-[#F2CE68] hover:text-white transition-colors whitespace-nowrap shrink-0 truncate max-w-[65vw] sm:max-w-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2CE68]`}
        >
          {isUrdu
            ? 'صحیح مسلم شریف - ۷ جلدیں - ۵۴ کتب'
            : 'SAHIH MUSLIM SHARIF - 7 VOLUMES - 54 BOOKS'}
        </button>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav
          aria-label="Primary navigation"
          className={`hidden xl:flex items-center gap-6 ${
            isUrdu ? 'font-urdu text-sm leading-normal' : 'text-sm'
          } font-extrabold text-[#FBF6E9]`}
        >
          <button
            type="button"
            onClick={() => onNavigateHome('overview')}
            className="hover:text-[#F2CE68] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isUrdu ? 'تعارف' : 'Overview'}
          </button>
          <button
            type="button"
            onClick={() => onNavigateHome('books')}
            className="hover:text-[#F2CE68] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isUrdu ? '۵۴ کتب' : '54 Books'}
          </button>
          <button
            type="button"
            onClick={() => onNavigateHome('famous-hadiths')}
            className="hover:text-[#F2CE68] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isUrdu ? 'مشہور احادیث' : 'Famous Hadiths'}
          </button>
          <button
            type="button"
            onClick={() => onNavigateHome('methodology')}
            className="hover:text-[#F2CE68] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isUrdu ? 'منہجِ امام مسلم' : 'Methodology'}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-extrabold rounded-md bg-[#C89B3C] text-[#0F3D24] hover:bg-[#F2CE68] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2CE68] ${
              isUrdu ? 'font-urdu leading-normal' : ''
            }`}
          >
            <Search className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
            <span>{isUrdu ? 'تلاش کریں' : 'SEARCH'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
