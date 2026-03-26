import React from 'react';
import bgImage from '../../assets/gradientBackground.png';
import Container from '../common/Container';

const GeneratorHero = () => {
  return (
    <div
      className="pt-32 pb-14 relative bg-cover bg-center border-b border-gray-100"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.9)), url(${bgImage})`,
      }}
    >
      <Container>
        <div className="text-center md:text-left py-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight mb-4">
            AI Content <span className="text-[#5044E5]">Generator</span>
          </h1>
          <p className="text-gray-600 text-[16px] sm:text-lg max-w-2xl leading-relaxed">
            Eliminate writer's block. Select a prompt, outline your goal, and let QuickAI instantly draft highly optimized copy tailored to your exact needs.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default GeneratorHero;
