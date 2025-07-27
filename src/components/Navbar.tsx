import React, { useEffect } from 'react';

const Navbar = () => {
  useEffect(() => {
    const btn = document.getElementById('mobile-btn');
    const panel = document.getElementById('mobile-panel');
    const closeBtn = document.getElementById('close-panel');
    const links = panel?.querySelectorAll('a');

    if (btn && panel && closeBtn) {
      btn.onclick = () => panel.classList.remove('translate-x-full');
      closeBtn.onclick = () => panel.classList.add('translate-x-full');
      links?.forEach(a => a.addEventListener('click', () => panel.classList.add('translate-x-full')));
    }
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <a href="/" className="flex items-center space-x-3">
          <img src="img/logo-dark-9m2OjO-5.svg" alt="Pangolin Decentralized Exchange Logo" className="h-9 mr-2" />
          <span className="sr-only">Pangolin Home</span>
        </a>
        <div className="hidden md:flex items-center space-x-10 text-lg font-medium">
          <a href="#stats" className="hover:text-white transition" aria-label="View Platform Metrics">Metrics</a>
          <a href="#features" className="hover:text-white transition" aria-label="Explore Key Features">Features</a>
          <a href="#partners" className="hover:text-white transition" aria-label="View Our Partners">Partners</a>
          <a href="#chains" className="hover:text-white transition" aria-label="View Supported Blockchain Networks">Chains</a>
          <a href="#community" className="hover:text-white transition" aria-label="Join Our Community">Community</a>
          <a href="https://docs.pangolin.exchange" target="_blank" rel="noopener noreferrer" className="hover:text-white transition" aria-label="Access Documentation (Opens in new tab)">Documentation</a>
          <a href="https://app.pangolin.exchange" className="ml-4 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold hover:scale-105 transition-transform" aria-label="Launch Pangolin App">Launch App</a>
        </div>
        <button id="mobile-btn" className="md:hidden text-slate-300 text-2xl" aria-label="Open Mobile Menu">
          <i className="fas fa-bars" aria-hidden="true"></i>
        </button>
      </div>
      <div id="mobile-panel" className="md:hidden fixed top-20 right-0 w-full max-w-sm h-screen bg-slate-900/95 backdrop-blur-2xl z-40 shadow-2xl translate-x-full transition-transform duration-300 ease-in-out">
        <button id="close-panel" className="absolute top-6 right-6 text-2xl text-slate-400" aria-label="Close Mobile Menu">
          <i className="fas fa-times" aria-hidden="true"></i>
        </button>
        <div className="flex flex-col items-center space-y-10 pt-24 text-xl">
          <a href="#stats" className="hover:text-white transition">Metrics</a>
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#partners" className="hover:text-white transition">Partners</a>
          <a href="#chains" className="hover:text-white transition">Chains</a>
          <a href="#community" className="hover:text-white transition">Community</a>
          <a href="https://docs.pangolin.exchange" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Documentation</a>
          <a href="https://app.pangolin.exchange" className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold">Launch App</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
