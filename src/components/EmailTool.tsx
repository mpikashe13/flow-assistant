import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles } from "lucide-react";
import { generateAI } from "@/server/ai.functions";
import { OutputCard } from "./OutputCard";
import { toast } from "sonner";

export function EmailTool() {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState("formal");
  const [audience, setAudience] = useState("client");
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!input.trim()) return toast.error("Describe what the email is about");
    setLoading(true); setOut("");
    try {
      const res = await generateAI({ data: { kind: "email", input, options: { tone, audience } } });
      setOut(res.content);
    } catch (e: any) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label>Tone</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="informal">Informal</SelectItem>
              <SelectItem value="persuasive">Persuasive</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
              <SelectItem value="apologetic">Apologetic</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Audience</Label>
          <Select value={audience} onValueChange={setAudience}>
            <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="client">Client</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="team member">Team Member</SelectItem>
              <SelectItem value="vendor">Vendor</SelectItem>
              <SelectItem value="executive">Executive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label>What's the email about?</Label>
        <Textarea
          className="mt-2 min-h-[140px]"
          placeholder="e.g. Follow up with Acme Corp about the proposal we sent last Tuesday and offer a meeting next week..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={2000}
        />
      </div>
      <Button onClick={run} disabled={loading} variant="hero" size="lg">
        <Sparkles className="w-4 h-4 mr-2" /> {loading ? "Generating..." : "Generate Email"}
      </Button>
      <OutputCard content={out} loading={loading} />
    </div>
  );
}