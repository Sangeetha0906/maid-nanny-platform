import { cn } from "../../lib/utils";

export const Input = ({ className, label, error, ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full relative">
      {label && <label className="text-sm font-medium text-slate-700 ml-1">{label}</label>}
      <input
        className={cn(
          "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[48px]",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500 ml-1 animate-fade-in">{error}</span>}
    </div>
  );
};
