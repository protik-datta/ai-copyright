import { createContext, useContext, useState, useCallback } from "react";
import ToastIcons from '../src/lib/ToastIcon';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ message, type = "info", duration = 3000 }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer toasts={toasts} remove={remove} />
    </ToastContext.Provider>
  );
};

export const Toaster = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx.toast;
};

const styles = {
  success: {
    icon: "text-emerald-600",
    bar: "bg-emerald-500",
    bg: "bg-emerald-50/80",
    border: "border-emerald-200/60",
  },
  error: {
    icon: "text-red-500",
    bar: "bg-red-500",
    bg: "bg-red-50/80",
    border: "border-red-200/60",
  },
  info: {
    icon: "text-blue-500",
    bar: "bg-blue-500",
    bg: "bg-blue-50/80",
    border: "border-blue-200/60",
  },
  warning: {
    icon: "text-amber-500",
    bar: "bg-amber-400",
    bg: "bg-amber-50/80",
    border: "border-amber-200/60",
  },
};

const ToastItem = ({ toast, remove }) => {
  const s = styles[toast.type] || styles.info;

  return (
    <div
      className={`
        relative flex items-start gap-3 w-full max-w-sm
        px-4 py-3.5 rounded-xl
        ${s.bg} ${s.border}
        border backdrop-blur-md
        shadow-[0_4px_30px_0_rgba(0,0,0,0.10)]
        animate-[slideIn_0.3s_ease_forwards]
      `}
    >
      {/* Progress bar */}
      <div
        className={`absolute bottom-0 left-0 h-0.75 rounded-b-xl ${s.bar} opacity-60`}
        style={{ animation: `shrink ${toast.duration}ms linear forwards` }}
      />

      {/* Icon */}
      <span className={`mt-0.5 shrink-0 ${s.icon}`}>
        {ToastIcons[toast.type]}
      </span>

      {/* Message */}
      <p className="text-[13.5px] text-[#3B3B3B] font-medium leading-snug flex-1 pr-2">
        {toast.message}
      </p>

      {/* Close button */}
      <button
        onClick={() => remove(toast.id)}
        className="shrink-0 text-[#9E9E9E] hover:text-[#3B3B3B] transition-colors duration-150 mt-0.5"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

const ToastContainer = ({ toasts, remove }) => {
  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-9999 flex flex-col gap-3 items-end">
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px) scale(0.96); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes shrink {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} remove={remove} />
      ))}
    </div>
  );
};
