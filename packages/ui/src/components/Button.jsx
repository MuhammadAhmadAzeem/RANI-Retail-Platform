import { cn } from "../cn";

const variants = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover",

  secondary:
    "border border-border bg-surface text-text hover:bg-surface-muted",

  outline:
    "border border-primary text-primary hover:bg-primary hover:text-primary-foreground",

  ghost:
    "text-text hover:bg-surface-muted",

  danger:
    "bg-danger text-white hover:opacity-90",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-sm",
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
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50",
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