import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import DocsHero from '../components/docs/DocsHero';
import DocsSidebar from '../components/docs/DocsSidebar';
import DocsContent from '../components/docs/DocsContent';
import Container from '../components/common/Container';

const Docs = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="grow pt-10">
        <DocsHero />
        <Container>
          <div className="py-16 flex flex-col md:flex-row gap-10 lg:gap-20">
            <DocsSidebar />
            <DocsContent />
          </div>
        </Container>

      </main>
      <Footer />
    </div>
  );
};

export default Docs;
