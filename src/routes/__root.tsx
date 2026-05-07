import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SmartFlow AI — Workplace Productivity Assistant" },
      { name: "description", content: "AI-powered emails, meeting summaries, task planning, research and a chatbot assistant — all in one polished workspace." },
      { name: "author", content: "SmartFlow AI" },
      { property: "og:title", content: "SmartFlow AI — Workplace Productivity Assistant" },
      { property: "og:description", content: "AI-powered emails, summaries, planning and research." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <header className="h-14 flex items-center justify-between border-b px-3 bg-background/80 backdrop-blur sticky top-0 z-30">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <span className="text-sm text-muted-foreground hidden sm:inline">SmartFlow AI</span>
              </div>
              <ThemeToggle />
            </header>
            <main className="flex-1 animate-fade-in">
              <Outlet />
            </main>
            <footer className="border-t px-4 py-3 text-xs text-muted-foreground text-center">
              ⚠️ AI-generated content may be inaccurate. Please review before relying on it.
            </footer>
          </div>
        </div>
        <Toaster />
      </SidebarProvider>
    </ThemeProvider>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
