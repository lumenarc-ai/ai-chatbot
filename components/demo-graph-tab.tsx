"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { DemoGraphCanvas } from "./demo-graph-canvas";
import { useDemoGraphData, DemoGraphData } from "@/hooks/use-demo-graph-data";

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
  graphData?: DemoGraphData;
  defaultVisualization?: VisualizationType;
}

export function DemoGraphTab({
  graphData,
  defaultVisualization = "json",
}: DemoGraphTabProps) {
  // Use the shared demo graph data if no specific data is provided
  const { graphData: sharedGraphData } = useDemoGraphData();
  const dataToUse = graphData || sharedGraphData;

  const [activeTab, setActiveTab] = useState<VisualizationType>(
    dataToUse.visualizationType || defaultVisualization
  );

  // Update active tab when visualization type changes in the data
  useEffect(() => {
    if (
      dataToUse.visualizationType &&
      dataToUse.visualizationType !== activeTab
    ) {
      setActiveTab(dataToUse.visualizationType);
    }
  }, [dataToUse.visualizationType, activeTab]);

  // Create a copy of the graph data with the selected visualization type
  const visualizedData = {
    title: dataToUse.title,
    description: dataToUse.description,
    data: dataToUse.data,
    visualizationType: activeTab,
  };

  return (
    <div className="flex flex-col _gap-4">
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
