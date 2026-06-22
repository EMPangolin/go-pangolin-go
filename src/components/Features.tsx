import React from 'react';
import { useReveal } from '../hooks/useReveal';

const delayStyle = (i: number): React.CSSProperties => ({
  transitionDelay: `${Math.min(i * 80, 320)}ms`,
});

const features = [
  {
    title: 'Concentrated Liquidity',
    description: 'Maximize efficiency by allocating funds to a custom price range, enhancing rewards for liquidity providers.',
    span: 'lg:col-span-2 lg:row-span-1',
    accent: true,
  },
  {
    title: 'Superpools with Dual Rewards',
    description: 'Boost earnings with Superpools, offering dual rewards like PNG and AVAX or partner tokens for liquidity providers.',
    span: '',
  },
  {
    title: 'NFT Liquidity Positions',
    description: 'Unique liquidity positions are tokenized as NFTs, holding range, pair, and fee tier details, fully transferable.',
    span: '',
  },
  {
    title: 'Dynamic Fees',
    description: 'Adaptive fees adjust to market conditions, protecting liquidity providers during volatility and optimizing trader rates.',
    span: '',
  },
  {
    title: 'Multiple Fee Tiers',
    description: 'Select from various fee tiers for liquidity provision, adjustable anytime.',
    span: '',
  },
  {
    title: 'In-Range Farming',
    description: 'Earn higher rewards by maintaining liquidity within target price ranges, incentivizing active position management.',
    span: 'lg:col-span-2',
    accent: true,
  },
];

const Features = () => {
  const headerRef = useReveal<HTMLDivElement>();

  return (
    <section id="features" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div ref={headerRef} className="reveal text-center mb-14 lg:mb-20">
        <p className="section-label mb-4">Product</p>
        <h2 className="display-lg text-3xl sm:text-4xl lg:text-5xl text-white">
          Key Features
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {features.map((f, idx) => (
          <FeatureCard key={f.title} feature={f} index={idx} />
        ))}
      </div>
    </section>
  );
};

function FeatureCard({
  feature: f,
  index,
}: {
  feature: typeof features[0];
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={delayStyle(index % 4)}
      className={`reveal glass-layer bento-card rounded-2xl p-7 lg:p-9 relative overflow-hidden ${f.span} ${f.accent ? 'min-h-[220px]' : 'min-h-[200px]'}`}
    >
      <div
        className={`absolute inset-0 dot-grid-mask pointer-events-none ${f.accent ? 'dot-grid-amber opacity-30' : 'dot-grid opacity-35'}`}
        aria-hidden="true"
      ></div>
      {f.accent && (
        <>
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-400/14 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/25 to-transparent" aria-hidden="true"></div>
        </>
      )}
      <div className="relative flex flex-col h-full text-center items-center">
        <span className="font-mono text-sm text-amber-400/80 mb-6 tracking-[0.06em]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="font-display font-bold text-xl lg:text-2xl text-white mb-3 leading-tight">{f.title}</h3>
        <p className="text-zinc-400 text-base leading-relaxed max-w-md">{f.description}</p>
      </div>
    </div>
  );
}

export default Features;
