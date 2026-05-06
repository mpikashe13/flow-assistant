import ReactMarkdown from "react-markdown";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export function OutputCard({ content, loading }: { content: string; loading?: boolean }) {
  const [copied, setCopied] = useState(false);
  if (!content && !loading) return null;

  const copy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Card className="p-6 mt-6 relative shadow-[var(--shadow-soft)]">
      {loading ? (
        <div className="space-y-3">
          <div className="h-3 bg-muted rounded animate-pulse w-3/4" />
          <div className="h-3 bg-muted rounded animate-pulse w-full" />
          <div className="h-3 bg-muted rounded animate-pulse w-5/6" />
          <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
        </div>
      ) : (
        <>
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-3 right-3"
            onClick={copy}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
          <div className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground prose-table:text-foreground">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </>
      )}
    </Card>
  );
}