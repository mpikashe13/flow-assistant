import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Mail, FileText, CalendarClock, BookOpen, MessageSquare, Sparkles } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Email Generator", url: "/email", icon: Mail },
  { title: "Notes Summarizer", url: "/summarize", icon: FileText },
  { title: "Task Planner", url: "/planner", icon: CalendarClock },
  { title: "Research", url: "/research", icon: BookOpen },
  { title: "Chatbot", url: "/chat", icon: MessageSquare },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const path = useRouterState({ select: (r) => r.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link to="/" className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-elegant)]">
            <Sparkles className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <div className="text-sm font-semibold">SmartFlow AI</div>
              <div className="text-[10px] text-muted-foreground">Productivity Suite</div>
            </div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={path === item.url}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}