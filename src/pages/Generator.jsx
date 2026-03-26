import React, { useEffect, useRef } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Container from '../components/common/Container';
import GeneratorHero from '../components/generator/GeneratorHero';
import GeneratorForm from '../components/generator/GeneratorForm';
import GeneratorOutput from '../components/generator/GeneratorOutput';
import useGemini from '../hooks/useGemini';
import { Toaster } from '../../utils/Toaster';

const Generator = () => {
  const { result, loading, error, generate } = useGemini();
  const toast = Toaster();

  // Create references to track previous states so we don't spam toasts
  const prevLoading = useRef(loading);
  const prevError = useRef(error);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (error && error !== prevError.current) {
      toast({ message: error, type: "error" });
    }

    if (prevLoading.current === true && loading === false && result && !error) {
       toast({ message: "Content generated successfully!", type: "success" });
    }

    prevLoading.current = loading;
    prevError.current = error;
  }, [result, loading, error, toast]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="grow pt-10">
        <GeneratorHero />

        <Container>
          <div className="py-12 md:py-16 flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
            {/* Left side: Settings & Prompt Form */}
            <div className="w-full lg:w-5/12 xl:w-1/3 flex">
              <GeneratorForm loading={loading} generate={generate} />
            </div>

            {/* Right side: AI Generated Output */}
            <div className="w-full lg:w-7/12 xl:w-2/3 flex">
              <GeneratorOutput result={result} error={error} loading={loading} />
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default Generator;
