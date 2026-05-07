import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { EmailTool } from "@/components/EmailTool";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/email")({
  head: () => ({ meta: [{ title: "Email Generator — SmartFlow AI" }, { name: "description", content: "Generate professional emails with adjustable tone." }] }),
  component: () => (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <PageHeader icon={Mail} title="Smart Email Generator" description="Draft professional emails tailored to your audience and tone." />
      <EmailTool />
    </div>
  ),
});