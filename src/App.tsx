/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { BookReader } from './components/BookReader';
import { SearchModal } from './components/SearchModal';
import { AppLanguage } from './data/urduContent';

export default function App() {
  const [lang, setLang] = useState<AppLanguage>(() => {
    try {
      const saved = localStorage.getItem('sahih_muslim_lang_v2');
      return saved === 'en' ? 'en' : 'ur';
    } catch {
      return 'ur';
    }
  });

  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [targetHadithNumber, setTargetHadithNumber] = useState<number | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem('sahih_muslim_theme') === 'dark';
    } catch {
      return false;
    }
  });

  const [fontScale, setFontScale] = useState<number>(() => {
    try {
      const saved = Number(localStorage.getItem('sahih_muslim_font_scale'));
      return saved >= 0.85 && saved <= 1.45 ? saved : 1;
    } catch {
      return 1;
    }
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('sahih_muslim_bookmarks');
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });

  // Persist language
  useEffect(() => {
    try {
      localStorage.setItem('sahih_muslim_lang_v2', lang);
    } catch {
      // ignore storage errors
    }
  }, [lang]);

  // Sync .dark class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    try {
      localStorage.setItem('sahih_muslim_theme', isDark ? 'dark' : 'light');
    } catch {
      // ignore storage errors
    }
  }, [isDark]);

  // Persist fontScale
  useEffect(() => {
    try {
      localStorage.setItem('sahih_muslim_font_scale', String(fontScale));
    } catch {
      // ignore storage errors
    }
  }, [fontScale]);

  // Persist bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('sahih_muslim_bookmarks', JSON.stringify(bookmarks));
    } catch {
      // ignore storage errors
    }
  }, [bookmarks]);

  // Cmd/Ctrl + K opens Search Archive
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleDecreaseFont = () => {
    setFontScale((prev) => Math.max(0.85, Number((prev - 0.1).toFixed(2))));
  };

  const handleIncreaseFont = () => {
    setFontScale((prev) => Math.min(1.45, Number((prev + 0.1).toFixed(2))));
  };

  const handleResetFont = () => {
    setFontScale(1);
  };

  const handleToggleBookmark = (hadithId: string) => {
    setBookmarks((prev) =>
      prev.includes(hadithId)
        ? prev.filter((id) => id !== hadithId)
        : [...prev, hadithId]
    );
  };

  const handleSelectBook = (bookId: number, hadithNum?: number) => {
    setSelectedBookId(bookId);
    setTargetHadithNumber(hadithNum);
  };

  const handleNavigateHome = (sectionId?: string) => {
    setSelectedBookId(null);
    setTargetHadithNumber(undefined);
    if (sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isUrdu = lang === 'ur';

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF6E9] text-[#111814] dark:bg-[#0B1410] dark:text-[#FBF6E9]">
      <Header
        lang={lang}
        onNavigateHome={handleNavigateHome}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <div className="flex-1">
        {selectedBookId === null ? (
          <HomePage
            lang={lang}
            onChangeLang={setLang}
            fontScale={fontScale}
            onDecreaseFont={handleDecreaseFont}
            onIncreaseFont={handleIncreaseFont}
            onResetFont={handleResetFont}
            isDark={isDark}
            onToggleDark={() => setIsDark((prev) => !prev)}
            onOpenSearch={() => setIsSearchOpen(true)}
            bookmarks={bookmarks}
            onSelectBook={handleSelectBook}
          />
        ) : (
          <BookReader
            lang={lang}
            onChangeLang={setLang}
            bookId={selectedBookId}
            initialHadithNumber={targetHadithNumber}
            fontScale={fontScale}
            onDecreaseFont={handleDecreaseFont}
            onIncreaseFont={handleIncreaseFont}
            onResetFont={handleResetFont}
            isDark={isDark}
            onToggleDark={() => setIsDark((prev) => !prev)}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onSelectBook={handleSelectBook}
            onBackToCatalog={() => handleNavigateHome('books')}
          />
        )}
      </div>

      {/* Footer */}
      <footer
        dir={isUrdu ? 'rtl' : 'ltr'}
        className="border-t-[3px] border-[#C89B3C] bg-[#0F3D24] dark:bg-[#071D11] text-[#FBF6E9]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm font-extrabold">
          <div>
            <span className={`text-[#F2CE68] ${isUrdu ? 'font-urdu leading-normal' : ''}`}>
              {isUrdu ? 'صحیح مسلم شریف' : 'SAHIH MUSLIM SHARIF'}
            </span>
            <span className="mx-2 text-[#C89B3C]" aria-hidden="true">·</span>
            <span className={isUrdu ? 'font-urdu leading-normal' : ''}>
              {isUrdu
                ? 'امام مسلم بن حجاج النیشاپوری رحمہ اللہ (۲۰۴ تا ۲۶۱ ہجری)'
                : 'Imam Muslim bin Hajjaj Al-Nishapuri (204–261 AH)'}
            </span>
          </div>
          <div className={`flex items-center gap-5 text-[#F2CE68] ${isUrdu ? 'font-urdu leading-normal' : ''}`}>
            <button
              type="button"
              onClick={() => handleNavigateHome('books')}
              className="hover:text-white hover:underline cursor-pointer"
            >
              {isUrdu ? '۵۴ کتب' : '54 Books'}
            </button>
            <button
              type="button"
              onClick={() => handleNavigateHome('famous-hadiths')}
              className="hover:text-white hover:underline cursor-pointer"
            >
              {isUrdu ? 'مشہور احادیث' : 'Famous Hadiths'}
            </button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="hover:text-white hover:underline cursor-pointer"
            >
              {isUrdu ? 'تلاش' : 'Search'}
            </button>
          </div>
        </div>
      </footer>

      <SearchModal
        lang={lang}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectBook={handleSelectBook}
      />
    </div>
  );
}
