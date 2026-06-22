import React, { useEffect, useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const Hero = () => {
  const leftRef = useReveal<HTMLDivElement>();
  const rightRef = useReveal<HTMLDivElement>(0.08);
  const [swapAmount, setSwapAmount] = useState('1.00');
  const [hasEdited, setHasEdited] = useState(false);
  const [reversed, setReversed] = useState(false);
  // Direct PNG/AVAX exchange rate (PNG denominated in AVAX) — the price of 1 PNG in AVAX.
  // Sourced as a single ratio from CoinGecko (vs_currencies=avax) instead of dividing two
  // independent USD spot prices, which drift apart by rounding and de-sync from real swaps.
  const [pngInAvax, setPngInAvax] = useState<number | null>(null);
  const [market, setMarket] = useState<{
    price: number;
    change: number;
    mktcap: number;
    volume: number;
  } | null>(null);

  useEffect(() => {
    // Single request: PNG + AVAX USD prices with PNG market metadata.
    // CoinGecko's `vs_currencies` only accepts a fixed allow-list of quote
    // currencies (usd, btc, eth, ...). AVAX is not supported as a quote, so
    // we derive 1 PNG-in-AVAX as png.usd / avax.usd — both are reliable spot
    // feeds. This is the math real swap UIs ultimately do anyway.
    fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=pangolin,avalanche-2&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true',
    )
      .then((r) => r.json())
      .then((data) => {
        const png = data?.pangolin;
        const avax = data?.['avalanche-2'];
        if (png?.usd) {
          setMarket({
            price: png.usd,
            change: png.usd_24h_change ?? 0,
            mktcap: png.usd_market_cap ?? 0,
            volume: png.usd_24h_vol ?? 0,
          });
        }
        if (png?.usd && avax?.usd) setPngInAvax(png.usd / avax.usd);
      })
      .catch(console.error);
  }, []);

  const amount = parseFloat(swapAmount || '0') || 0;
  // PNG/AVAX math uses the direct ratio when available so it matches what real swap UIs show.
  // 1 PNG = pngInAvax AVAX, therefore 1 AVAX = 1 / pngInAvax PNG.
  const estimatedOut =
    pngInAvax && amount > 0
      ? reversed
        ? (amount * pngInAvax).toFixed(6) // PNG → AVAX
        : (amount / pngInAvax).toFixed(2) // AVAX → PNG
      : '—';

  const rateLabel = pngInAvax
    ? reversed
      ? `1 PNG ≈ ${pngInAvax.toFixed(6)} AVAX`
      : `1 AVAX ≈ ${(1 / pngInAvax).toFixed(2)} PNG`
    : 'Fetching live rate…';

  const fromToken = reversed
    ? { symbol: 'PNG', icon: 'img/coin-png.png' }
    : { symbol: 'AVAX', icon: 'img/avax.png' };
  const toToken = reversed
    ? { symbol: 'AVAX', icon: 'img/avax.png' }
    : { symbol: 'PNG', icon: 'img/coin-png.png' };

  const handleSwapDirection = () => {
    setReversed((r) => !r);
    setSwapAmount((curr) => {
      if (!pngInAvax) return curr;
      const n = parseFloat(curr || '0') || 0;
      if (n === 0) return curr;
      // Convert the visible amount into the new "from" token using the direct ratio.
      // Currently AVAX→PNG (reversed=false): new input becomes the PNG estimate.
      // Currently PNG→AVAX (reversed=true): new input becomes the AVAX estimate.
      const flipped = reversed ? n * pngInAvax : n / pngInAvax;
      return flipped.toFixed(reversed ? 6 : 2);
    });
  };

  const formatUsd = (n: number, div: number, suffix = '') =>
    '$' + (n / div).toFixed(div >= 1e9 ? 2 : div >= 1e6 ? 1 : 4) + suffix;

  const swapUrl = 'https://app.pangolin.exchange/swap';
  // Coin field is positioned across the FULL viewport (the .coin-field wrapper breaks
  // out of the section's max-w-6xl). Layout zones used here:
  //   * Top band (top: 12–18%) — sits just under the fixed nav (~72px),
  //     above the content grid which begins at section pt-40 (~160px).
  //   * Side rails (top: 38–62%, left: 1–5% or 95–99%) — only the outer
  //     viewport margins on wide screens, never overlapping the text column
  //     or the swap widget.
  //   * Bottom band (top: 86–93%) — sits in section pb-32 below the content.
  // `mobileId` flags the two coins (PNG + AVAX) that we keep visible on mobile.
  // The CSS in index.html applies mobile-specific positions to those two so they
  // sit in the top corners (above the headline, clear of all interactive content).
  // Every other coin gets data-hide-mobile="true" and is hidden below 1024px.
  const coins: Array<{
    src: string;
    alt: string;
    style: React.CSSProperties;
    hideMobile?: boolean;
    mobileId?: 'png' | 'avax';
  }> = [
    // ── Top band: 5 coins spread evenly across full viewport, below nav, above content ──
    {
      src: 'img/coin-png.png',
      alt: 'PNG',
      style: { top: '13%', left: '3%', width: 54, height: 54, '--coin-blur': '1.5px', '--coin-opacity': '0.72', '--coin-dur': '15s', '--coin-delay': '0s' } as React.CSSProperties,
      mobileId: 'png',
    },
    {
      src: 'https://assets.coingecko.com/coins/images/6319/standard/USDC.png?1769615602',
      alt: 'USDC',
      style: { top: '17%', left: '22%', width: 42, height: 42, '--coin-blur': '2.2px', '--coin-opacity': '0.6', '--coin-dur': '19s', '--coin-delay': '-7s' } as React.CSSProperties,
      hideMobile: true,
    },
    {
      src: 'img/avax.png',
      alt: 'AVAX',
      style: { top: '12%', left: '46%', width: 48, height: 48, '--coin-blur': '1.8px', '--coin-opacity': '0.68', '--coin-dur': '17s', '--coin-delay': '-2s' } as React.CSSProperties,
      mobileId: 'avax',
    },
    {
      src: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
      alt: 'ETH',
      style: { top: '16%', left: '70%', width: 44, height: 44, '--coin-blur': '2px', '--coin-opacity': '0.58', '--coin-dur': '18s', '--coin-delay': '-3s' } as React.CSSProperties,
      hideMobile: true,
    },
    {
      src: 'https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661',
      alt: 'USDT',
      style: { top: '14%', left: '93%', width: 48, height: 48, '--coin-blur': '2px', '--coin-opacity': '0.65', '--coin-dur': '14s', '--coin-delay': '-5s' } as React.CSSProperties,
      hideMobile: true,
    },

    // ── Side rails: only on wide viewports, outside the centered content column ──
    {
      src: 'https://assets.coingecko.com/coins/images/53789/standard/edfw.jpg?1737381234',
      alt: 'Token',
      style: { top: '42%', left: '2%', width: 42, height: 42, '--coin-blur': '2.6px', '--coin-opacity': '0.5', '--coin-dur': '18s', '--coin-delay': '-6s' } as React.CSSProperties,
      hideMobile: true,
    },
    {
      src: 'https://assets.coingecko.com/coins/images/16362/standard/GergDDN3_400x400.jpg?1696515961',
      alt: 'Token',
      style: { top: '58%', left: '96%', width: 40, height: 40, '--coin-blur': '2.8px', '--coin-opacity': '0.48', '--coin-dur': '16s', '--coin-delay': '-2s' } as React.CSSProperties,
      hideMobile: true,
    },

  ];

  return (
    <section className="relative pt-28 pb-24 lg:pt-40 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="coin-field" aria-hidden="true">
        {coins.map((c, i) => (
          <a
            key={i}
            href={swapUrl}
            className="coin-float"
            style={c.style}
            data-hide-mobile={c.hideMobile ? 'true' : 'false'}
            data-mobile-coin={c.mobileId || undefined}
            aria-label="Launch Pangolin swap"
          >
            <img src={c.src} alt="" loading="lazy" referrerPolicy="no-referrer" />
          </a>
        ))}
      </div>

      <div className="relative z-10 grid lg:grid-cols-[1.08fr_0.92fr] gap-14 lg:gap-20 items-center">
        <div ref={leftRef} className="reveal">
          <div className="flex flex-wrap items-center gap-2.5 mb-10">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-layer text-xs text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              Latest update: Pangolin V3 is live on Avalanche!
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono uppercase tracking-[0.08em] text-[#ff6b6c] border border-[#e84142]/35 bg-[#e84142]/[0.07]">
              Biggest DAO on
              <span className="text-[11px] leading-none" aria-hidden="true">🔺</span>
            </div>
          </div>

          <h1 className="display-xl text-[clamp(2.5rem,6vw,4.25rem)] text-white max-w-[14ch]">
            <span className="multichain block">Pangolin</span>
            <span className="block">Liquidity Hub</span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-zinc-400 max-w-lg leading-relaxed">
            Launched by AvaLabs in 2021, Pangolin is a leading DEX on Avalanche. Swap tokens, provide liquidity, and earn rewards with full control of your funds.
          </p>

          <div className="mt-11 flex flex-wrap gap-3">
            <a href="https://app.pangolin.exchange" className="px-8 py-4 rounded-full btn-primary text-sm sm:text-base" aria-label="Launch Pangolin app">
              Launch App
            </a>
            <a href="https://app.pangolin.exchange/pool" className="px-8 py-4 rounded-full btn-ghost text-sm sm:text-base" aria-label="Explore Super Pools">
              Super Pools
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-5 text-sm">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-amber-400/90 block mb-1.5">Networks</span>
              <span className="text-zinc-200 text-base"><span className="text-[#ff6b6c] font-medium">AVAX</span> · HBAR · FLR · SGB</span>
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-amber-400/90 block mb-1.5">Since</span>
              <span className="text-zinc-200 text-base">2021 · AvaLabs launch</span>
            </div>
          </div>
        </div>

        <div ref={rightRef} className="reveal relative" style={{ transitionDelay: '160ms' }}>
          <div className="absolute -inset-6 bg-gradient-to-br from-amber-400/25 via-amber-500/5 to-transparent rounded-[2.5rem] blur-3xl pointer-events-none animate-pulse-glow" aria-hidden="true"></div>

          <div className="relative glass-layer rounded-[1.75rem] p-1.5 animate-float">
            <div className="rounded-[1.5rem] bg-[#06080c]/95 p-5 sm:p-7">
              <div className="flex items-center justify-between mb-6 pb-5 border-b border-white/[0.06]">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/5 border border-amber-400/20 flex items-center justify-center overflow-hidden">
                    <img src="img/coin-png.png" alt="" className="w-8 h-8 object-contain" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-white text-lg">PNG</p>
                    <p className="text-xs text-zinc-500 font-mono">Pangolin Token</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                  Live
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: 'Price', value: market ? formatUsd(market.price, 1) : '—' },
                  {
                    label: '24h Change',
                    value: market ? (market.change >= 0 ? '+' : '') + market.change.toFixed(2) + '%' : '—',
                    tone: market ? (market.change > 0 ? 'text-emerald-400' : market.change < 0 ? 'text-rose-400' : 'text-zinc-500') : 'text-white',
                  },
                  { label: 'Market Cap', value: market ? formatUsd(market.mktcap, 1e6, 'M') : '—' },
                  { label: '24h Volume', value: market ? formatUsd(market.volume, 1e6, 'M') : '—' },
                ].map(({ label, value, tone }) => (
                  <div key={label} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 transition-colors hover:border-white/[0.12]">
                    <p className="text-xs uppercase tracking-[0.06em] text-zinc-400 mb-2 font-mono font-medium">{label}</p>
                    <p className={`stat-num text-xl font-semibold ${tone || 'text-white'}`} aria-live="polite">{value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5 mb-5">
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-4 font-medium">
                  <span className="font-mono uppercase tracking-[0.08em]">Quick swap</span>
                  <span className="font-mono text-zinc-500" aria-live="polite">{rateLabel}</span>
                </div>
                <div className="space-y-2">
                  <label className="swap-input flex items-center justify-between rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-3.5 transition-all cursor-text">
                    <span className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center overflow-hidden">
                        <img src={fromToken.icon} alt="" className="w-5 h-5 object-contain" />
                      </span>
                      <span className="text-sm font-medium text-zinc-200">{fromToken.symbol}</span>
                    </span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={swapAmount}
                      onFocus={(e) => {
                        if (!hasEdited) {
                          setSwapAmount('');
                          setHasEdited(true);
                          requestAnimationFrame(() => e.target.select());
                        } else {
                          e.target.select();
                        }
                      }}
                      onChange={(e) => {
                        setHasEdited(true);
                        const cleaned = e.target.value.replace(/[^\d.]/g, '');
                        const parts = cleaned.split('.');
                        const safe = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : cleaned;
                        setSwapAmount(safe);
                      }}
                      placeholder="0.00"
                      className="stat-num text-right text-sm text-white bg-transparent outline-none w-24 placeholder:text-zinc-600"
                      aria-label={`${fromToken.symbol} amount`}
                    />
                  </label>
                  <div className="flex justify-center -my-1 relative z-10">
                    <button
                      type="button"
                      onClick={handleSwapDirection}
                      className="swap-flip w-9 h-9 rounded-xl bg-[#0e1118] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-400/30 transition-all"
                      aria-label="Swap direction"
                    >
                      <i className="fas fa-arrow-down text-xs swap-flip-icon" aria-hidden="true"></i>
                    </button>
                  </div>
                  <div className="swap-input flex items-center justify-between rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-3.5">
                    <span className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center overflow-hidden">
                        <img src={toToken.icon} alt="" className="w-5 h-5 object-contain" />
                      </span>
                      <span className="text-sm font-medium text-zinc-200">{toToken.symbol}</span>
                    </span>
                    <span className="stat-num text-sm text-white">{estimatedOut}</span>
                  </div>
                </div>
              </div>

              <a href="https://app.pangolin.exchange/swap" className="block w-full text-center rounded-xl btn-primary py-4 text-sm font-semibold tracking-wide" aria-label={`Swap ${fromToken.symbol} to ${toToken.symbol}`}>
                Swap {fromToken.symbol} → {toToken.symbol}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
