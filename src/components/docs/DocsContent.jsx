import React from 'react';
import { ArrowRight, CheckCircle2, Code, KeyRound, Sparkles } from "lucide-react";
import Container from '../common/Container';

const DocsContent = () => {
  return (
    <Container className="flex-1 w-full max-w-4xl !px-0 sm:!px-0 lg:!px-0">
      <div className="prose prose-purple max-w-none">
        
        {/* Title & Introduction */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">Introduction</h2>
        <p className="mb-5 leading-relaxed text-[16px] text-gray-600">
          Welcome to the <strong>QuickAI</strong> developer documentation. 
          QuickAI provides a powerful, world-class suite of AI tools engineered specifically to help you generate high-converting marketing copy, create bespoke media, and scale your content generation effortlessly.
        </p>
        <p className="mb-10 leading-relaxed text-[16px] text-gray-600">
          This guide illustrates everything from authenticating your API keys to executing your first automated copy generation request. Whether you're building a SaaS application or internal tools, our RESTful API ensures blazing fast generation and 99.99% uptime.
        </p>
        
        {/* Quick Start Card */}
        <div className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 border border-purple-100 rounded-[12px] p-6 md:p-8 mb-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-20 hidden sm:block">
            <Sparkles size={64} className="text-[#5044E5]" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Code size={20} className="text-[#5044E5]" /> 
            Quick Start Guide
          </h3>
          <p className="mb-6 text-gray-600 text-[15px] max-w-lg leading-relaxed">
            Ready to jump right in? Complete our 5-minute quickstart tutorial to obtain your API key, make your first REST request, and generate your first piece of AI marketing text.
          </p>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-[#5044E5] text-[14.5px] font-semibold rounded-lg hover:border-[#5044E5] transition-all cursor-pointer shadow-sm group">
            Start the Tutorial
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Authentication Section */}
        <h2 className="text-3xl font-bold text-gray-900 mb-5 mt-10 border-t border-gray-100 pt-10 flex items-center gap-3">
          <KeyRound size={28} className="text-gray-400" />
          Authentication
        </h2>
        <p className="mb-5 leading-relaxed text-[16px] text-gray-600">
          The QuickAI API uses API keys to authenticate requests. You can view and manage your API keys in the QuickAI Dashboard under <strong>Developer Settings</strong>.
        </p>
        <p className="mb-6 leading-relaxed text-[16px] text-gray-600">
          Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.
        </p>
        <p className="mb-6 px-4 py-3 bg-red-50 border-l-4 border-red-400 text-red-800 text-[14px] rounded-r-md">
          <strong>Security Warning:</strong> All API requests must be made over HTTPS. Calls made over plain HTTP will fail. API requests without authentication will also fail.
        </p>

        {/* Code Snippet Box */}
        <div className="bg-[#0f172a] rounded-[10px] overflow-hidden mb-12 shadow-md">
          <div className="px-5 py-3 bg-[#1e293b] text-gray-300 text-[13px] font-mono border-b border-[#334155] flex justify-between items-center">
            <span className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div> Auth Header Format</span>
            <button className="text-gray-400 hover:text-white transition-colors cursor-pointer focus:outline-none">Copy</button>
          </div>
          <pre className="p-6 text-[14px] text-indigo-200 overflow-x-auto leading-relaxed font-mono">
            <code>
{`Authorization: Bearer YOUR_REST_API_KEY`}
            </code>
          </pre>
        </div>

        {/* Using the Copywriting Endpoint */}
        <h2 className="text-3xl font-bold text-gray-900 mb-5 mt-8 border-t border-gray-100 pt-10">
          Generating Copy
        </h2>
        <p className="mb-5 leading-relaxed text-[16px] text-gray-600">
          The core of QuickAI is our generation endpoint. By passing a simple set of instructions or "prompts" along with creative parameters (like <code>tone</code>, <code>audience</code>, and <code>length</code>), our LLMs will stream back highly optimized marketing copy.
        </p>

        <ul className="mb-8 space-y-3">
          <li className="flex items-start gap-3 text-gray-600 text-[15px]">
            <CheckCircle2 size={20} className="text-[#5044E5] shrink-0 mt-0.5" />
            <span><strong>Endpoint:</strong> <code>POST /v1/copy/generate</code></span>
          </li>
          <li className="flex items-start gap-3 text-gray-600 text-[15px]">
            <CheckCircle2 size={20} className="text-[#5044E5] shrink-0 mt-0.5" />
            <span><strong>Rate Limit:</strong> 60 requests per minute (Standard Tier)</span>
          </li>
          <li className="flex items-start gap-3 text-gray-600 text-[15px]">
            <CheckCircle2 size={20} className="text-[#5044E5] shrink-0 mt-0.5" />
            <span><strong>Response Time:</strong> ~1.2s to 3.5s depending on word count</span>
          </li>
        </ul>

        <div className="bg-[#0f172a] rounded-[10px] overflow-hidden mb-8 shadow-md">
          <div className="px-5 py-3 bg-[#1e293b] text-gray-300 text-[13px] font-mono border-b border-[#334155] flex justify-between items-center">
            <span className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div> POST /v1/copy/generate</span>
            <button className="text-gray-400 hover:text-white transition-colors cursor-pointer focus:outline-none">Copy</button>
          </div>
          <pre className="p-6 text-[14px] text-indigo-200 overflow-x-auto leading-relaxed font-mono">
            <code>
{`curl -X POST https://api.quickai.com/v1/copy/generate \\
  -H "Authorization: Bearer QUICKAI_API_SECRET" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Write a punchy Facebook ad for a new line of ergonomic desk chairs.",
    "tone": "enthusiastic",
    "target_platform": "facebook",
    "max_words": 150
  }'`}
            </code>
          </pre>
        </div>

        {/* Footer/Next Steps context block */}
        <div className="mt-14 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
           <p className="text-gray-500 text-sm">Was this page helpful?</p>
           <div className="flex gap-4 text-sm font-medium">
             <button className="text-gray-600 hover:text-[#5044E5]">Yes, thanks!</button>
             <button className="text-gray-600 hover:text-[#5044E5]">Needs improvement</button>
           </div>
        </div>

      </div>
    </Container>
  );
};

export default DocsContent;
