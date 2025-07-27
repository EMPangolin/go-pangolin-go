import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import Partners from './components/Partners';
import Chains from './components/Chains';
import Community from './components/Community';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Partners />
      <Chains />
      <Community />
      <Footer />
    </div>
  );
}

export default App;
