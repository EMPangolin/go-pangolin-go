import React from 'react';

const partners = [
  { src: 'img/avax.png', name: 'Avalanche', delay: '1.5s', url: 'https://avax.network' },
  { src: 'img/coinbase.png', name: 'Coinbase', url: 'https://www.coinbase.com' },
  { src: 'img/thorchain-82a85bd6.svg', name: 'Thorchain', delay: '.5s', url: 'https://thorchain.org' },
  { src: 'img/axelar-c3f4a6fa.svg', name: 'Axelar', delay: '1s', url: 'https://axelar.network' },
  { src: 'img/flare-93f4164e.svg', name: 'Flare', delay: '1.5s', url: 'https://flare.network' },
  { src: 'img/squid-11d8696c.svg', name: 'Squid', delay: '1.5s', url: 'https://www.squidrouter.com' }
];

const Partners = () => {
  return (
    <section id="partners" className="py-28 px-4 sm:px-6 lg:px-8 bg-slate-800/30 border-y border-slate-800">
      <h2 className="text-5xl font-bold text-center mb-16">Backed by World-Class Partners</h2>
      <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24">
        {partners.map((partner, index) => (
          <a
            key={index}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-center"
            aria-label={`Visit ${partner.name}`}
          >
            <img
              src={partner.src}
              alt={`${partner.name} Partner`}
              className="h-24 animate-float"
              style={partner.delay ? { animationDelay: partner.delay } : undefined}
            />
            <span className="mt-3 text-slate-300 font-medium">{partner.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Partners;
