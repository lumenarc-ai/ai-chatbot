"use client";

import { useMemo, useEffect, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  MarkerType,
  addEdge,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { LockIcon } from "./icons";

interface GraphViewerProps {
  data: any;
}

export function GraphViewer({ data }: GraphViewerProps) {
  // Debug log to help diagnose issues
  useEffect(() => {
    console.log("GraphViewer data:", data);
    if (data?.edges) {
      console.log(`Found ${data.edges.length} edges in the data`);
    }
  }, [data]);

  // Convert the graph data to React Flow format
  const initialNodes: Node[] = useMemo(() => {
    // Handle empty or invalid data
    if (!data) return [];

    // Extract nodes from data, handling different possible structures
    const nodes = data.nodes || [];

    if (!nodes.length) {
      console.log("No nodes found in data:", data);
      return [];
    }

    // Create a more complex layout based on node types and connections
    // This is a simplified layout algorithm - in a real app, you might want to use a more sophisticated layout
    const nodesByType: Record<string, any[]> = {};

    // Group nodes by type
    nodes.forEach((node: any) => {
      // Handle different property structures that might come from the MCP server
      // For ResponseIQ data, use the 'type' property directly
      const type = node.type || node.properties?.type || "default";

      if (!nodesByType[type]) {
        nodesByType[type] = [];
      }
      nodesByType[type].push(node);
    });

    // Calculate positions based on node type
    const positions: Record<string, { x: number; y: number }> = {};

    // Position initial nodes on the left
    if (nodesByType["initial_node"]) {
      nodesByType["initial_node"].forEach((node, i) => {
        positions[node.id] = { x: 100, y: 100 + i * 150 };
      });
    }

    // Position terminal nodes on the right
    if (nodesByType["terminal_node"]) {
      nodesByType["terminal_node"].forEach((node, i) => {
        positions[node.id] = { x: 800, y: 100 + i * 150 };
      });
    }

    // Position page nodes in the middle
    if (nodesByType["page"]) {
      nodesByType["page"].forEach((node, i) => {
        positions[node.id] = {
          x: 400 + (i % 3) * 200,
          y: 100 + Math.floor(i / 3) * 150,
        };
      });
    }

    // Position any remaining nodes
    Object.values(nodesByType)
      .flat()
      .forEach((node) => {
        if (!positions[node.id]) {
          // Find a free spot
          const index = Object.keys(positions).length;
          positions[node.id] = {
            x: 200 + (index % 3) * 200,
            y: 100 + Math.floor(index / 3) * 150,
          };
        }
      });

    return nodes.map((node: any) => {
      // For ResponseIQ data, use the node properties directly
      const nodeType = node.type || node.properties?.type || "default";
      const position = node.position ||
        positions[node.id] || {
          x: Math.random() * 500,
          y: Math.random() * 300,
        };

      return {
        id: node.id,
        type: "custom",
        position,
        data: {
          label: node.title || node.id,
          type: nodeType,
          requires_login: node.requires_login,
          actions: node.actions || [],
          url: node.url,
          metadata: node.metadata || {},
          // Include original node data for reference
          originalNode: node,
        },
        style: {
          background: "#ffffff",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "10px",
          width: 150,
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        },
      };
    });
  }, [data]);

  // Create edges based on the connections defined in the edges array
  const initialEdges: Edge[] = useMemo(() => {
    // Handle empty or invalid data
    if (!data) return [];

    // Check if there are explicit edges defined
    const explicitEdges = data.edges || [];
    if (explicitEdges.length) {
      // Create a map of nodes by ID for quick lookup
      const nodeMap = new Map(
        (data.nodes || []).map((node: any) => [node.id, node])
      );

      // Debug log to help diagnose edge issues
      console.log("Processing edges:", explicitEdges);

      return explicitEdges
        .map((edge: any, index: number) => {
          // Only use the from and to fields from the edge data
          const source = edge.from || edge.source;
          const target = edge.to || edge.target;

          if (!source || !target) {
            console.warn("Edge missing source or target:", edge);
            return null;
          }

          // Debug log for each edge
          console.log(`Creating edge: ${source} -> ${target}`);

          // Get the source node to determine action count
          const sourceNode = nodeMap.get(source) as any;
          const actionCount = sourceNode?.actions?.length || 0;

          if (!sourceNode) {
            console.warn(
              `Source node not found for edge: ${source} -> ${target}`,
              edge
            );
            debugger;
          }
          // Create a label showing the action count or use the edge's label if available
          const label =
            edge.label ||
            (actionCount > 0 ? `${actionCount} items` : undefined);

          // Create a unique ID for the edge
          const edgeId = edge.id || `edge-${index}-${source}-${target}`;

          // Check if we already have an edge with this source
          // If so, we need to create a unique sourceHandle
          const sourceHandleId =
            edge.sourceHandle ||
            findSourceHandle(explicitEdges, source, target, index);

          return {
            id: edgeId,
            source,
            target,
            // Include sourceHandle for edges with the same source but different targets
            sourceHandle: sourceHandleId,
            // Include targetHandle if specified in the edge data
            targetHandle: edge.targetHandle,
            type: "default", // Explicitly set the type to default
            label,
            animated: false,
            style: {
              stroke: "#88be9c",
              strokeWidth: 2,
              opacity: 0.8,
            },
            labelStyle: {
              fill: "#4b7e5b",
              fontWeight: 500,
              fontSize: 12,
              background: "#f0f9f4",
              padding: "2px 4px",
              borderRadius: "4px",
            },
            labelBgStyle: {
              fill: "#f0f9f4",
              fillOpacity: 0.8,
            },
            labelBgPadding: [4, 2],
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: "#88be9c",
              width: 20,
              height: 20,
            },
          };
        })
        .filter(Boolean) as Edge[];
    }

    // If no explicit edges defined, create a simple connected graph
    // This is a fallback that should rarely be used since we expect edges to be defined
    const nodes = data.nodes || [];
    if (nodes.length > 1) {
      console.warn("No edges found in data, creating a simple connected graph");

      // Sort nodes by type to create a logical flow
      const sortedNodes = [...nodes].sort((a, b) => {
        const typeOrder: Record<string, number> = {
          initial_node: 0,
          page: 1,
          terminal_node: 2,
          default: 3,
        };
        const aOrder = typeOrder[a.type] ?? typeOrder.default;
        const bOrder = typeOrder[b.type] ?? typeOrder.default;
        return aOrder - bOrder;
      });

      // Create an empty array for edges
      const edges: Edge[] = [];

      // Connect nodes in sequence
      for (let i = 0; i < sortedNodes.length - 1; i++) {
        const source = sortedNodes[i];
        const target = sortedNodes[i + 1];

        // Create an edge with the count of actions as the label
        const sourceNode = source as any;
        const actionCount = sourceNode?.actions?.length || 0;
        const label = actionCount > 0 ? `${actionCount} items` : undefined;

        // Check if we need a unique sourceHandle for this edge
        const sourceHandleId = findSourceHandleForFallback(edges, source.id);

        edges.push({
          id: `edge-fallback-${i}-${source.id}-${target.id}`,
          source: source.id,
          target: target.id,
          sourceHandle: sourceHandleId,
          type: "default", // Explicitly set the type to default
          label,
          animated: false,
          style: {
            stroke: "#88be9c",
            strokeWidth: 2,
            opacity: 0.8,
          },
          labelStyle: {
            fill: "#4b7e5b",
            fontWeight: 500,
            fontSize: 12,
            background: "#f0f9f4",
            padding: "2px 4px",
            borderRadius: "4px",
          },
          labelBgStyle: {
            fill: "#f0f9f4",
            fillOpacity: 0.8,
          },
          labelBgPadding: [4, 2],
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#88be9c",
            width: 20,
            height: 20,
          },
        });
      }

      return edges;
    }

    // Return an empty array if no edges were created
    return [];
  }, [data]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Custom node component
  const nodeTypes = useMemo(
    () => ({
      custom: CustomNode,
    }),
    []
  );

  // Log the final nodes and edges for debugging
  useEffect(() => {
    console.log("Final nodes:", nodes);
    console.log("Final edges:", edges);
  }, [nodes, edges]);

  // Update node positions after initial layout
  useEffect(() => {
    setNodes(nodes);
    setEdges(edges);
    // if (nodes.length > 0) {
    //   // After initial render, update node positions to improve layout
    //   setTimeout(() => {
    //     setNodes((nds) =>
    //       nds.map((node) => ({
    //         ...node,
    //         // Add any node-specific updates here if needed
    //         data: {
    //           ...node.data,
    //           // You can update node data here if needed
    //         },
    //       }))
    //     );
    //     console.log("Nodes updated with setNodes");
    //   }, 100);
    // }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle node click events
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    console.log("Node clicked:", node);

    // Example of updating a node when clicked
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === node.id) {
          // Toggle a highlighted state on the clicked node
          return {
            ...n,
            style: {
              ...n.style,
              borderWidth: n.style?.borderWidth === 3 ? 1 : 3,
              borderColor:
                n.style?.borderColor === "#22c55e" ? "#ddd" : "#22c55e",
            },
            data: {
              ...n.data,
              isSelected: !n.data?.isSelected,
            },
          };
        }
        return n;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add a connection handler to allow users to create new connections
  const onConnect = useCallback((params: any) => {
    console.log("Creating new connection:", params);
    setEdges((eds: Edge[]) =>
      addEdge(
        {
          ...params,
          type: "default",
          animated: false,
          style: {
            stroke: "#88be9c",
            strokeWidth: 2,
            opacity: 0.8,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#88be9c",
          },
        },
        eds
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{ width: "100%", height: "500px" }}
      className="bg-white rounded-lg border border-green-200"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        minZoom={0.5}
        maxZoom={2}
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
        className="bg-green-50"
        connectionLineStyle={{ stroke: "#88be9c", strokeWidth: 2 }}
        defaultEdgeOptions={{
          style: { stroke: "#88be9c", strokeWidth: 2 },
          type: "default",
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#88be9c",
          },
        }}
      >
        <Background color="#e0f2e9" gap={16} size={1} />
        <Controls
          position="bottom-right"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "4px",
          }}
        />
      </ReactFlow>
    </div>
  );
}

