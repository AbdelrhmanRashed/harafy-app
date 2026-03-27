const FeatureCard=({
  icon,
  title,
  desc,
  width
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  width?: string;
})=> {
  return (
    <div style={{ width: `${width}` }} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/20 hover:shadow-sm transition-all duration-200 drop-shadow-lg drop-shadow-black/5">
      <span className="shrink-0 p-2 rounded-lg bg-secondary">{icon}</span>
      <div className="text-right min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}
export default FeatureCard;