import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

type BuyButtonProps = {
  itchUrl: string;
  status: "available" | "coming-soon";
  className?: string;
};

export function BuyButton({ itchUrl, status, className }: BuyButtonProps) {
  if (status === "coming-soon") {
    return (
      <Button disabled className={className} size="lg">
        Coming soon on itch.io
      </Button>
    );
  }

  return (
    <Button asChild size="lg" className={className}>
      <a href={itchUrl} target="_blank" rel="noopener noreferrer">
        Buy on itch.io
        <ExternalLink className="h-4 w-4" aria-hidden />
      </a>
    </Button>
  );
}
