import React, { useState } from "react";
import { Copy, FileText } from "lucide-react";
import { Toaster } from "../../../utils/Toaster";

const GeneratorOutput = ({ result, error, loading }) => {
  const toast = Toaster();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard
      .writeText(result)
      .then(
        () =>
          toast({ message: "Content copied to clipboard!", type: "success" }),
        setCopied(true),
        setTimeout(() => {
          setCopied(false);
        }, 3000),
      )
      .catch(() => toast({ message: "Failed to copy content", type: "error" }));
  };

  return (
    <div className="bg-[#f8f9fc] rounded-2xl p-6 sm:p-8 border border-gray-100 flex-1 flex flex-col relative min-h-125">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[20px] font-bold text-gray-900 flex items-center gap-2">
          <FileText size={20} className="text-[#5044E5]" />
          Generated Output
        </h2>
        <button
          onClick={handleCopy}
          disabled={!result || loading}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-[13.5px] font-semibold rounded-lg hover:border-[#5044E5] hover:text-[#5044E5] transition-all cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-700"
        >
          <Copy size={16} /> {copied ? "Copied" : "Copy Text"}
        </button>
      </div>

      <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6 overflow-y-auto relative shadow-[inset_0_2px_10px_rgba(0,0,0,0.01)]">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-5 text-gray-400 bg-white/70 backdrop-blur-[1px] z-10 w-full h-full rounded-xl">
            <div className="w-10 h-10 border-4 border-indigo-100 border-t-[#5044E5] rounded-full animate-spin"></div>
            <p className="text-[14px] font-medium text-gray-500 animate-pulse">
              Crafting brilliant copy...
            </p>
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center text-red-500 text-[14.5px] font-medium bg-red-50/50 rounded-lg border border-red-100/50 p-6 text-center">
            <div className="max-w-xs">{error}</div>
          </div>
        ) : result ? (
          <div className="prose prose-purple max-w-none text-[15.5px] leading-[1.7] text-gray-800 whitespace-pre-wrap">
            {result}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 gap-4">
            <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mb-1 ring-8 ring-white shadow-sm">
              <FileText size={32} className="text-[#5044E5]/40" />
            </div>
            <p className="text-[14.5px] font-medium max-w-55 leading-relaxed text-gray-400">
              Your generated content will elegantly appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratorOutput;
