import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}

export function StatCard({ label, value, sub, accent }: StatCardProps) {
  return (
    <Card className="card-elevated-dark bg-card border-border">
      <CardContent className="p-4">
        <p className="text-xs font-body text-muted-foreground uppercase tracking-wider mb-1">
          {label}
        </p>
        <p
          className={`text-2xl font-display font-bold ${
            accent ? "text-primary" : "text-foreground"
          }`}
        >
          {value}
        </p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </CardContent>
    </Card>
  );
}
