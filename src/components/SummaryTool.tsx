import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";
import { generateAI } from "@/server/ai.functions";
import { OutputCard } from "./OutputCard";
import { toast } from "sonner";

export function SummaryTool() {
  const [input, setInput] = useState("");
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!input.trim()) return toast.error("Paste meeting notes first");
    setLoading(true); setOut("");
    try {
      const res = await generateAI({ data: { kind: "summary", input } });
      setOut(res.content);
    } catch (e: any) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Meeting notes</Label>
        <Textarea
          className="mt-2 min-h-[260px]"
          placeholder="Paste raw meeting notes, transcript, or bullet points..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={20000}
        />
      </div>
      <Button onClick={run} disabled={loading} variant="hero" size="lg">
        <FileText className="w-4 h-4 mr-2" /> {loading ? "Summarizing..." : "Summarize Notes"}
      </Button>
      <OutputCard content={out} loading={loading} />
    </div>
  );
}