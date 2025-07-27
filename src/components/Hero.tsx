import React, { useEffect } from 'react';

const Hero = () => {
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/pangolin?localization=false&tickers=false&market_data=true')
      .then((res) => res.json())
      .then((data) => {
        const m = data.market_data;
        const change = m.price_change_percentage_24h;
        const changeEl = document.getElementById('change');
        const priceEl = document.getElementById('price');
        const mktcapEl = document.getElementById('mktcap');
        const volumeEl = document.getElementById('volume');

        if (changeEl) {
          changeEl.textContent = (change >= 0 ? '+' : '') + change.toFixed(2) + '%';
          changeEl.className = 'text-3xl font-bold ' + (change > 0 ? 'text-green-400' : change < 0 ? 'text-red-400' : 'text-slate-400');
        }

        if (priceEl) priceEl.textContent = '$' + m.current_price.usd.toFixed(4);
        if (mktcapEl) mktcapEl.textContent = '$' + (m.market_cap.usd / 1e6).toFixed(1) + 'M';
        if (volumeEl) volumeEl.textContent = '$' + (m.total_volume.usd / 1e6).toFixed(1) + 'M';
      })
      .catch(console.error);
  }, []);

  return (
    <section className="pt-36 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
      <div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
          <span className="multichain font-extrabold">Pangolin</span><br />
          <span className="text-white">Liquidity Hub</span>
        </h1>
        <p className="mt-8 text-xl text-slate-400 max-w-xl">
          Launched by AvaLabs in 2021, Pangolin is a leading multichain DEX and the largest DAO on Avalanche. Swap tokens, provide liquidity, and earn rewards across AVAX, Hedera, Flare, and SGB with full control of your funds.
        </p>
        <div className="mt-10 flex flex-wrap gap-6">
          <a href="https://app.pangolin.exchange" className="elevate px-10 py-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold text-lg shadow-xl" aria-label="Launch Pangolin App">
            Launch App
          </a>
          <a href="https://app.pangolin.exchange/pool" className="elevate px-10 py-4 rounded-full bg-slate-800 text-white text-lg hover:bg-slate-700" aria-label="Explore Super Pools">
            Super Pools
          </a>
        </div>
        <p className="mt-5 text-sm text-slate-400">
          <i className="fas fa-bolt mr-1" aria-hidden="true"></i>
          Latest update: <a href="https://x.com/pangolindex/status/1947364720140275797" target="_blank" rel="noopener noreferrer" className="underline">
            Pangolin V3 is live on Avalanche!
          </a>
        </p>
      </div>

      <div className="elevate p-10 bg-slate-800/40 border border-slate-700/50 rounded-2xl backdrop-blur-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-2xl">
              <img src="img/coin-png.png" alt="PNG Token Logo" />
            </div>
            <h2 className="font-bold text-3xl">PNG Token</h2>
          </div>
          <span className="text-sm bg-green-500/20 text-green-400 px-3 py-1 rounded-full">Live</span>
        </div>

        <div className="grid grid-cols-2 gap-6 text-center">
          <div>
            <p className="text-slate-400">Price</p>
            <p id="price" className="text-3xl font-bold" aria-live="polite">-</p>
          </div>
          <div>
            <p className="text-slate-400">24h Change</p>
            <p id="change" className="text-3xl font-bold" aria-live="polite">-</p>
          </div>
          <div>
            <p className="text-slate-400">Market Cap</p>
            <p id="mktcap" className="text-3xl font-bold" aria-live="polite">-</p>
          </div>
          <div>
            <p className="text-slate-400">24h Volume</p>
            <p id="volume" className="text-3xl font-bold" aria-live="polite">-</p>
          </div>
        </div>

        <a href="https://app.pangolin.exchange/swap" className="mt-8 w-full block text-center rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold py-4 text-lg elevate" aria-label="Buy PNG Token">
          Buy PNG
        </a>
      </div>
    </section>
  );
};

export default Hero;
