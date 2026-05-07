import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BookOpen } from "lucide-react";
import { generateAI } from "@/server/ai.functions";
import { OutputCard } from "./OutputCard";
import { toast } from "sonner";

export function ResearchTool() {
  const [input, setInput] = useState("");
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!input.trim()) return toast.error("Enter a topic or paste an article");
    setLoading(true); setOut("");
    try {
      const res = await generateAI({ data: { kind: "research", input } });
      setOut(res.content);
    } catch (e: any) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Topic or article text</Label>
        <Textarea
          className="mt-2 min-h-[220px]"
          placeholder="e.g. 'The impact of remote work on team productivity' — or paste a full article..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={20000}
        />
      </div>
      <Button onClick={run} disabled={loading} variant="hero" size="lg">
        <BookOpen className="w-4 h-4 mr-2" /> {loading ? "Researching..." : "Research & Summarize"}
      </Button>
      <OutputCard content={out} loading={loading} />
    </div>
  );
}