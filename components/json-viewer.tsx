"use client";

import { useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useCopyToClipboard } from "usehooks-ts";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { CopyIcon, ArrowUpIcon } from "./icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface JSONViewerProps {
  data: any;
}

export function JSONViewer({ data }: JSONViewerProps) {
  const [_, copyToClipboard] = useCopyToClipboard();
  const jsonContainerRef = useRef<HTMLDivElement>(null);
  const jsonString = JSON.stringify(data, null, 2);

  // Extract metadata
  const nodeCount = data?.nodes?.length || 0;
  const edgeCount = data?.edges?.length || 0;
  const metadata = data?.metadata || {};

  const handleCopy = async () => {
    await copyToClipboard(jsonString);
    toast.success("JSON copied to clipboard!");
  };

  const scrollToTop = () => {
    if (jsonContainerRef.current) {
      jsonContainerRef.current.scrollTop = 0;
    }
  };

  const scrollToBottom = () => {
    if (jsonContainerRef.current) {
      jsonContainerRef.current.scrollTop =
        jsonContainerRef.current.scrollHeight;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Metadata section */}
      <div className="bg-white rounded-lg p-4 border border-green-200">
        <h3 className="text-green-800 font-medium mb-2">Metadata</h3>
        <div className="text-sm text-green-700">
          <p>Nodes: {nodeCount}</p>
          <p>Edges: {edgeCount}</p>

          {Object.keys(metadata).length > 0 && (
            <>
              <p className="mt-2 mb-1">Additional metadata:</p>
              <ul className="list-disc pl-5">
                {Object.entries(metadata).map(([key, value]) => (
                  <li key={key}>
                    {key}:{" "}
                    {typeof value === "object"
                      ? JSON.stringify(value)
                      : String(value)}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* JSON syntax highlighting */}
      <div className="bg-white rounded-lg border border-green-200 overflow-hidden">
        {/* Scroll buttons in top right corner */}
        <div className="p-1 border-b border-green-200 bg-green-50 flex justify-end gap-2">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="py-1 px-2 h-6 text-green-700 hover:text-green-800 bg-green-100 hover:bg-green-200 border border-green-300"
                  variant="outline"
                  size="sm"
                  onClick={scrollToTop}
                >
                  <ArrowUpIcon size={14} />
                  <span className="ml-1 text-xs">Top</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Scroll to top</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="py-1 px-2 h-6 text-green-700 hover:text-green-800 bg-green-100 hover:bg-green-200 border border-green-300"
                  variant="outline"
                  size="sm"
                  onClick={scrollToBottom}
                >
                  <div className="rotate-180">
                    <ArrowUpIcon size={14} />
                  </div>
                  <span className="ml-1 text-xs">Bottom</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Scroll to bottom</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* JSON content */}
        <div ref={jsonContainerRef} className="max-h-[400px] overflow-auto">
          <SyntaxHighlighter
            language="json"
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: "1rem",
              borderRadius: 0,
            }}
          >
            {jsonString}
          </SyntaxHighlighter>
        </div>

        {/* Bottom toolbar with copy button */}
        <div className="p-2 border-t border-green-200 bg-green-50 flex justify-end items-center">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="py-1 px-2 h-fit text-green-700 hover:text-green-800 bg-green-100 hover:bg-green-200 border border-green-300"
                  variant="outline"
                  onClick={handleCopy}
                >
                  <CopyIcon />
                  <span className="ml-2">Copy JSON</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy JSON to clipboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
