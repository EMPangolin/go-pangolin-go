import React from 'react';
import { useReveal } from '../hooks/useReveal';

const partners = [
  { src: 'img/avax.png', name: 'Avalanche', url: 'https://avax.network' },
  { src: 'img/coinbase.png', name: 'Coinbase', url: 'https://www.coinbase.com' },
  { src: 'img/thorchain-82a85bd6.svg', name: 'Thorchain', url: 'https://thorchain.org' },
  { src: 'img/axelar-c3f4a6fa.svg', name: 'Axelar', url: 'https://axelar.network' },
  { src: 'img/flare-93f4164e.svg', name: 'Flare', url: 'https://flare.network' },
  { src: 'img/squid-11d8696c.svg', name: 'Squid', url: 'https://www.squidrouter.com' },
];

const PartnerLogo = ({ partner }: { partner: typeof partners[0] }) => (
  <a
    href={partner.url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-5 px-10 shrink-0 group"
    aria-label={`Visit ${partner.name}`}
  >
    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:border-amber-400/25 group-hover:bg-white/[0.06] transition-all duration-300">
      <img
        src={partner.src}
        alt=""
        className="h-8 w-auto opacity-50 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0"
      />
    </div>
    <span className="text-sm font-medium text-zinc-500 group-hover:text-zinc-200 transition-colors whitespace-nowrap">{partner.name}</span>
  </a>
);

const Partners = () => {
  const headerRef = useReveal<HTMLDivElement>();
  const doubled = [...partners, ...partners];

  return (
    <section id="partners" className="py-24 lg:py-32 border-y border-white/[0.06] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-400/[0.02] via-transparent to-transparent pointer-events-none" aria-hidden="true"></div>

      <div ref={headerRef} className="reveal max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 text-center relative">
        <p className="section-label mb-4">Ecosystem</p>
        <h2 className="display-lg text-3xl sm:text-4xl lg:text-5xl text-white">Backed by World-Class Partners</h2>
      </div>

      <div className="fade-edge overflow-hidden py-4">
        <div className="marquee-track">
          {doubled.map((partner, index) => (
            <PartnerLogo key={`${partner.name}-${index}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
