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

  const generate = async (fullPrompt, userTopic) => {
    const usage = getUsage();
    if (usage.count >= DAILY_LIMIT) {
      const msg = "Today's limit is over! Try again tomorrow.";
      setError(msg);
      toast({ message: msg, type: "error" });
      return;
    }

    setLoading(true);
    setError("");

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-3-flash-preview",
      });

      const response = await model.generateContent(fullPrompt);
      const text = response.response.text();

      let parsed;
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const cleaned = jsonMatch ? jsonMatch[0] : text;
        parsed = JSON.parse(cleaned);
      } catch (parseErr) {
        parsed = { error: false, result: text };
      }

      if (parsed.error) {
        const errorMsg =
          parsed.message ||
          "Invalid input. Please provide valid product details.";
        setError(errorMsg);
        toast({ message: errorMsg, type: "error" });
        return;
      }

      // success logic
      setResult(parsed.result);

      // use limit update
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
      history.unshift({
        id: Date.now(),
        topic: userTopic,
        result: parsed.result,
        date: new Date().toLocaleTimeString(),
      });
      localStorage.setItem(
        "copyai_history",
        JSON.stringify(history.slice(0, 20)),
      );
    } catch (err) {
      const errMsg = "Server issue! Please try again in a few moments.";
      setError(errMsg);
      toast({ message: errMsg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, generate, remaining, DAILY_LIMIT };
};

export default useGemini;
