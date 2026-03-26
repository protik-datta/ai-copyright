import React, { useState } from 'react';
import { Sparkles } from "lucide-react";
import Container from '../common/Container';

const GeneratorForm = ({ loading, generate }) => {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Professional");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const finalPrompt = `
    You are an expert AI Marketing Copywriter specializing in the Bangladesh and global market. Your task is to generate high-conversion marketing copy based on the user's input.

STRICT OPERATIONAL RULES:
1. LANGUAGE ADAPTABILITY: You MUST respond in the same language the user uses. If the input is in Bangla, respond in Bangla. If it's in English, respond in English. If it's in Banglish, respond in Banglish/Standard Bangla.
2. DYNAMIC LENGTH: Analyze the user's input depth.
   - If the input is brief (e.g., just a product name), provide a punchy, short copy.
   - If the input is detailed (e.g., features, target audience), provide a comprehensive, detailed copy with multiple sections.
3. OUTPUT FORMAT: You must ALWAYS respond in valid JSON format. No plain text outside JSON.
   - Format for valid requests: {"error": false, "result": "Your copy here", "detected_language": "language_name"}
   - Format for invalid/unsafe requests: {"error": true, "message": "I can only help with marketing copy. Please provide a valid product or service."}
4. CONTENT RESTRICTIONS: Only write marketing/advertising copy. Reject anything violent, sexual, political, hateful, or non-marketing related.
5. STRUCTURE: Every valid result must include:
   - A scroll-stopping Headline.
   - A persuasive Body (length depends on input detail).
   - A clear, powerful Call-to-Action (CTA).

USER CONTEXT:
Topic: ${prompt.trim()}
Tone: ${tone}

INSTRUCTIONS FOR THIS SPECIFIC TASK:
- Identify the language and intent of the 'Topic'.
- Match the ${tone} perfectly.
- If the user provided specific features, integrate them naturally.
- Ensure the copy is ready to be used as a Facebook/Instagram ad or product description.

JSON OUTPUT:`.trim();

    generate(finalPrompt, prompt.trim());
  };

  return (
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.05)] border border-gray-100 flex-1 flex flex-col">
      <h2 className="text-[20px] font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Sparkles size={20} className="text-[#5044E5]" />
        Generator Settings
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 grow">

        <div className="flex flex-col gap-2">
          <label className="text-[14.5px] font-semibold text-gray-800">What is this post about?</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
            placeholder="e.g. A new pair of ergonomic running shoes dropping next week... (Be as specific as possible)"
            className="w-full h-40 px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#5044E5] focus:ring-1 focus:ring-[#5044E5] outline-none text-[15px] resize-none disabled:bg-gray-50 disabled:text-gray-400 transition-all"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[14.5px] font-semibold text-gray-800">Tone of Voice</label>
          <div className="relative">
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#5044E5] focus:ring-1 focus:ring-[#5044E5] outline-none text-[15px] bg-white disabled:bg-gray-50 disabled:text-gray-400 transition-all cursor-pointer appearance-none"
            >
              <option value="Professional">Professional</option>
              <option value="Enthusiastic">Enthusiastic</option>
              <option value="Informative">Informative</option>
              <option value="Persuasive">Persuasive</option>
              <option value="Humorous">Humorous</option>
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6">
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="w-full py-3.5 bg-[#5044E5] text-white text-[15.5px] font-semibold rounded-xl hover:bg-[#4338ca] hover:shadow-[0_8px_20px_rgba(80,68,229,0.25)] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Generating Magic...
              </>
            ) : (
              <>
                 Generate Copy <Sparkles size={16} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeneratorForm;
