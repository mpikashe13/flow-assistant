import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { SummaryTool } from "@/components/SummaryTool";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/summarize")({
  head: () => ({ meta: [{ title: "Notes Summarizer — SmartFlow AI" }, { name: "description", content: "Summarize meeting notes into key points and action items." }] }),
  component: () => (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <PageHeader icon={FileText} title="Meeting Notes Summarizer" description="Turn long notes into clear key points, decisions and action items." />
      <SummaryTool />
    </div>
  ),
});