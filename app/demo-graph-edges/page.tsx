"use client";

import { useState } from "react";
import { DemoGraphTab } from "@/components/demo-graph-tab";
import responseiqData from "@/fixtures/demo-graph/responseiq";

export default function DemoGraphEdgesPage() {
  const [data] = useState(responseiqData);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Graph Visualization with Edge Connections</h1>
      <p className="mb-4">
        This page demonstrates the graph visualization with edge connections based on the
        <code>from</code> and <code>to</code> fields in the edges array.
      </p>
      <DemoGraphTab graphData={data} defaultVisualization="graph" />
    </div>
  );
}
