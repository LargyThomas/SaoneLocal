export function Input({ className = "", label, id, error, ...props }) {
  const inputId = id || props.name;

  return (
    <label className="grid gap-2 text-base font-bold text-coffee-beans" htmlFor={inputId}>
      {label ? <span>{label}</span> : null}
      <input
        className={`min-h-12 w-full rounded-card border bg-white px-4 text-base text-coffee-beans outline-none transition placeholder:text-brown-bark/75 focus:border-green focus:ring-2 focus:ring-golden-glow ${
          error ? "border-inferno" : "border-coffee-beans/20"
        } ${className}`}
        id={inputId}
        {...props}
      />
      {error ? <span className="text-sm font-bold text-inferno">{error}</span> : null}
    </label>
  );
}

export default Input;
