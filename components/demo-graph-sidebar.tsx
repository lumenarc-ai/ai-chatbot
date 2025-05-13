"use client";

import { ReactNode, useEffect, useState } from "react";
import { DemoGraphTab } from "./demo-graph-tab";
import { useDemoGraphData } from "@/hooks/use-demo-graph-data";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChevronRightIcon, ChevronLeftIcon } from "./icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Cookie name for storing the demo graph sidebar state
const DEMO_GRAPH_SIDEBAR_COOKIE_NAME = "demo-graph-sidebar:state";
const DEMO_GRAPH_SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

interface DemoGraphSidebarProps {
  children?: ReactNode;
}

export function DemoGraphSidebar({ children }: DemoGraphSidebarProps) {
  const { graphData } = useDemoGraphData();
  const [isOpen, setIsOpen] = useState(() => {
    // Try to get saved state from localStorage, default to false (collapsed)
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem(DEMO_GRAPH_SIDEBAR_COOKIE_NAME);
      return savedState === "true";
    }
    return false;
  });
  const [isMobile, setIsMobile] = useState(false);
  const [lastToolTimestamp, setLastToolTimestamp] = useState<number | null>(null);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Use lg breakpoint
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-expand when a demo graph tool is called
  useEffect(() => {
    if (graphData.timestamp && graphData.timestamp !== lastToolTimestamp) {
      setLastToolTimestamp(graphData.timestamp);
      setIsOpen(true);
      
      // Save state to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(DEMO_GRAPH_SIDEBAR_COOKIE_NAME, "true");
      }
    }
  }, [graphData.timestamp, lastToolTimestamp]);

  // Toggle sidebar function
  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    
    // Save state to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(DEMO_GRAPH_SIDEBAR_COOKIE_NAME, newState.toString());
    }
  };

  if (isMobile) {
    // On mobile, show a toggle button to switch between chat and graph
    return (
      <div className="flex flex-col h-dvh relative">
        {/* Main content */}
        <div className={`flex-1 ${isOpen ? "hidden" : "block"}`}>
          {children}
        </div>

        {/* Graph view (when toggled) */}
        <div
          className={`absolute inset-0 bg-background ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {isOpen && (
            <div className="h-full flex flex-col p-4">
              <div className="mb-2 flex justify-between items-center">
                <div className="text-xs text-muted-foreground">
                  {graphData.toolName
                    ? `Last updated by: ${graphData.toolName}`
                    : "Ready for data"}
                </div>
              </div>
              <div className="flex-1 overflow-hidden rounded-lg border border-border bg-card">
                <DemoGraphTab graphData={graphData} />
              </div>
            </div>
          )}
        </div>

        {/* Toggle button */}
        <button
          onClick={toggleSidebar}
          className="fixed bottom-4 right-4 z-50 bg-primary text-primary-foreground rounded-full p-3 shadow-lg"
          aria-label={isOpen ? "Show Chat" : "Show Graph"}
        >
          {isOpen ? "Show Chat" : "Show Graph"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-row h-dvh relative">
      {/* Main content */}
      <div className="min-w-0 h-full flex-1 overflow-hidden">
        {children}
      </div>

      {/* Demo Graph Sidebar */}
      <div
        className={cn(
          "h-full overflow-hidden transition-all duration-300 ease-in-out border-l border-border bg-muted/30",
          isOpen ? "w-[40%]" : "w-0"
        )}
      >
        {isOpen && (
          <div className="h-full flex flex-col p-2">
            <div className="flex-1 overflow-hidden rounded-lg border border-border bg-card">
              <DemoGraphTab graphData={graphData} />
            </div>
          </div>
        )}
      </div>

      {/* Toggle button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={toggleSidebar}
            variant="outline"
            size="icon"
            className={cn(
              "absolute top-4 z-10 transition-all duration-300 ease-in-out",
              isOpen ? "right-[40%] -translate-x-1/2" : "right-4"
            )}
            aria-label={isOpen ? "Hide Graph" : "Show Graph"}
          >
            {isOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isOpen ? "Hide Graph" : "Show Graph"}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
