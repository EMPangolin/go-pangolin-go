import React from 'react';

const features = [
  {
    title: 'Concentrated Liquidity',
    icon: 'fas fa-tachometer-alt',
    description: 'Maximize efficiency by allocating funds to a custom price range, enhancing rewards for liquidity providers.'
  },
  {
    title: 'Superpools with Dual Rewards',
    icon: 'fas fa-chart-line',
    description: 'Boost earnings with Superpools, offering dual rewards like PNG and AVAX or partner tokens for liquidity providers.'
  },
  {
    title: 'NFT Liquidity Positions',
    icon: 'fas fa-chart-line',
    description: 'Unique liquidity positions are tokenized as NFTs, holding range, pair, and fee tier details, fully transferable.'
  },
  {
    title: 'Dynamic Fees',
    icon: 'fas fa-shield-alt',
    description: 'Adaptive fees adjust to market conditions, protecting liquidity providers during volatility and optimizing trader rates.'
  },
  {
    title: 'Multiple Fee Tiers',
    icon: 'fas fa-chart-line',
    description: 'Select from various fee tiers for liquidity provision, adjustable anytime.'
  },
  {
    title: 'In-Range Farming',
    icon: 'fas fa-chart-line',
    description: 'Earn higher rewards by maintaining liquidity within target price ranges, incentivizing active position management.'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-5xl font-bold text-center mb-16">Key Features</h2>
      <div className="grid md:grid-cols-3 gap-10">
        {features.map((f, idx) => (
          <div key={idx} className="elevate glow-ring p-10 bg-slate-800/50 rounded-3xl border border-slate-700/50 text-center">
            <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
              <i className={`${f.icon} text-4xl text-amber-400`} aria-hidden="true"></i>
            </div>
            <h3 className="text-3xl font-bold mb-3">{f.title}</h3>
            <p className="text-slate-400 text-lg">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
