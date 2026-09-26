import { cn } from "../cn";

const variants = {
  primary:
    "bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover hover:shadow-md active:scale-[0.98]",

  secondary:
    "border border-border bg-surface text-text shadow-sm hover:border-primary/30 hover:bg-surface-muted active:scale-[0.98]",

  outline:
    "border border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground active:scale-[0.98]",

  ghost:
    "text-text hover:bg-surface-muted active:scale-[0.98]",

  danger:
    "bg-danger text-white shadow-sm hover:opacity-90 active:scale-[0.98]",
};

const sizes = {
  sm: "h-9 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-sm",
  xl: "h-13 px-7 text-sm",
};

function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full whitespace-nowrap font-semibold tracking-[-0.01em] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;