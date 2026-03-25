import React from 'react';
import bgImage from '../../assets/gradientBackground.png';
import Container from '../common/Container';

const DocsHero = () => {
  return (
    <div
      className="pt-32 pb-16 relative bg-cover bg-center border-b border-gray-100"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.9)), url(${bgImage})`,
      }}
    >
      <Container>
        <div className="text-center md:text-left py-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight mb-4">
            Documentation Base
          </h1>
          <p className="text-gray-600 text-[16px] sm:text-lg max-w-2xl leading-relaxed">
            Everything you need to integrate and build with QuickAI. Explore our comprehensive guides, API reference, and ready-to-use SDK examples.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default DocsHero;
