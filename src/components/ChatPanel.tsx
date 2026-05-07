import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { generateAI } from "@/server/ai.functions";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

export function ChatPanel() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "👋 Hi! I'm your SmartFlow AI assistant. Ask me anything about productivity, planning, or workplace tasks." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await generateAI({
        data: {
          kind: "chat",
          input: text,
          history: messages.filter(m => m.role !== "assistant" || messages.indexOf(m) > 0),
        },
      });
      setMessages([...next, { role: "assistant", content: res.content }]);
    } catch (e: any) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-12rem)] overflow-hidden shadow-[var(--shadow-soft)]">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 animate-fade-in ${m.role === "user" ? "justify-end" : ""}`}>
            {m.role === "assistant" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--gradient-hero)] text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
              m.role === "user"
                ? "bg-primary text-primary-foreground rounded-br-sm"
                : "bg-muted text-foreground rounded-bl-sm"
            }`}>
              <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-headings:my-2">
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
            <div className="bg-muted rounded-2xl px-4 py-2.5 text-sm text-muted-foreground">Thinking...</div>
          </div>
        )}
      </div>
      <div className="border-t p-3 flex gap-2 bg-background">
        <Input
          placeholder="Ask anything about productivity..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && send()}
          disabled={loading}
        />
        <Button onClick={send} disabled={loading || !input.trim()} variant="hero" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}