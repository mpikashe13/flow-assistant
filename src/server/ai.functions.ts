import { createServerFn } from "@tanstack/react-start";

type Msg = { role: "system" | "user" | "assistant"; content: string };

const SYSTEM_PROMPTS: Record<string, (opts: any) => string> = {
  email: ({ tone, audience }) => `You are an expert business communication writer. Write a professional email.
- Tone: ${tone}
- Audience: ${audience}
- Include a clear subject line on the first line as "Subject: ..."
- Be concise, structured, and respectful. Avoid jargon.
- Use markdown formatting.
End with a brief reminder to the user (in italics) to review before sending.`,
  summary: () => `You are an expert meeting notes summarizer. From the user's raw notes, produce a structured summary in markdown with these sections:
## TL;DR
## Key Points
## Decisions
## Action Items (with owner if mentioned)
## Deadlines
Be precise and faithful to the input. If a section has no info, write "—".
End with: *Please review for accuracy.*`,
  planner: ({ horizon }) => `You are an expert productivity coach. Generate a prioritized ${horizon} schedule in markdown based on the user's tasks/goals.
- Use the Eisenhower matrix (Urgent/Important) reasoning silently.
- Output a clean schedule table with Time | Task | Priority (P1/P2/P3) | Notes.
- Group by day if weekly.
- End with 3 short "Optimization Tips".
- Add a final italic disclaimer: *AI-generated plan — adjust to your real constraints.*`,
  chat: () => `You are a helpful workplace productivity assistant. Help the user with emails, summaries, planning, and general work questions. Be concise, professional, and use markdown. Remind users to review AI outputs when relevant.`,
  research: () => `You are an expert research assistant. Given a topic or article text, produce a clear, plain-language briefing in markdown with these sections:
## Short Summary
## Key Insights
## Recommendations / Next Steps
## Suggested Follow-up Questions
Keep it neutral, factual, and accessible. End with: *AI-generated — verify facts independently.*`,
};

export const generateAI = createServerFn({ method: "POST" })
  .inputValidator((d: { kind: keyof typeof SYSTEM_PROMPTS; input: string; options?: any; history?: Msg[] }) => d)
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

    const system = SYSTEM_PROMPTS[data.kind](data.options || {});
    const messages: Msg[] = [
      { role: "system", content: system },
      ...(data.history || []),
      { role: "user", content: data.input },
    ];

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "google/gemini-3-flash-preview", messages }),
    });

    if (res.status === 429) throw new Error("Rate limit reached. Please try again in a moment.");
    if (res.status === 402) throw new Error("AI credits exhausted. Please add credits in Settings.");
    if (!res.ok) throw new Error(`AI error: ${res.status}`);

    const json = await res.json();
    const content = json.choices?.[0]?.message?.content ?? "";
    return { content };
  });