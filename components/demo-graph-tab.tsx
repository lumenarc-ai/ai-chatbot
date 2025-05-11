"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { DemoGraphCanvas } from "./demo-graph-canvas";

// Define the visualization types
export type VisualizationType = "json" | "graph" | "network";

// Define the visualization configuration interface
export interface VisualizationConfig {
  id: VisualizationType;
  label: string;
  description?: string;
}

// Define the available visualizations
export const VISUALIZATIONS: VisualizationConfig[] = [
  {
    id: "json",
    label: "JSON",
    description: "View the graph data as JSON with syntax highlighting",
  },
  {
    id: "graph",
    label: "Graph",
    description: "View the graph as a visual network",
  },
  // New visualizations can be added here
];

interface DemoGraphTabProps {
  graphData: any;
  defaultVisualization?: VisualizationType;
}

export function DemoGraphTab({
  graphData,
  defaultVisualization = "json",
}: DemoGraphTabProps) {
  const [activeTab, setActiveTab] =
    useState<VisualizationType>(defaultVisualization);

  // Create a copy of the graph data with the selected visualization type
  const visualizedData = {
    data: graphData,
    visualizationType: activeTab,
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Tabs */}
      <div className="flex border-b border-green-200">
        {VISUALIZATIONS.map((viz) => (
          <button
            key={viz.id}
            onClick={() => setActiveTab(viz.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              "hover:text-green-800 hover:bg-green-50",
              activeTab === viz.id
                ? "text-green-800 border-b-2 border-green-500 bg-green-50"
                : "text-green-600"
            )}
            title={viz.description}
          >
            {viz.label}
          </button>
        ))}
      </div>

      {/* Visualization */}
      <DemoGraphCanvas graphData={visualizedData} />
    </div>
  );
}
