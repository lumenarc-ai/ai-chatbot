'use client';

import { DemoGraphTab } from '@/components/demo-graph-tab';

// Sample data with nodes, edges, and metadata
const sampleGraphData = {
  title: 'Graph Visualization Example',
  description: 'This demonstrates the tabbed graph visualization component',
  data: {
    nodes: [
      { id: 'A', label: 'Node A', properties: { type: 'start', color: 'green' } },
      { id: 'B', label: 'Node B', properties: { type: 'process', color: 'blue' } },
      { id: 'C', label: 'Node C', properties: { type: 'end', color: 'red' } },
      { id: 'D', label: 'Node D', properties: { type: 'process', color: 'yellow' } },
    ],
    edges: [
      { from: 'A', to: 'B', label: 'connects to', weight: 1 },
      { from: 'B', to: 'C', label: 'connects to', weight: 2 },
      { from: 'B', to: 'D', label: 'connects to', weight: 3 },
      { from: 'D', to: 'C', label: 'connects to', weight: 4 },
    ],
    metadata: {
      creator: 'Demo Graph System',
      version: '1.0.0',
      createdAt: '2025-05-11T16:30:00Z',
      tags: ['demo', 'json', 'graph', 'visualization'],
      description: 'A sample graph for testing the tabbed visualization component'
    }
  }
};

// Sample data with fewer nodes for a simpler graph
const simpleGraphData = {
  title: 'Simple Graph Example',
  description: 'A simpler graph with fewer nodes and edges',
  data: {
    nodes: [
      { id: 'A', label: 'Node A' },
      { id: 'B', label: 'Node B' },
      { id: 'C', label: 'Node C' },
    ],
    edges: [
      { from: 'A', to: 'B' },
      { from: 'B', to: 'C' },
      { from: 'C', to: 'A' },
    ],
  }
};

export default function DemoGraphTestPage() {
  return (
    <div className="p-8 flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Demo Graph Visualizations</h1>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Tabbed Visualization (Default: JSON)</h2>
        <DemoGraphTab graphData={sampleGraphData} defaultVisualization="json" />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Tabbed Visualization (Default: Graph)</h2>
        <DemoGraphTab graphData={simpleGraphData} defaultVisualization="graph" />
      </div>
    </div>
  );
}
