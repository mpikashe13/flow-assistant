import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";
import { ChatPanel } from "@/components/ChatPanel";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "Chatbot — SmartFlow AI" }, { name: "description", content: "Conversational AI assistant for productivity." }] }),
  component: () => (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <PageHeader icon={MessageSquare} title="Chatbot Assistant" description="Ask anything about productivity, planning, or workplace tasks." />
      <ChatPanel />
    </div>
  ),
});