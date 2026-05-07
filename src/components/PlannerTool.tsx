import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CalendarClock } from "lucide-react";
import { generateAI } from "@/server/ai.functions";
import { OutputCard } from "./OutputCard";
import { toast } from "sonner";

export function PlannerTool() {
  const [input, setInput] = useState("");
  const [horizon, setHorizon] = useState("daily");
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!input.trim()) return toast.error("List a few tasks first");
    setLoading(true); setOut("");
    try {
      const res = await generateAI({ data: { kind: "planner", input, options: { horizon } } });
      setOut(res.content);
    } catch (e: any) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-4">
      <Tabs value={horizon} onValueChange={setHorizon}>
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
        </TabsList>
        <TabsContent value={horizon} />
      </Tabs>
      <div>
        <Label>Your tasks & goals</Label>
        <Textarea
          className="mt-2 min-h-[200px]"
          placeholder={"e.g.\n- Finish Q3 report\n- Call client about renewal\n- Review 3 PRs\n- Gym 1h"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={5000}
        />
      </div>
      <Button onClick={run} disabled={loading} variant="hero" size="lg">
        <CalendarClock className="w-4 h-4 mr-2" /> {loading ? "Planning..." : "Generate Smart Schedule"}
      </Button>
      <OutputCard content={out} loading={loading} />
    </div>
  );
}