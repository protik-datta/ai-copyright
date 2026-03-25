import React from 'react';
import Container from '../common/Container';

const DocsSidebar = () => {
  const sections = [
    { title: "Getting Started", links: ["Introduction", "Quick Start", "Authentication"] },
    { title: "Copywriting API", links: ["Generate Copy", "Tones & Styles", "Multi-language"] },
    { title: "Image AI API", links: ["Text to Image", "Variations", "Upscaling"] },
    { title: "Advanced", links: ["Webhooks", "Rate Limits", "Errors"] },
  ];

  return (
    <Container className="w-full md:w-64 shrink-0 mb-8 md:mb-0 px-0! sm:px-0! lg:px-0!">
      <aside className="md:sticky md:top-28">
        <h3 className="font-semibold text-gray-900 mb-6 text-[18px]">
          On this page
        </h3>
        <div className="space-y-8">
          {sections.map((sec, i) => (
            <div key={i}>
              <h4 className="text-[13px] font-bold text-[#5044E5] uppercase tracking-wider mb-4">
                {sec.title}
              </h4>
              <ul className="space-y-3">
                {sec.links.map((link, j) => (
                  <li key={j}>
                    <button className="text-[15px] font-medium text-gray-600 hover:text-[#5044E5] transition-colors text-left w-full cursor-pointer focus:outline-none">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>
    </Container>
  );
};

export default DocsSidebar;
