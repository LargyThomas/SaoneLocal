export function Container({ as: Component = "section", children, className = "", ...props }) {
  return (
    <Component className={`mx-auto w-full max-w-6xl px-4 ${className}`} {...props}>
      {children}
    </Component>
  );
}

export default Container;
