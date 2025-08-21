'use client';
import Link from 'next/link';
import Logo from './Logo';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-[#0b1625]/70 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        <nav className="flex items-center gap-6 text-sm text-white/80">
          <a href="#work" className="hover:text-white">Work</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
      </div>
    </header>
  );
}
