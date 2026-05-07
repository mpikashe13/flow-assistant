import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";
import { PlannerTool } from "@/components/PlannerTool";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/planner")({
  head: () => ({ meta: [{ title: "Task Planner — SmartFlow AI" }, { name: "description", content: "AI-prioritized daily and weekly schedules." }] }),
  component: () => (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <PageHeader icon={CalendarClock} title="AI Task Planner" description="Prioritize tasks and build a smart daily or weekly schedule." />
      <PlannerTool />
    </div>
  ),
});