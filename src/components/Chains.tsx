import React from 'react';
import { useReveal } from '../hooks/useReveal';

const delayStyle = (i: number): React.CSSProperties => ({
  transitionDelay: `${Math.min(i * 80, 320)}ms`,
});

const chains = [
  { name: 'Avalanche', short: 'AVAX', src: 'img/avax.png', url: 'https://avax.network', primary: true },
  { name: 'Hedera', short: 'HBAR', src: 'img/hedera.png', url: 'https://hedera.com' },
  { name: 'Flare', short: 'FLR', src: 'img/flare-93f4164e.svg', url: 'https://flare.network' },
  { name: 'Songbird', short: 'SGB', src: 'img/sgb.png', url: 'https://flare.network' },
];

const Chains = () => {
  const headerRef = useReveal<HTMLDivElement>();

  return (
    <section id="chains" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div ref={headerRef} className="reveal text-center mb-14 lg:mb-20">
        <p className="section-label mb-4">Networks</p>
        <h2 className="display-lg text-3xl sm:text-4xl lg:text-5xl text-white">Supported Blockchain Networks</h2>
        <p className="mt-5 text-zinc-400 max-w-lg mx-auto leading-relaxed">Trade and provide liquidity across supported chains from a single interface.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {chains.map((chain, i) => (
          <ChainCard key={chain.name} chain={chain} index={i} />
        ))}
      </div>
    </section>
  );
};

function ChainCard({ chain, index }: { chain: typeof chains[0]; index: number }) {
  const ref = useReveal<HTMLAnchorElement>();

  return (
    <a
      ref={ref}
      href={chain.url}
      target="_blank"
      rel="noopener noreferrer"
      style={delayStyle(index)}
      className={`reveal glass-layer bento-card rounded-2xl p-6 lg:p-8 text-center group block relative overflow-hidden ${chain.primary ? 'ring-1 ring-[#e84142]/35' : ''}`}
      aria-label={`Visit ${chain.name}`}
    >
      <div
        className={`absolute inset-0 dot-grid-mask pointer-events-none ${chain.primary ? 'dot-grid-avax opacity-70' : 'dot-grid opacity-60'}`}
        aria-hidden="true"
      ></div>
      <div className="relative">
        <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.1] flex items-center justify-center transition-all duration-300 ${
          chain.primary
            ? 'group-hover:border-[#e84142]/50 group-hover:shadow-[0_0_32px_rgba(232,65,66,0.22)]'
            : 'group-hover:border-amber-400/40 group-hover:shadow-[0_0_32px_rgba(251,191,36,0.14)]'
        }`}>
          <img src={chain.src} className="h-9 w-9 object-contain" alt="" />
        </div>
        <p className="font-display font-bold text-white text-lg">{chain.name}</p>
        <p className="font-mono text-sm text-zinc-400 mt-2 tracking-[0.05em]">{chain.short}</p>
        {chain.primary && (
          <span className="inline-flex items-center gap-1.5 mt-4 text-xs font-mono uppercase tracking-[0.08em] text-[#ff6b6c] px-2.5 py-1 rounded-full border border-[#e84142]/40 bg-[#e84142]/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e84142] animate-pulse"></span>
            Home chain
          </span>
        )}
      </div>
    </a>
  );
}

export default Chains;
