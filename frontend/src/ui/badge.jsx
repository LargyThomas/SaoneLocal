const variants = {
  highlight: "border border-coffee-beans/10 bg-golden-glow text-coffee-beans shadow-[0_6px_14px_rgba(36,17,5,0.08)]",
  success: "border border-green/10 bg-green text-white shadow-[0_6px_14px_rgba(15,113,10,0.14)]",
  muted: "border border-forest-green/15 bg-muted-olive/25 text-black-forest",
  warning: "border border-coffee-beans/10 bg-mustard text-coffee-beans",
  danger: "border border-inferno/10 bg-inferno text-white",
};

export function Badge({ children, className = "", variant = "highlight" }) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-card px-3 py-1 text-sm font-extrabold leading-none ${variants[variant] || variants.highlight} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
