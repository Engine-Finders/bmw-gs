export default function GlassPanel({ children, className = "", glare = false }) {
  return (
    <div className={`glass-panel p-4 sm:p-7 ${className}`}>
      {glare && <span className="glare-border" aria-hidden="true" />}
      <span className="glass-glare glass-glare-tl" aria-hidden="true" />
      <span className="glass-glare glass-glare-tr" aria-hidden="true" />
      <div className="relative">{children}</div>
    </div>
  );
}
