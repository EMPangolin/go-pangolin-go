import React from 'react';
import { useReveal } from '../hooks/useReveal';

// `brand` is each platform's official mark color; the CSS hook in index.html
// (`.social-chip:hover .social-icon`) tints the icon to that color on hover so
// the chip "lights up" in the platform's own identity.
const socials: Array<{
  href: string;
  icon?: string;
  svg?: boolean;
  label: string;
  brand: string;
}> = [
  { href: 'https://t.me/pangolinv3', icon: 'fab fa-telegram', label: 'Telegram', brand: '#229ED9' },
  { href: 'https://x.com/pangolindex', svg: true, label: 'X', brand: '#ffffff' },
  { href: 'https://discord.gg/a6JJybnMhY', icon: 'fab fa-discord', label: 'Discord', brand: '#5865F2' },
  { href: 'https://github.com/pangolindex/', icon: 'fab fa-github', label: 'GitHub', brand: '#f0f6fc' },
  { href: 'https://pangolindex.medium.com/', icon: 'fab fa-medium', label: 'Medium', brand: '#ffffff' },
  { href: 'https://www.reddit.com/r/PangolinExchange/', icon: 'fab fa-reddit', label: 'Reddit', brand: '#FF4500' },
  { href: 'https://linktr.ee/pangolin.exchange', icon: 'fas fa-link', label: 'Linktree', brand: '#43E660' },
];

const delayStyle = (i: number): React.CSSProperties => ({
  transitionDelay: `${Math.min(i * 80, 320)}ms`,
});

const Community = () => {
  const cardRef = useReveal<HTMLDivElement>();

  return (
    <section id="community" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div ref={cardRef} className="reveal glass-layer rounded-[1.75rem] p-10 sm:p-14 lg:p-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 dot-grid dot-grid-mask opacity-30 pointer-events-none" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(251,191,36,0.1),transparent_70%)] pointer-events-none" aria-hidden="true"></div>
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

        <div className="relative">
          <p className="section-label mb-4">Community</p>
          <h2 className="display-lg text-3xl sm:text-4xl lg:text-5xl text-white mb-5">
            Join Our Community
          </h2>
          <p className="text-zinc-400 max-w-md mx-auto mb-12 leading-relaxed">
            Get updates, governance news, and support across our official channels.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {socials.map((s, i) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...delayStyle(i), ['--brand' as any]: s.brand }}
                className="social-chip inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm text-zinc-300 hover:-translate-y-0.5 transition-all duration-200"
                aria-label={`Join on ${s.label}`}
              >
                {s.svg ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" className="social-svg w-4 h-4 fill-current" aria-hidden="true">
                    <path d="M75.5 15h19.2L70.1 53.1l28.3 41.9H79.1L59.8 68.9 37.8 95H18l27.6-33.2L18 24.9h22.1l16.4 23.8L75.5 15zm-6.7 76.1h10.6L35.2 29.4H24.1l44.7 61.7z" />
                  </svg>
                ) : (
                  <i className={`${s.icon} social-icon text-base`} aria-hidden="true"></i>
                )}
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
