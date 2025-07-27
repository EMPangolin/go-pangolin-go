import React, { useEffect } from 'react';

const Footer = () => {
  useEffect(() => {
    const el = document.getElementById('current-year');
    if (el) el.textContent = new Date().getFullYear().toString();
  }, []);

  return (
    <footer className="border-t border-slate-800 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img src="img/logo-dark-9m2OjO-5.svg" alt="Pangolin Logo" className="h-9 mr-2" />
              <span className="sr-only">Pangolin DAO</span>
            </div>
            <p className="text-slate-400 text-lg">
              The leading multichain DEX and largest DAO on Avalanche, empowering secure trading and liquidity provision since 2021.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-6">Quick Links</h4>
            <ul className="space-y-3 text-lg text-slate-400">
              <li><a href="#stats">Metrics</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#partners">Partners</a></li>
              <li><a href="#chains">Chains</a></li>
              <li><a href="#community">Community</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-6">Resources</h4>
            <ul className="space-y-3 text-lg text-slate-400">
              <li><a href="https://docs.pangolin.exchange" target="_blank">Documentation</a></li>
              <li><a href="https://docs.pangolin.exchange/developers/apis" target="_blank">API</a></li>
              <li><a href="https://defillama.com/protocol/pangolin" target="_blank">DefiLlama</a></li>
              <li><a href="https://coinmarketcap.com/currencies/pangolin/" target="_blank">CoinMarketCap</a></li>
              <li><a href="https://www.coingecko.com/en/coins/pangolin" target="_blank">CoinGecko</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-6">Legal</h4>
            <ul className="space-y-3 text-lg text-slate-400">
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-lg text-slate-500">
          © <span id="current-year"></span> Pangolin DAO – All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
