import { cn } from "@/lib/utils";
import { forwardRef, ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
          {
            "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500":
              variant === "primary",
            "bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-500":
              variant === "secondary",
            "border-2 border-slate-200 bg-transparent hover:bg-slate-50 focus:ring-slate-500":
              variant === "outline",
            "bg-transparent hover:bg-slate-100 focus:ring-slate-500":
              variant === "ghost",
            "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500":
              variant === "destructive",
          },
          {
            "h-9 px-3 text-sm": size === "sm",
            "h-11 px-5 text-base": size === "md",
            "h-14 px-8 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
