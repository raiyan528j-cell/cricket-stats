import { TrendingUp } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const utmUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;
  return (
    <footer className="border-t border-border bg-card/60 mt-auto">
      <div className="container flex flex-col sm:flex-row items-center justify-between py-6 gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="font-display font-semibold text-foreground">
            CricAnalytics
          </span>
          <span>— Premium Cricket Statistics</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {year}. Built with love using{" "}
          <a
            href={utmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
