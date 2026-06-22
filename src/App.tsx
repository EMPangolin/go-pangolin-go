import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import Partners from './components/Partners';
import Chains from './components/Chains';
import Community from './components/Community';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <div className="app-shell min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Partners />
        <Chains />
        <Community />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
