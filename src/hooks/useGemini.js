import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import { Toaster } from "../../utils/Toaster.jsx";

const DAILY_LIMIT = 10;

const getUsage = () => {
  const today = new Date().toDateString();
  const stored = JSON.parse(localStorage.getItem("copyai_usage") || "{}");
  if (stored.date !== today) return { date: today, count: 0 };
  return stored;
};

const useGemini = () => {
  const toast = Toaster();
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [remaining, setRemaining] = useState(() => {
    const usage = getUsage();
    return DAILY_LIMIT - usage.count;
  });

  const generate = async (prompt) => {
    // daily limit check
    const usage = getUsage();
    if (usage.count >= DAILY_LIMIT) {
      setError("আজকের limit শেষ! কাল আবার try করো।");
      toast({ message: "আজকের limit শেষ! কাল আবার try করো।", type: "error" });
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-3-flash-preview",
      });
      const response = await model.generateContent(prompt);
      const text = response.response.text();

      let parsed;
      try {
        const cleaned = text.replace(/```json|```/g, "").trim();
        parsed = JSON.parse(cleaned);
      } catch {
        parsed = { error: false, result: text };
      }

      if (parsed.error) {
        setError(
          parsed.message ||
            "Invalid request. Please enter a valid product or service.",
        );

        toast({
          message: `${parsed.message} || Invalid request. Please enter a valid product or service.`,
        });

        return;
      }

      // success — result set
      setResult(parsed.result);

      // count increase
      const newCount = usage.count + 1;
      localStorage.setItem(
        "copyai_usage",
        JSON.stringify({ date: usage.date, count: newCount }),
      );
      setRemaining(DAILY_LIMIT - newCount);

      // history save
      const history = JSON.parse(
        localStorage.getItem("copyai_history") || "[]",
      );
      history.unshift({ id: Date.now(), prompt, result: parsed.result });
      localStorage.setItem("copyai_history", JSON.stringify(history));
    } catch (err) {
      console.error("Gemini Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, generate, remaining, DAILY_LIMIT };
};

export default useGemini;
