"use client";

import { useMemo, useEffect, useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
  addEdge,
  Handle,
  Position,
  Panel,
  ConnectionLineType,
} from "@xyflow/react";
import type { Node, Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { LockIcon } from "./icons";
import dagre from "@dagrejs/dagre";

// Node dimensions for layout calculations - should match the actual rendered size
const NODE_WIDTH = 200; // Increased to account for padding and content
const NODE_HEIGHT = 150; // Increased to account for all content and handles

// Spacing between nodes to prevent overlap
const NODE_SPACING_X = 150; // Increased horizontal spacing to prevent overlap
const NODE_SPACING_Y = 100; // Increased vertical spacing to prevent overlap

// Helper function to calculate layout using dagre
const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction = "LR" // Changed default to horizontal layout (LR)
) => {
  const isHorizontal = direction === "LR";
  const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

  // Configure the layout algorithm with spacing parameters
  dagreGraph.setGraph({
    rankdir: direction,
    nodesep: NODE_SPACING_X, // Horizontal spacing between nodes
    ranksep: NODE_SPACING_Y, // Vertical spacing between nodes
    edgesep: 50, // Spacing between edges
    marginx: 20, // Margin on the x-axis
    marginy: 20, // Margin on the y-axis
  });

  // Set nodes in the dagre graph
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  });

  // Set edges in the dagre graph
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Calculate the layout
  dagre.layout(dagreGraph);

  // Apply the layout to the nodes
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    return {
      ...node,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      // Adding a padding factor to further prevent overlap
      position: {
        x: nodeWithPosition.x - NODE_WIDTH / 2,
        y: nodeWithPosition.y - NODE_HEIGHT / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

interface GraphViewerProps {
  data: any;
}

// Action Popup Component
interface ActionPopupProps {
  actions: any[];
  position: { x: number; y: number };
  onClose: () => void;
  nodeGroups?: Record<
    string,
    { label: string; actions: any[]; isFollowing?: boolean }
  >;
  showFastForward?: boolean;
  onFastForward?: () => void;
  followingActionsEnabled?: boolean;
}

function ActionPopup({
  actions,
  position,
  onClose,
  nodeGroups,
  showFastForward,
  onFastForward,
  followingActionsEnabled,
}: ActionPopupProps) {
  // State to track collapsed sections
  const [collapsedSections, setCollapsedSections] = useState<
    Record<string, boolean>
  >({});

  // Toggle collapse for a specific section
  const toggleSection = useCallback((nodeId: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  }, []);

  // Toggle all sections at once
  const toggleAllSections = useCallback(
    (collapsed: boolean) => {
      if (!nodeGroups) return;

      const newState: Record<string, boolean> = {};
      Object.keys(nodeGroups).forEach((nodeId) => {
        newState[nodeId] = collapsed;
      });

      setCollapsedSections(newState);
    },
    [nodeGroups]
  );

  // Determine if we should show actions grouped by node
  const showGrouped = nodeGroups && Object.keys(nodeGroups).length > 0;

  // Check if all sections are collapsed
  const allCollapsed =
    showGrouped &&
    Object.keys(nodeGroups || {}).length > 0 &&
    Object.keys(nodeGroups || {}).every((nodeId) => collapsedSections[nodeId]);

  if (!actions || actions.length === 0) return null;

  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-lg border border-green-200 overflow-hidden action-popup"
      style={{
        left: position.x,
        top: position.y,
        width: "350px",
        maxHeight: "500px",
        transform: "translate(-50%, 0)",
        marginTop: "0",
      }}
    >
      <div className="flex justify-between items-center bg-green-50 px-4 py-2 border-b border-green-200">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-green-800">
            {showGrouped
              ? `Actions from ${Object.keys(nodeGroups).length} node${
                  Object.keys(nodeGroups).length > 1 ? "s" : ""
                }`
              : "Actions"}
          </h3>
          <button
            className="bg-green-600 hover:bg-green-700 text-white rounded-full size-6 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1"
            title="Play all actions"
            onClick={() => console.log("Play actions clicked")}
          >
            <div
              className="flex items-center justify-center"
              style={{ marginLeft: "1px" }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 2.5L13 8L3 13.5V2.5Z" fill="currentColor" />
              </svg>
            </div>
          </button>

          {/* Fast forward button - only show when there's a single selected node with following nodes */}
          {showFastForward && (
            <button
              className={`${
                followingActionsEnabled
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white rounded-full size-6 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 ml-1`}
              title={
                followingActionsEnabled
                  ? "Following actions enabled"
                  : "Enable following actions"
              }
              onClick={onFastForward}
            >
              <div className="flex items-center justify-center">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 2.5L8 8L2 13.5V2.5Z" fill="currentColor" />
                  <path d="M9 2.5L15 8L9 13.5V2.5Z" fill="currentColor" />
                </svg>
              </div>
            </button>
          )}

          {/* Collapse/Expand all button - only show when there are multiple node groups */}
          {showGrouped && Object.keys(nodeGroups || {}).length > 1 && (
            <button
              className="text-gray-600 hover:text-gray-800 rounded-full size-6 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 ml-1"
              title={
                allCollapsed ? "Expand all sections" : "Collapse all sections"
              }
              onClick={() => toggleAllSections(!allCollapsed)}
            >
              <div className="flex items-center justify-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {allCollapsed ? (
                    <>
                      {/* Expand icon */}
                      <path
                        d="M4 9h16M4 15h16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </>
                  ) : (
                    <>
                      {/* Collapse icon */}
                      <path
                        d="M4 6h16M4 12h16M4 18h16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </>
                  )}
                </svg>
              </div>
            </button>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          ✕
        </button>
      </div>
      <div className="p-2 overflow-y-auto max-h-[450px]">
        {showGrouped
          ? // Render actions grouped by node
            Object.entries(nodeGroups).map(
              ([nodeId, { label, actions: nodeActions, isFollowing }]) => (
                <div key={nodeId} className="mb-4">
                  <div
                    className={`font-medium text-sm mb-2 px-2 py-1 rounded-md flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors ${
                      isFollowing && !followingActionsEnabled
                        ? "text-gray-500 bg-gray-200"
                        : "text-gray-700 bg-gray-100"
                    }`}
                    onClick={() => toggleSection(nodeId)}
                  >
                    <span className="flex items-center">
                      <span className="mr-2 text-gray-500">
                        {collapsedSections[nodeId] ? "▶" : "▼"}
                      </span>
                      {label}
                      {isFollowing && (
                        <span className="ml-2 text-xs bg-gray-300 text-gray-600 px-1.5 py-0.5 rounded">
                          Following
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-gray-500">
                      {nodeActions.length} action
                      {nodeActions.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  {!collapsedSections[nodeId] &&
                    nodeActions.map((action, index) => (
                      <ActionItem
                        key={`${nodeId}-${index}`}
                        action={action}
                        followingActionsEnabled={followingActionsEnabled}
                      />
                    ))}
                </div>
              )
            )
          : // Render actions without grouping
            actions.map((action, index) => (
              <ActionItem
                key={index}
                action={action}
                followingActionsEnabled={followingActionsEnabled}
              />
            ))}
      </div>
    </div>
  );
}

// Extracted action item component for reuse
function ActionItem({
  action,
  followingActionsEnabled,
}: {
  action: any;
  followingActionsEnabled?: boolean;
}) {
  // Check if this is a following action that should be disabled
  const isDisabled = action.isFollowing && !followingActionsEnabled;

  return (
    <div
      className={`mb-2 p-3 rounded-md border transition-colors ${
        isDisabled
          ? "bg-gray-100 border-gray-200 opacity-60"
          : "bg-gray-50 border-gray-100 hover:border-green-200"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`p-1.5 rounded-md ${
            isDisabled
              ? "bg-gray-200 text-gray-500"
              : "bg-green-100 text-green-700"
          }`}
        >
          {getActionIcon(action.action)}
        </div>
        <div className="flex-1">
          <div
            className={`font-medium text-sm capitalize ${
              isDisabled ? "text-gray-500" : ""
            }`}
          >
            {action.action.replace(/_/g, " ")}
            {isDisabled && (
              <span className="ml-2 text-xs bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded">
                Following
              </span>
            )}
          </div>

          {/* Show delay if present */}
          {action.delay > 0 && (
            <div
              className={`text-xs mt-1 flex items-center gap-1 ${
                isDisabled ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <span>⏱️</span> Delay: {action.delay}ms
            </div>
          )}

          {/* Show target details */}
          {action.target && (
            <div className="mt-2 text-xs">
              {action.target.value && (
                <div
                  className={`truncate ${
                    isDisabled
                      ? "text-gray-500"
                      : "text-blue-600 hover:text-blue-800"
                  } transition-colors`}
                >
                  {action.target.value.startsWith("http") ? (
                    <a
                      href={action.target.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={isDisabled ? "" : "hover:underline"}
                    >
                      {action.target.value}
                    </a>
                  ) : (
                    action.target.value
                  )}
                </div>
              )}
              {action.target.selector && (
                <div
                  className={`mt-1 font-mono text-[10px] p-1 rounded overflow-x-auto ${
                    isDisabled
                      ? "bg-gray-200 text-gray-400"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {action.target.selector}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to get an icon for the action type
function getActionIcon(type: string) {
  switch (type?.toLowerCase()) {
    case "go_to":
    case "navigate":
    case "redirect":
      return "🔗"; // Link icon for navigation actions

    case "scroll_to_section":
    case "scroll":
      return "⬇️"; // Down arrow for scrolling actions

    case "click":
      return "👆"; // Pointing finger for click actions

    case "input":
    case "type":
    case "fill":
      return "⌨️"; // Keyboard for input actions

    case "submit":
    case "form_submit":
      return "📤"; // Outbox for submit actions

    case "wait":
    case "delay":
      return "⏱️"; // Timer for wait/delay actions

    case "api":
    case "request":
    case "fetch":
      return "🔄"; // Refresh icon for API/request actions

    case "validate":
    case "check":
      return "✅"; // Checkmark for validation actions

    case "select":
    case "choose":
      return "📋"; // Clipboard for selection actions

    case "hover":
      return "👉"; // Pointing right for hover actions

    default:
      return "⚡"; // Lightning bolt for other actions
  }
}

export function GraphViewer({ data }: GraphViewerProps) {
  // State for action popup
  const [actionPopup, setActionPopup] = useState<{
    visible: boolean;
    actions: any[];
    position: { x: number; y: number };
    nodeGroups?: Record<
      string,
      { label: string; actions: any[]; isFollowing?: boolean }
    >;
    showFastForward?: boolean;
  }>({
    visible: false,
    actions: [],
    position: { x: 0, y: 0 },
  });

  // State to track selected nodes
  const [selectedNodes, setSelectedNodes] = useState<Node[]>([]);

  // Debug log to help diagnose issues
  useEffect(() => {
    console.log("GraphViewer data:", data);
    if (data?.edges) {
      console.log(`Found ${data.edges.length} edges in the data`);
    }
  }, [data]);

  // Add a click handler to close the popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionPopup.visible) {
        // Check if the click was outside the popup
        const popupElement = document.querySelector(".action-popup");
        const target = event.target as Element;
        if (popupElement && target && !popupElement.contains(target)) {
          setActionPopup((prev) => ({ ...prev, visible: false }));
        }
      }
    };

    // Add the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [actionPopup.visible]);

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

  // Apply initial layout to nodes
  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(() => {
    if (initialNodes.length === 0)
      return { nodes: initialNodes, edges: initialEdges };

    // Apply the dagre layout to the initial nodes and edges
    return getLayoutedElements(initialNodes, initialEdges);
  }, [initialNodes, initialEdges]);

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

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

  // Function to apply layout in different directions
  const onLayout = useCallback(
    (direction: "TB" | "LR") => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges, setNodes, setEdges]
  );

  // Handle node click events
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    console.log("Node clicked:", node);

    // Close any open action popup
    setActionPopup((prev) => ({ ...prev, visible: false }));

    // Toggle selection state of the clicked node
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === node.id) {
          // Toggle a highlighted state on the clicked node
          const newIsSelected = !n.data?.isSelected;
          return {
            ...n,
            style: {
              ...n.style,
              borderWidth: newIsSelected ? 3 : 1,
              borderColor: newIsSelected ? "#22c55e" : "#ddd",
            },
            data: {
              ...n.data,
              isSelected: newIsSelected,
            },
          };
        }
        return n;
      })
    );

    // Update the selectedNodes array
    setSelectedNodes((prev) => {
      const isCurrentlySelected = node.data?.isSelected;
      if (isCurrentlySelected) {
        // If it was selected, remove it
        return prev.filter((n) => n.id !== node.id);
      } else {
        // If it wasn't selected, add it
        return [...prev, node];
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle edge click events
  const onEdgeClick = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      console.log("Edge clicked:", edge);

      // Find the source node to get its actions
      const sourceNode = data?.nodes?.find(
        (node: any) => node.id === edge.source
      );
      const actions = sourceNode?.actions || [];

      if (actions.length > 0) {
        // Show the action popup at the click position
        setActionPopup({
          visible: true,
          actions,
          position: { x: event.clientX, y: event.clientY },
        });
      } else {
        // If no actions, close any open popup
        setActionPopup((prev) => ({ ...prev, visible: false }));
      }
    },
    [data?.nodes]
  );

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

  // Function to find all following nodes from a given node
  const findFollowingNodes = useCallback(
    (startNodeId: string) => {
      // Create a map of nodes by ID for quick lookup
      const nodeMap = new Map(nodes.map((node) => [node.id, node]));

      // Create a set to track visited nodes to avoid cycles
      const visited = new Set<string>();

      // Create a map to store following nodes and their depth
      const followingNodes: Node[] = [];

      // Queue for BFS traversal
      const queue: { nodeId: string; depth: number }[] = [
        { nodeId: startNodeId, depth: 0 },
      ];

      while (queue.length > 0) {
        const { nodeId, depth } = queue.shift()!;

        // Skip the start node and already visited nodes
        if (depth === 0 || visited.has(nodeId)) {
          if (depth === 0) {
            visited.add(nodeId);
          }

          // Find all edges where this node is the source
          const outgoingEdges = edges.filter((edge) => edge.source === nodeId);

          // Add target nodes to the queue
          outgoingEdges.forEach((edge) => {
            const targetId = edge.target;
            if (!visited.has(targetId)) {
              visited.add(targetId);
              const targetNode = nodeMap.get(targetId);
              if (targetNode) {
                followingNodes.push(targetNode);
                queue.push({ nodeId: targetId, depth: depth + 1 });
              }
            }
          });
        }
      }

      return followingNodes;
    },
    [nodes, edges]
  );

  // Function to collect actions from all selected nodes
  const getActionsFromSelectedNodes = useCallback(
    (includeFollowing = false) => {
      if (selectedNodes.length === 0) return { actions: [], nodeGroups: {} };

      // Create a map to group actions by node
      const nodeGroups: Record<
        string,
        { label: string; actions: any[]; isFollowing?: boolean }
      > = {};

      // Collect actions from each selected node
      selectedNodes.forEach((node) => {
        const nodeData = node.data || {};
        const nodeLabel = (nodeData.label as string) || node.id;
        const actions = (nodeData.actions || []) as any[];

        if (actions.length > 0) {
          nodeGroups[node.id] = {
            label: nodeLabel,
            actions: actions,
          };
        }
      });

      // If we have a single selected node and includeFollowing is true, add following nodes
      if (selectedNodes.length === 1 && includeFollowing) {
        const startNode = selectedNodes[0];
        const followingNodes = findFollowingNodes(startNode.id);

        // Add actions from following nodes
        followingNodes.forEach((node) => {
          const nodeData = node.data || {};
          const nodeLabel = (nodeData.label as string) || node.id;
          const actions = (nodeData.actions || []) as any[];

          if (actions.length > 0) {
            nodeGroups[node.id] = {
              label: nodeLabel,
              actions: actions,
              isFollowing: true, // Mark as a following node
            };
          }
        });
      }

      // Flatten all actions for the actions array
      const allActions = Object.entries(nodeGroups).flatMap(
        ([_, { actions, isFollowing }]) => {
          // If the node is a following node, mark each action
          if (isFollowing) {
            return actions.map((action) => ({ ...action, isFollowing: true }));
          }
          return actions;
        }
      );

      return { actions: allActions, nodeGroups };
    },
    [selectedNodes, findFollowingNodes]
  );

  // State to track if following actions are enabled
  const [followingActionsEnabled, setFollowingActionsEnabled] = useState(false);

  // Handle play button click
  const handlePlayButtonClick = useCallback(
    (event: React.MouseEvent) => {
      // Include following nodes if there's only one selected node
      const includeFollowing = selectedNodes.length === 1;
      const result = getActionsFromSelectedNodes(includeFollowing);
      const actions = result.actions;
      const nodeGroups = result.nodeGroups;

      if (actions.length > 0) {
        // Reset the following actions state
        setFollowingActionsEnabled(false);

        // Show the action popup below the play button
        const buttonRect = (
          event.currentTarget as HTMLElement
        ).getBoundingClientRect();
        setActionPopup({
          visible: true,
          actions,
          nodeGroups,
          position: {
            x: buttonRect.left + buttonRect.width / 2,
            y: buttonRect.bottom + 10,
          },
          showFastForward:
            includeFollowing &&
            Object.values(nodeGroups).some((group) => group.isFollowing),
        });
      }
    },
    [getActionsFromSelectedNodes, selectedNodes]
  );

  return (
    <div
      style={{ width: "100%", height: "700px" }} // Increased height for better graph display
      className="bg-white rounded-lg border border-green-200"
    >
      {/* Render the action popup if visible */}
      {actionPopup.visible && (
        <ActionPopup
          actions={actionPopup.actions}
          position={actionPopup.position}
          nodeGroups={actionPopup.nodeGroups}
          showFastForward={actionPopup.showFastForward}
          followingActionsEnabled={followingActionsEnabled}
          onFastForward={() => setFollowingActionsEnabled(true)}
          onClose={() =>
            setActionPopup((prev) => ({ ...prev, visible: false }))
          }
        />
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{
          padding: 0.1, // Reduced padding to show more of the graph
          includeHiddenNodes: true,
          minZoom: 0.6, // Set minimum zoom for fit view
          maxZoom: 1.2, // Set maximum zoom for fit view
        }}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }} // Decreased default zoom to show more nodes
        minZoom={0.3} // Lower minimum zoom to allow seeing more of the graph
        maxZoom={3} // Higher maximum zoom for detailed inspection
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
        className="bg-green-50"
        connectionLineStyle={{ stroke: "#88be9c", strokeWidth: 2 }}
        connectionLineType={ConnectionLineType.SmoothStep}
        defaultEdgeOptions={{
          style: { stroke: "#88be9c", strokeWidth: 2 },
          type: "default",
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#88be9c",
          },
        }}
      >
        {/* Play button for selected nodes */}
        {selectedNodes.length > 0 && (
          <Panel position="top-left" className="p-2">
            <button
              className="bg-green-600 hover:bg-green-700 text-white rounded-full size-10 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1"
              title={`Play actions from ${selectedNodes.length} selected node${
                selectedNodes.length > 1 ? "s" : ""
              }`}
              onClick={handlePlayButtonClick}
            >
              <div
                className="flex items-center justify-center"
                style={{ marginLeft: "2px" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 2.5L13 8L3 13.5V2.5Z" fill="currentColor" />
                </svg>
              </div>
            </button>
          </Panel>
        )}
        <Panel position="top-right" className="p-2">
          <div className="flex gap-2">
            <button
              className="bg-white px-3 py-1 text-sm rounded border border-green-300 hover:bg-green-50"
              onClick={() => onLayout("TB")}
            >
              Vertical Layout
            </button>
            <button
              className="bg-green-50 px-3 py-1 text-sm rounded border border-green-500 hover:bg-green-100 font-medium"
              onClick={() => onLayout("LR")}
            >
              Horizontal Layout
            </button>
          </div>
        </Panel>
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
    width: 12,
    height: 12,
    border: "2px solid #88be9c",
    background: "#f0f9f4",
    borderRadius: "50%",
    zIndex: 10,
    boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
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
              top: "30%",
              right: -6,
            }}
          />

          {/* Handle b - bottom right */}
          <Handle
            type="source"
            position={Position.Right}
            id="b"
            style={{
              ...handleStyle,
              top: "70%",
              right: -6,
            }}
          />

          {/* Default target handle - left side */}
          <Handle
            type="target"
            position={Position.Left}
            style={{
              ...handleStyle,
              left: -6,
              top: "50%",
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
