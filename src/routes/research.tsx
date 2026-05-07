import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { ResearchTool } from "@/components/ResearchTool";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [{ title: "Research Assistant — SmartFlow AI" }, { name: "description", content: "Summarize topics and articles into clear insights." }] }),
  component: () => (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <PageHeader icon={BookOpen} title="AI Research Assistant" description="Get plain-language summaries, insights, and recommendations." />
      <ResearchTool />
    </div>
  ),
});