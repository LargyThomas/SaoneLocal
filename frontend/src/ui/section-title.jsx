import Badge from "./badge.jsx";

export function SectionTitle({ eyebrow, title, description, className = "" }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <h2 className="text-2xl font-display leading-tight text-coffee-beans sm:text-3xl">{title}</h2>
      {description ? <p className="max-w-2xl text-lg leading-8 text-coffee-beans/75">{description}</p> : null}
    </div>
  );
}

export default SectionTitle;

