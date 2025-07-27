import React, { useEffect } from 'react';

const Stats = () => {
  useEffect(() => {
    Promise.all([
      fetch('https://api.llama.fi/summary/dexs/pangolin').then(r => r.json()),
      fetch('https://api.llama.fi/protocol/pangolin').then(r => r.json())
    ])
      .then(([summary, protocol]) => {
        const totalVol = summary.totalAllTime || 0;
        const volume24h = summary.total24h || 0;
        const tvlData = protocol?.tvl;
        const tvl = Array.isArray(tvlData) && tvlData.length ? tvlData[tvlData.length - 1].totalLiquidityUSD || 0 : 0;
        document.getElementById('total-volume')!.textContent = '$' + (totalVol / 1e9).toFixed(2) + 'B';
        document.getElementById('daily-volume')!.textContent = '$' + (volume24h / 1e6).toFixed(2) + 'M';
        document.getElementById('tvl')!.textContent = '$' + (tvl / 1e6).toFixed(2) + 'M';
      })
      .catch(console.error);
  }, []);

  return (
    <section id="stats" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-5xl font-bold text-center mb-16">Platform Metrics</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="elevate glow-ring p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 text-center">
          <div id="total-volume" className="text-4xl font-bold text-amber-400">Loading...</div>
          <div className="text-slate-300 mt-1 text-base">Total Trading Volume</div>
        </div>
        <div className="elevate glow-ring p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 text-center">
          <div id="daily-volume" className="text-4xl font-bold text-amber-400">Loading...</div>
          <div className="text-slate-300 mt-1 text-base">24h Trading Volume</div>
        </div>
        <div className="elevate glow-ring p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 text-center">
          <div id="tvl" className="text-4xl font-bold text-amber-400">Loading...</div>
          <div className="text-slate-300 mt-1 text-base">Total Value Locked</div>
        </div>
        <div className="elevate glow-ring p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 text-center">
          <div className="text-4xl font-bold text-amber-400">4</div>
          <div className="text-slate-300 mt-1 text-base">Supported Chains</div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
