import React from "react";
import { Lightbulb, ShieldAlert, Sparkles } from "lucide-react";

const InstructionNote = () => {
  return (
    <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-5 mt-6">
      <div className="flex items-center gap-2 mb-3 text-indigo-700 font-bold text-sm">
        <Lightbulb size={16} />
        <span>How to Get the Best Results?</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Do's */}
        <div className="space-y-2">
          <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">
            What to Include
          </p>
          <ul className="text-[13px] text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <Sparkles size={14} className="text-indigo-400 mt-0.5 shrink-0" />
              <span>Mention the product name and its core features.</span>
            </li>
            <li className="flex items-start gap-2">
              <Sparkles size={14} className="text-indigo-400 mt-0.5 shrink-0" />
              <span>Specify the target audience or any special offers.</span>
            </li>
          </ul>
        </div>

        {/* Don'ts/Alerts */}
        <div className="space-y-2 border-t md:border-t-0 md:border-l border-indigo-100 pt-3 md:pt-0 md:pl-4">
          <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">
            Keep in Mind
          </p>
          <ul className="text-[13px] text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <ShieldAlert
                size={14}
                className="text-amber-500 mt-0.5 shrink-0"
              />
              <span>
                This AI is strictly specialized in Marketing and Copywriting.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldAlert
                size={14}
                className="text-amber-500 mt-0.5 shrink-0"
              />
              <span>
                Non-marketing or inappropriate inputs will trigger an error.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-indigo-100 text-[12px] text-gray-500 italic text-center">
        "Example: Red cotton saree, $10 discount, limited stock!"
      </div>
    </div>
  );
};

export default InstructionNote;
