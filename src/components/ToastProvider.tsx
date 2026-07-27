"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { CheckCircleIcon, XIcon } from "@/components/Icons";

type ToastTone = "success" | "info" | "error";

type ToastInput = {
  title: string;
  description?: string;
  tone?: ToastTone;
  duration?: number;
};

type ToastRecord = ToastInput & {
  id: number;
};

type ToastContextValue = {
  toast: (input: ToastInput | string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const nextId = useRef(1);

  const remove = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    (input: ToastInput | string) => {
      const normalized: ToastInput =
        typeof input === "string" ? { title: input } : input;
      const id = nextId.current++;
      const record: ToastRecord = {
        id,
        tone: "success",
        duration: 2600,
        ...normalized,
      };

      setToasts((current) => [...current.slice(-3), record]);
      window.setTimeout(() => remove(id), record.duration);
    },
    [remove],
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed bottom-5 right-5 z-[100] flex w-[min(92vw,380px)] flex-col gap-3"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((item) => (
          <div
            key={item.id}
            role={item.tone === "error" ? "alert" : "status"}
            className={`toast-card pointer-events-auto flex items-start gap-3 rounded-2xl border bg-surface p-4 shadow-float ${
              item.tone === "error"
                ? "border-red-200"
                : item.tone === "info"
                  ? "border-brand/20"
                  : "border-accent/20"
            }`}
          >
            <span
              className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                item.tone === "error"
                  ? "bg-red-50 text-red-600"
                  : item.tone === "info"
                    ? "bg-brand-light text-brand"
                    : "bg-accent-light text-accent-dark"
              }`}
            >
              <CheckCircleIcon size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-extrabold text-ink">{item.title}</p>
              {item.description && (
                <p className="mt-1 text-xs leading-5 text-ink-muted">
                  {item.description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => remove(item.id)}
              className="focus-ring grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink-muted transition hover:bg-paper hover:text-ink"
              aria-label="Dismiss notification"
            >
              <XIcon size={15} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
