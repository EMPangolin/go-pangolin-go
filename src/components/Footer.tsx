import React, { useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';

const Footer = () => {
  const footerRef = useReveal<HTMLElement>();

  useEffect(() => {
    const el = document.getElementById('current-year');
    if (el) el.textContent = new Date().getFullYear().toString();
  }, []);

  return (
    <footer ref={footerRef} className="reveal border-t border-white/[0.06] mt-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="glass-layer rounded-2xl p-8 lg:p-12 mb-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <img src="img/logo-dark-9m2OjO-5.svg" alt="Pangolin" className="h-8 mb-6 opacity-90" />
              <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
                Launched by AvaLabs in 2021, Pangolin is a leading DEX on Avalanche. Swap tokens, provide liquidity, and earn rewards with full control of your funds.
              </p>
            </div>

            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-5">Product</h4>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li><a href="#stats" className="hover:text-white transition-colors">Metrics</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#chains" className="hover:text-white transition-colors">Chains</a></li>
                <li><a href="https://app.pangolin.exchange" className="hover:text-amber-400 transition-colors">Launch App</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-5">Resources</h4>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li><a href="https://docs.pangolin.exchange" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="https://docs.pangolin.exchange/developers/apis" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">API</a></li>
                <li><a href="https://defillama.com/protocol/pangolin" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">DefiLlama</a></li>
                <li><a href="https://www.coingecko.com/en/coins/pangolin" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">CoinGecko</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-5">Legal</h4>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li><a href="/terms" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
          <span>© <span id="current-year"></span> Pangolin</span>
          <span className="font-mono text-xs text-zinc-500">Built on Avalanche</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
