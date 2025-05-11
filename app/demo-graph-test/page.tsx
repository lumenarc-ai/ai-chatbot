"use client";

import { DemoGraphTab } from "@/components/demo-graph-tab";
import sampleGraphData from "@/fixtures/demo-graph/responseiq";

// Sample data with nodes, edges, and metadata
const sampleGraphData1 = {
  title: "Graph Visualization Example",
  description: "This demonstrates the tabbed graph visualization component",
  data: {
    nodes: [
      { id: "docs", label: "docs", properties: { type: "process" } },
      {
        id: "execute",
        label: "Execute Workflow",
        properties: { type: "process", workflow: "ENDPOINT/VERSION" },
      },
      {
        id: "edit",
        label: "Edit Fields",
        properties: { type: "process", manual: true },
      },
      {
        id: "merge",
        label: "Merge",
        properties: { type: "process", append: true },
      },
      {
        id: "sheets1",
        label: "Google Sheets1",
        properties: { type: "start", sheet: "sheet" },
      },
      {
        id: "sheets2",
        label: "Google Sheets",
        properties: { type: "start", sheet: "sheet" },
      },
      {
        id: "http",
        label: "HTTP Request",
        properties: { type: "process", url: "https://www.google.com" },
      },
      { id: "code1", label: "Code", properties: { type: "end" } },
      { id: "code2", label: "Code1", properties: { type: "end" } },
    ],
    edges: [
      { from: "docs", to: "execute", label: "101 items" },
      { from: "execute", to: "edit", label: "101 items" },
      { from: "edit", to: "code1", label: "101 items" },
      { from: "code1", to: "code2" },
      { from: "sheets1", to: "merge", label: "Port 1" },
      { from: "sheets2", to: "merge", label: "Port 2" },
      { from: "merge", to: "http", label: "538 items" },
      { from: "http", to: "code1" },
    ],
    metadata: {
      creator: "Demo Graph System",
      version: "1.0.0",
      createdAt: "2025-05-11T16:30:00Z",
      tags: ["demo", "json", "graph", "visualization"],
      description:
        "A sample graph for testing the tabbed visualization component",
    },
  },
};

export default function DemoGraphTestPage() {
  return (
    <div className="p-8 flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Demo Graph Visualizations</h1>

      <div>
        <DemoGraphTab
          graphData={sampleGraphData}
          defaultVisualization="graph"
        />
      </div>
    </div>
  );
}
