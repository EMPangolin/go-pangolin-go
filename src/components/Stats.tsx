import React, { useEffect, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useCountUp } from '../hooks/useCountUp';

const statItems = [
  { id: 'total-volume', label: 'Total Trading Volume', div: 1e9, suffix: 'B' },
  { id: 'daily-volume', label: '24h Trading Volume', div: 1e6, suffix: 'M' },
  { id: 'volume-30d', label: '30d Trading Volume', div: 1e6, suffix: 'M' },
  { id: 'tvl', label: 'Total Value Locked', div: 1e6, suffix: 'M' },
];

const delayStyle = (i: number): React.CSSProperties => ({
  transitionDelay: `${Math.min(i * 80, 320)}ms`,
});

function StatCard({
  label,
  value,
  div,
  suffix,
  delay,
}: {
  label: string;
  value: number | null;
  div: number;
  suffix: string;
  delay: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  const animated = useCountUp(value, 1400);
  const display =
    animated !== null ? '$' + (animated / div).toFixed(2) + suffix : '—';

  return (
    <div
      ref={ref}
      style={delayStyle(delay)}
      className="reveal glass-layer bento-card rounded-2xl p-6 lg:p-8 group relative overflow-hidden"
    >
      <div className="absolute inset-0 dot-grid dot-grid-mask opacity-40 pointer-events-none" aria-hidden="true"></div>
      <div className="relative">
        <p className="label-stat mb-5">{label}</p>
        <p className="stat-num text-3xl lg:text-[2.5rem] font-semibold text-amber-400 group-hover:text-amber-300 transition-colors leading-none" aria-live="polite">
          {display}
        </p>
        <div className="mt-5 h-px w-full bg-gradient-to-r from-amber-400/30 via-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  );
}

const Stats = () => {
  const headerRef = useReveal<HTMLDivElement>();
  const [values, setValues] = useState<Record<string, number | null>>({
    'total-volume': null,
    'daily-volume': null,
    'volume-30d': null,
    tvl: null,
  });

  useEffect(() => {
    Promise.all([
      fetch('https://api.llama.fi/summary/dexs/pangolin').then(r => r.json()),
      fetch('https://api.llama.fi/protocol/pangolin').then(r => r.json())
    ])
      .then(([summary, protocol]) => {
        const tvlData = protocol?.tvl;
        const tvl = Array.isArray(tvlData) && tvlData.length
          ? tvlData[tvlData.length - 1].totalLiquidityUSD || 0
          : 0;

        setValues({
          'total-volume': summary.totalAllTime || 0,
          'daily-volume': summary.total24h || 0,
          'volume-30d': summary.total30d || 0,
          tvl,
        });
      })
      .catch(console.error);
  }, []);

  return (
    <section id="stats" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div ref={headerRef} className="reveal text-center mb-14 lg:mb-20">
        <p className="section-label mb-4">Metrics</p>
        <h2 className="display-lg text-3xl sm:text-4xl lg:text-5xl text-white">Platform Metrics</h2>
        <p className="mt-5 text-zinc-400 max-w-md mx-auto text-base">Real time platform data.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {statItems.map((item, i) => (
          <StatCard
            key={item.id}
            label={item.label}
            value={values[item.id]}
            div={item.div}
            suffix={item.suffix}
            delay={Math.min(i + 1, 4)}
          />
        ))}
      </div>
    </section>
  );
};

export default Stats;
