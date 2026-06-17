export function Card({ as: Component = "article", children, className = "", ...props }) {
  return (
    <Component
      className={`rounded-card border border-coffee-beans/10 bg-white shadow-sm ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Card;
