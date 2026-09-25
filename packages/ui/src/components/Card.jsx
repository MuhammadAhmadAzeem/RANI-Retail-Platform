import { cn } from "../cn";

function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;