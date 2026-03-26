import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Container from "../components/common/Container";
import { Toaster } from "../../utils/Toaster";
import { Clock, Search, Trash2, FileText, Copy } from "lucide-react";
import { Link } from "react-router-dom";

const History = () => {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [copiedID, setCopiedID] = useState(null);
  const toast = Toaster();

  // local storage
  useEffect(() => {
    window.scrollTo(0, 0);
    const stored = JSON.parse(localStorage.getItem("copyai_history") || "[]");
    setHistory(stored);
  }, []);

  // search filter
  const filtered = history.filter((item) => {
    const promptText = item.prompt ? item.prompt.toLowerCase() : "";
    const resultText = item.result ? item.result.toLowerCase() : "";
    const searchTerm = search.toLowerCase();

    return promptText.includes(searchTerm) || resultText.includes(searchTerm);
  });

  // single item delete
  const handleDelete = (id) => {
    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
    localStorage.setItem("copyai_history", JSON.stringify(updated));
    toast({ message: "Item deleted.", type: "info" });
  };

  // clear all
  const clearAll = () => {
    setHistory([]);
    localStorage.removeItem("copyai_history");
    toast({ message: "History cleared.", type: "info" });
  };

  // copy result
  const handleCopy = (item) => {
    navigator.clipboard
      .writeText(item.result)
      .then(() => {
        toast({ message: "Copied to clipboard!", type: "success" });
        setCopiedID(item.id);
        setTimeout(() => setCopiedID(null), 3000);
      })
      .catch(() => toast({ message: "Failed to copy.", type: "error" }));
  };

  // format date
  const formatDate = (time) => {
    const date = new Date(time);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="grow pt-10">
        {/* Hero */}
        <div className="pt-32 pb-14 border-b border-gray-100 bg-[#fafafa]">
          <Container>
            <div className="text-center md:text-left py-4">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight mb-4">
                Your <span className="text-[#5044E5]">History</span>
              </h1>
              <p className="text-gray-600 text-[16px] sm:text-lg max-w-2xl leading-relaxed">
                All your previously generated content in one place. Copy,
                review, or delete anytime.
              </p>
            </div>
          </Container>
        </div>

        <Container>
          <div className="py-12 md:py-16">
            {/* Toolbar — search + count + clear all */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between mb-8">
              <div className="relative flex-1 max-w-full sm:max-w-sm">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search history..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5044E5] focus:ring-1 focus:ring-[#5044E5] outline-none text-[14px] text-gray-700 bg-white transition-all"
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[13px] text-gray-400 font-medium">
                  {filtered.length} {filtered.length === 1 ? "item" : "items"}
                </span>
                {history.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-red-200 text-red-500 text-[13.5px] font-semibold hover:bg-red-50 transition-all"
                  >
                    <Trash2 size={14} />
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Empty state */}
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
                <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center ring-8 ring-white shadow-sm">
                  <Clock size={32} className="text-[#5044E5]/40" />
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-gray-700 mb-1">
                    No history yet
                  </p>
                  <p className="text-[14px] text-gray-400 max-w-xs leading-relaxed">
                    Your generated content will appear here after you use the
                    generator.
                  </p>
                </div>
                <Link
                  to="/generator"
                  className="mt-2 px-6 py-3 bg-[#5044E5] text-white text-[14px] font-semibold rounded-xl hover:bg-[#4338ca] transition-all"
                >
                  Go to Generator
                </Link>
              </div>
            ) : filtered.length === 0 ? (
              /* No search results */
              <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                <Search size={32} className="text-gray-300" />
                <p className="text-[15px] font-medium text-gray-500">
                  No results for "{search}"
                </p>
              </div>
            ) : (
              /* History Cards */
              <div className="flex flex-col gap-5">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    className="group p-5 sm:p-6 rounded-2xl bg-[rgba(253,253,254,0.60)] backdrop-blur-md border border-gray-100 shadow-[0_4px_30px_0_rgba(0,0,0,0.06)] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                          <FileText size={15} className="text-[#5044E5]" />
                        </div>
                        <p className="text-[13px] text-gray-400 font-medium truncate">
                          {formatDate(item.id)}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleCopy(item)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-[12.5px] font-semibold rounded-lg hover:border-[#5044E5] hover:text-[#5044E5] transition-all shadow-sm"
                        >
                          <Copy size={13} />
                          {copiedID === item.id ? "Copied!" : "Copy"}
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all"
                          aria-label="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    {/* Prompt */}
                    <div className="mb-3">
                      <span className="text-[11px] font-semibold text-[#5044E5] uppercase tracking-wider">
                        Prompt
                      </span>
                      <p className="mt-1 text-[13.5px] text-gray-500 leading-relaxed line-clamp-2">
                        {item.prompt}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-3" />

                    {/* Result */}
                    <div>
                      <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                        Generated Copy
                      </span>
                      <p className="mt-1 text-[14px] text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {item.result}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default History;
