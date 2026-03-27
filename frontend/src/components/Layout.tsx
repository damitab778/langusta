import type { ReactNode } from 'react';
import Navbar from './Navbar';
import { useLang } from '../hooks/useLang';

export default function Layout({ children }: { children: ReactNode }) {
  const { t } = useLang();

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f7f5]">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
        {children}
      </main>
      <footer className="border-t border-gray-200 bg-white text-center text-sm text-gray-400 py-4">
        © {new Date().getFullYear()} Langusta — {t.footer}
      </footer>
    </div>
  );
}
