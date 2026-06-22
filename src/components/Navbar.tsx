import React, { useEffect, useState } from 'react';

const navLinks = [
  { href: '#stats', label: 'Metrics' },
  { href: '#features', label: 'Features' },
  { href: '#partners', label: 'Partners' },
  { href: '#chains', label: 'Chains' },
  { href: '#community', label: 'Community' },
  { href: 'https://docs.pangolin.exchange', label: 'Docs', external: true },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const btn = document.getElementById('mobile-btn');
    const panel = document.getElementById('mobile-panel');
    const closeBtn = document.getElementById('close-panel');
    const links = panel?.querySelectorAll('a');

    if (btn && panel && closeBtn) {
      btn.onclick = () => panel.classList.remove('translate-x-full');
      closeBtn.onclick = () => panel.classList.add('translate-x-full');
      links?.forEach(a => a.addEventListener('click', () => panel.classList.add('translate-x-full')));
    }
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 glass-strong border-b border-white/[0.06] transition-[background,box-shadow] duration-300 ${scrolled ? 'nav-scrolled' : ''}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-[4.5rem]">
        <a href="/" className="flex items-center gap-3 group">
          <img src="img/logo-dark-9m2OjO-5.svg" alt="Pangolin" className="h-8 transition-transform duration-300 group-hover:scale-[1.02]" />
        </a>

        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="px-3.5 py-2 text-sm text-zinc-400 hover:text-white rounded-lg hover:bg-white/[0.04] transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://app.pangolin.exchange"
            className="ml-4 px-5 py-2.5 rounded-full btn-primary text-sm"
          >
            Launch App
          </a>
        </div>

        <button id="mobile-btn" className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors" aria-label="Open menu">
          <i className="fas fa-bars" aria-hidden="true"></i>
        </button>
      </div>

      <div id="mobile-panel" className="lg:hidden fixed top-16 right-0 w-full max-w-xs h-[calc(100vh-4rem)] glass-strong border-l border-white/[0.06] z-40 translate-x-full transition-transform duration-300 ease-out">
        <button id="close-panel" className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white" aria-label="Close menu">
          <i className="fas fa-times" aria-hidden="true"></i>
        </button>
        <div className="flex flex-col gap-1 pt-16 px-4">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="px-4 py-3 text-base text-zinc-300 hover:text-white rounded-xl hover:bg-white/[0.04] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="https://app.pangolin.exchange" className="mt-4 px-5 py-3 rounded-full btn-primary text-center text-sm">
            Launch App
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
