const FeatureCard = ({
  icon,
  title,
  desc,
  width,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  width?: string;
}) => {
  return (
    <div
      style={{ width: `${width}` }}
      className="bg-card border-border hover:border-primary/20 flex items-start gap-3 rounded-xl border p-4 drop-shadow-lg drop-shadow-black/5 transition-all duration-200 hover:shadow-sm"
    >
      <span className="bg-secondary shrink-0 rounded-lg p-2">{icon}</span>
      <div className="min-w-0 text-right">
        <p className="text-foreground truncate text-sm font-semibold">
          {title}
        </p>
        <p className="text-muted-foreground text-xs">{desc}</p>
      </div>
    </div>
  );
};
export default FeatureCard;
