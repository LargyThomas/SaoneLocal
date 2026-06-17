const variants = {
  primary:
    "bg-green text-white shadow-[0_10px_18px_rgba(15,113,10,0.16)] hover:bg-brand-green hover:shadow-[0_14px_24px_rgba(15,113,10,0.2)] focus-visible:outline-golden-glow disabled:bg-muted-olive disabled:text-white disabled:shadow-none",
  secondary:
    "border border-coffee-beans/15 bg-golden-glow text-coffee-beans shadow-[0_8px_16px_rgba(36,17,5,0.08)] hover:bg-mustard hover:shadow-[0_12px_20px_rgba(36,17,5,0.12)] focus-visible:outline-green disabled:border-muted-olive disabled:bg-vanilla-custard disabled:text-brown-bark disabled:shadow-none",
  danger:
    "bg-inferno text-white shadow-sm hover:bg-[#7d0800] focus-visible:outline-mustard disabled:bg-brown-bark disabled:shadow-none",
  ghost:
    "bg-transparent text-coffee-beans hover:bg-vanilla-custard focus-visible:outline-golden-glow disabled:text-brown-bark",
};

const sizes = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-11 px-5 text-base",
  lg: "min-h-12 px-6 text-base",
};

export function Button({
  as: Component = "button",
  children,
  className = "",
  disabled = false,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}) {
  const componentProps = Component === "button" ? { disabled, type } : {};

  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-button font-bold transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-75 ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...componentProps}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Button;
