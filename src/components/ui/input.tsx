import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, type = "text", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            "w-full h-12 px-4 rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500",
            error
              ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
              : "border-slate-200",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        {hint && !error && <p className="text-sm text-slate-500">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