// Custom node component
function CustomNode({ data, id }: { data: any; id: string }) {
  // Ensure data is an object
  const nodeData = data || {};

  // Get icon based on node type
  const getNodeIcon = (type: string) => {
    switch (type) {
      case "initial_node":
        return "🔍"; // Magnifying glass for initial nodes
      case "terminal_node":
        return "🏁"; // Checkered flag for terminal nodes
      case "page":
        // Different icons based on the URL or title
        if (nodeData.url?.includes("docs")) return "🔍"; // Filter icon for docs
        if (
          nodeData.url?.includes("execute") ||
          nodeData.label?.includes("Execute")
        )
          return "⚡"; // Lightning for execute
        if (nodeData.url?.includes("edit") || nodeData.label?.includes("Edit"))
          return "✏️"; // Pencil for edit
        if (
          nodeData.url?.includes("merge") ||
          nodeData.label?.includes("Merge")
        )
          return "🔄"; // Merge icon
        if (nodeData.url?.includes("http") || nodeData.label?.includes("HTTP"))
          return "🌐"; // Globe for HTTP
        if (nodeData.url?.includes("code") || nodeData.label?.includes("Code"))
          return "{}"; // Code brackets
        if (
          nodeData.url?.includes("sheets") ||
          nodeData.label?.includes("Sheets")
        )
          return "📊"; // Spreadsheet
        return "📄"; // Default page icon
      default:
        return "📦"; // Default icon
    }
  };

  const nodeType = nodeData.type || "default";
  const nodeColor = getNodeColor(nodeType);
  const nodeIcon = getNodeIcon(nodeType);
  const requiresLogin = nodeData.requires_login || false;

  // Count actions if available in the data
  const actionCount = nodeData.actions?.length || 0;
  const actionText = actionCount > 0 ? `${actionCount} items` : "";

  // Get section from metadata if available
  const section = nodeData.metadata?.section || "";

  // Determine if this node should have multiple handles
  const isMultiHandleNode = nodeType === "page" || nodeType === "initial_node";

  // Define handle styles
  const handleStyle = {
    width: 10,
    height: 10,
    border: "1px solid #88be9c",
    background: "#f0f9f4",
    borderRadius: "50%",
  };

  return (
    <div
      className="custom-node"
      style={{
        border: `1px solid ${nodeColor}`,
        borderRadius: "8px",
        padding: "8px",
        background: "#ffffff",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        position: "relative", // For positioning the lock icon
      }}
    >
      {/* Node header with icon and label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          borderBottom: `1px solid ${nodeColor}20`,
          paddingBottom: "4px",
        }}
      >
        <div
          style={{
            background: `${nodeColor}20`,
            color: nodeColor,
            width: "24px",
            height: "24px",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
          }}
        >
          {nodeIcon}
        </div>
        <div
          style={{
            fontWeight: 500,
            color: "#2d3748",
            fontSize: "14px",
            flex: 1,
          }}
        >
          {nodeData.label || id}
        </div>

        {/* Lock icon for nodes that require login */}
        {requiresLogin && (
          <div
            style={{
              color: "#64748b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LockIcon size={14} />
          </div>
        )}
      </div>

      {/* Node content - show relevant information */}
      <div style={{ fontSize: "12px", color: "#4a5568" }}>
        {actionText && <div>{actionText}</div>}
        {section && <div style={{ opacity: 0.7 }}>{section}</div>}
        {nodeData.url && (
          <div style={{ opacity: 0.7, fontSize: "10px", marginTop: "2px" }}>
            {nodeData.url.startsWith("http") ? "GET " : ""}
            {nodeData.url.replace(/^https?:\/\//, "").substring(0, 20)}
            {nodeData.url.length > 20 ? "..." : ""}
          </div>
        )}
      </div>

      {/* Add multiple source handles for nodes that need them */}
      {isMultiHandleNode && (
        <>
          {/* Handle a - top right */}
          <Handle
            type="source"
            position={Position.Right}
            id="a"
            style={{
              ...handleStyle,
              top: "25%",
            }}
          />

          {/* Handle b - bottom right */}
          <Handle
            type="source"
            position={Position.Right}
            id="b"
            style={{
              ...handleStyle,
              top: "75%",
            }}
          />

          {/* Default target handle - left side */}
          <Handle
            type="target"
            position={Position.Left}
            style={{
              ...handleStyle,
            }}
          />
        </>
      )}
    </div>
  );
}

// Helper function to get node color based on type
function getNodeColor(type: string): string {
  const colors: Record<string, string> = {
    initial_node: "#22c55e", // green-500
    page: "#3b82f6", // blue-500
    terminal_node: "#ef4444", // red-500
    default: "#64748b", // slate-500
  };

  return colors[type] || colors.default;
}

// Helper function to find or create a unique sourceHandle for edges with the same source
function findSourceHandle(
  edges: any[],
  source: string,
  target: string,
  currentIndex: number
): string {
  // Count how many edges already exist with this source
  const existingEdgesFromSource = edges
    .slice(0, currentIndex)
    .filter(
      (edge) =>
        (edge.from || edge.source) === source &&
        (edge.from || edge.source) !== target
    );

  // Create a unique handle ID based on the count
  // This ensures each edge from the same source gets a different handle
  // We use letters (a, b, c, etc.) to match the example code pattern
  if (existingEdgesFromSource.length > 0) {
    const handleLetter = String.fromCharCode(
      97 + existingEdgesFromSource.length
    ); // 97 = 'a'
    return handleLetter;
  }

  // First edge from this source, use 'a' as the handle
  return "a";
}

// Helper function for fallback edges
function findSourceHandleForFallback(edges: Edge[], sourceId: string): string {
  // Count how many edges already exist with this source
  const existingEdgesFromSource = edges.filter(
    (edge) => edge.source === sourceId
  );

  // Create a unique handle ID based on the count
  if (existingEdgesFromSource.length > 0) {
    const handleLetter = String.fromCharCode(
      97 + existingEdgesFromSource.length
    ); // 97 = 'a'
    return handleLetter;
  }

  // First edge from this source, use 'a' as the handle
  return "a";
}
