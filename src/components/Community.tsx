import React from 'react';

const socials = [
  { href: 'https://t.me/pangolinv3', icon: 'fab fa-telegram', color: 'text-sky-400', label: 'Telegram' },
  { href: 'https://x.com/pangolindex', svg: true, label: 'X' },
  { href: 'https://discord.gg/nP5WExFS', icon: 'fab fa-discord', color: 'text-indigo-400', label: 'Discord' },
  { href: 'https://github.com/pangolindex/', icon: 'fab fa-github', color: 'text-slate-300', label: 'GitHub' },
  { href: 'https://pangolindex.medium.com/', icon: 'fab fa-medium', color: 'text-neutral-300', label: 'Medium' },
  { href: 'https://www.reddit.com/r/PangolinExchange/', icon: 'fab fa-reddit', color: 'text-orange-400', label: 'Reddit' },
  { href: 'https://linktr.ee/pangolin.exchange', icon: 'fas fa-link', color: 'text-green-400', label: 'Linktree' },
];

const Community = () => {
  return (
    <section id="community" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-5xl font-bold text-center mb-16">Join Our Community</h2>
      <div className="flex justify-center flex-wrap gap-10">
        {socials.map((s, i) => (
          <a
            key={i}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="elevate w-32 h-32 bg-slate-800/50 rounded-3xl flex flex-col items-center justify-center border border-slate-700/50 hover:border-white"
            aria-label={`Join Pangolin on ${s.label} (Opens in new tab)`}
          >
            {s.svg ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" className="w-10 h-10 fill-white" aria-hidden="true">
                <path d="M75.5 15h19.2L70.1 53.1l28.3 41.9H79.1L59.8 68.9 37.8 95H18l27.6-33.2L18 24.9h22.1l16.4 23.8L75.5 15zm-6.7 76.1h10.6L35.2 29.4H24.1l44.7 61.7z" />
              </svg>
            ) : (
              <i className={`${s.icon} text-5xl ${s.color}`} aria-hidden="true"></i>
            )}
            <span className="mt-2 font-semibold">{s.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Community;
