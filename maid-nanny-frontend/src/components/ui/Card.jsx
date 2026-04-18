import { cn } from "../../lib/utils";

export const Card = ({ children, className, hover = false, ...props }) => (
  <div 
    className={cn(
      "bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300", 
      hover && "hover:shadow-elegant hover:-translate-y-1 cursor-pointer",
      className
    )} 
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className }) => (
  <div className={cn("px-6 py-5 border-b border-slate-50 bg-slate-50/50", className)}>{children}</div>
);

export const CardContent = ({ children, className }) => (
  <div className={cn("p-6", className)}>{children}</div>
);
