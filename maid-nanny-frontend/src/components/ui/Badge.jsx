import { cn } from "../../lib/utils";

export const Badge = ({ children, variant = "neutral", className }) => {
  const variants = {
    neutral: "bg-slate-100 text-slate-600 border border-slate-200",
    success: "bg-green-50 text-green-700 border border-green-200",
    warning: "bg-amber-50 text-amber-700 border border-amber-200",
    primary: "bg-primary-50 text-primary-700 border border-primary-200",
  };

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide", variants[variant], className)}>
      {children}
    </span>
  );
};
