import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Mail, FileText, CalendarClock, BookOpen, MessageSquare, Sparkles, TrendingUp, Clock, CheckCircle2, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SmartFlow AI — Dashboard" },
      { name: "description", content: "Your AI-powered workspace dashboard for emails, summaries, planning, and research." },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { label: "Hours saved / week", value: "8.5", icon: Clock, hint: "vs. manual workflows" },
  { label: "Tasks automated", value: "120+", icon: CheckCircle2, hint: "across all tools" },
  { label: "Faster drafting", value: "5×", icon: Zap, hint: "average email speed" },
  { label: "Productivity boost", value: "+34%", icon: TrendingUp, hint: "estimated" },
];

const tools = [
  { to: "/email", title: "Smart Email Generator", desc: "Draft polished emails with adjustable tone and audience.", icon: Mail, color: "from-orange-500 to-rose-500" },
  { to: "/summarize", title: "Meeting Notes Summarizer", desc: "Turn long notes into key points, decisions and actions.", icon: FileText, color: "from-amber-500 to-orange-500" },
  { to: "/planner", title: "AI Task Planner", desc: "Prioritize and schedule your day or week intelligently.", icon: CalendarClock, color: "from-fuchsia-500 to-pink-500" },
  { to: "/research", title: "Research Assistant", desc: "Get clear summaries and insights from any topic or article.", icon: BookOpen, color: "from-sky-500 to-indigo-500" },
  { to: "/chat", title: "Chatbot Assistant", desc: "Conversational help for any workplace question.", icon: MessageSquare, color: "from-emerald-500 to-teal-500" },
];

function Dashboard() {
  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl p-6 sm:p-10 mb-8 bg-[var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-elegant)]">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_60%)]" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3 w-3" /> Powered by AI
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">Welcome to SmartFlow AI</h1>
          <p className="mt-2 max-w-2xl text-sm sm:text-base opacity-90">
            Your AI workplace assistant — write emails, summarize meetings, plan your day, research topics, and chat with an assistant in one place.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((s) => (
          <Card key={s.label} className="p-4 hover:shadow-[var(--shadow-soft)] transition-shadow">
            <div className="flex items-center justify-between">
              <s.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="mt-2 text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className="text-[10px] text-muted-foreground/70 mt-1">{s.hint}</div>
          </Card>
        ))}
      </section>

      {/* Tools grid */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Your AI tools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link key={t.to} to={t.to} className="group">
              <Card className="p-5 h-full transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elegant)]">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${t.color} text-white shadow`}>
                  <t.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-semibold group-hover:text-primary transition-colors">{t.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-10 text-xs text-muted-foreground text-center max-w-2xl mx-auto">
        SmartFlow AI uses generative AI to assist with productivity tasks. Outputs may be inaccurate or incomplete — always review before sharing or acting on them.
      </p>
    </div>
  );
}
