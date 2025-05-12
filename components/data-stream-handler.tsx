"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef } from "react";
import { artifactDefinitions, ArtifactKind } from "./artifact";
import { Suggestion } from "@/lib/db/schema";
import { initialArtifactData, useArtifact } from "@/hooks/use-artifact";
import { useDemoGraphData } from "@/hooks/use-demo-graph-data";

export type DataStreamDelta = {
  type:
    | "text-delta"
    | "code-delta"
    | "sheet-delta"
    | "image-delta"
    | "title"
    | "id"
    | "suggestion"
    | "clear"
    | "finish"
    | "kind";
  content: string | Suggestion;
};

export function DataStreamHandler({ id }: { id: string }) {
  const { data: dataStream } = useChat({ id });
  const { artifact, setArtifact, setMetadata } = useArtifact();
  const { updateGraphData } = useDemoGraphData();
  const lastProcessedIndex = useRef(-1);

  // Track tool calls to update the demo graph
  const toolCallsRef = useRef<Record<string, any>>({});

  // Process tool calls from the data stream
  useEffect(() => {
    if (!dataStream?.length) return;

    const newDeltas = dataStream.slice(lastProcessedIndex.current + 1);
    lastProcessedIndex.current = dataStream.length - 1;

    // Process each delta in the data stream
    for (const item of newDeltas) {
      // Check if this is a tool call
      if (item.type === "tool-call") {
        const toolCall = item.content as any;

        // Store the tool call in our ref
        if (toolCall.name && toolCall.id) {
          toolCallsRef.current[toolCall.id] = {
            name: toolCall.name,
            args: toolCall.args || {},
          };
        }
      }

      // Check if this is a tool call result
      if (item.type === "tool-result") {
        const toolResult = item.content as any;

        if (toolResult.id && toolCallsRef.current[toolResult.id]) {
          const toolName = toolCallsRef.current[toolResult.id].name;

          // Check if this is a demoGraph tool (all MCP tools from demo-graph service)
          if (
            toolName &&
            (toolName === "get_graph" ||
              toolName.startsWith("demo_graph_") ||
              toolName.includes("graph"))
          ) {
            // Update the demo graph data with the tool result
            try {
              const resultData =
                typeof toolResult.result === "string"
                  ? JSON.parse(toolResult.result)
                  : toolResult.result;

              updateGraphData(toolName, resultData);
            } catch (error) {
              console.error("Error processing demo graph tool result:", error);
            }
          }
        }
      }
    }

    // Process artifact-related deltas
    (newDeltas as DataStreamDelta[]).forEach((delta: DataStreamDelta) => {
      const artifactDefinition = artifactDefinitions.find(
        (artifactDefinition) => artifactDefinition.kind === artifact.kind
      );

      if (artifactDefinition?.onStreamPart) {
        artifactDefinition.onStreamPart({
          streamPart: delta,
          setArtifact,
          setMetadata,
        });
      }

      setArtifact((draftArtifact) => {
        if (!draftArtifact) {
          return { ...initialArtifactData, status: "streaming" };
        }

        switch (delta.type) {
          case "id":
            return {
              ...draftArtifact,
              documentId: delta.content as string,
              status: "streaming",
            };

          case "title":
            return {
              ...draftArtifact,
              title: delta.content as string,
              status: "streaming",
            };

          case "kind":
            return {
              ...draftArtifact,
              kind: delta.content as ArtifactKind,
              status: "streaming",
            };

          case "clear":
            return {
              ...draftArtifact,
              content: "",
              status: "streaming",
            };

          case "finish":
            return {
              ...draftArtifact,
              status: "idle",
            };

          default:
            return draftArtifact;
        }
      });
    });
  }, [dataStream, setArtifact, setMetadata, artifact, updateGraphData]);

  return null;
}
