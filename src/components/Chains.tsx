import React from 'react';

const chains = [
  { name: 'AVAX', src: 'img/avax.png', url: 'https://avax.network' },
  { name: 'Hedera', src: 'img/hedera.png', url: 'https://hedera.com' },
  { name: 'Flare', src: 'img/flare-93f4164e.svg', url: 'https://flare.network' },
  { name: 'SGB', src: 'img/sgb.png', url: 'https://flare.network' }
];

const Chains = () => {
  return (
    <section id="chains" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-5xl font-bold text-center mb-16">Supported Blockchain Networks</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {chains.map((chain, index) => (
          <a
            key={index}
            href={chain.url}
            target="_blank"
            rel="noopener noreferrer"
            className="elevate glow-ring p-10 bg-slate-800/50 rounded-3xl border border-slate-700/50 block"
            aria-label={`Visit ${chain.name} website`}
          >
            <img src={chain.src} className="h-16 mx-auto mb-4" alt={`${chain.name} Network`} />
            <span className="text-2xl font-bold block">{chain.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Chains;
