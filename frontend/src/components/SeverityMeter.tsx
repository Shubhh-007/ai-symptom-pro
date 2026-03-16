interface SeverityMeterProps {
  value: number; // 1-10
}

const SeverityMeter = ({ value }: SeverityMeterProps) => {
  const percentage = (value / 10) * 100;
  const getColor = () => {
    if (value <= 3) return "bg-[hsl(140,65%,50%)]";
    if (value <= 6) return "bg-[hsl(45,90%,55%)]";
    return "bg-[hsl(0,72%,55%)]";
  };

  return (
    <div>
      <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
        <span>Low</span>
        <span>Moderate</span>
        <span>Severe</span>
      </div>
      <div className="h-3 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${getColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-1 text-right">{value}/10</p>
    </div>
  );
};

export default SeverityMeter;
