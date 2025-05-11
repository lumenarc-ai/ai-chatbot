'use client';

import { useEffect, useState } from 'react';
import cx from 'classnames';
import { toast } from 'sonner';
import { JSONViewer } from './json-viewer';
import { CopyIcon } from './icons';
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

import { VisualizationType } from './demo-graph-tab';

interface DemoGraphData {
  title?: string;
  description?: string;
  data?: any;
  visualizationType?: VisualizationType;
  // Add any other properties that might be returned by the get_graph tool
}

// Sample data for when no data is provided
const SAMPLE: DemoGraphData = {
  title: 'Sample Graph',
  description: 'This is a sample graph visualization',
  visualizationType: 'graph',
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
  },
};

export function DemoGraphCanvas({
  graphData = SAMPLE,
}: {
  graphData?: DemoGraphData;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Extract title and description from the graph data
  const title = graphData.title || 'Demo Graph';
  const description = graphData.description || 'Graph visualization';
  const visualizationType = graphData.visualizationType || 'graph';
  const data = graphData.data || {};

  // Render the appropriate visualization based on the type
  const renderVisualization = () => {
    switch (visualizationType) {
      case 'json':
        return <JSONViewer data={data} />;
      case 'graph':
      default:
        return (
          <div className="bg-white rounded-lg p-4 h-40 flex items-center justify-center border border-green-200">
            <div className="text-green-500 text-center">
              {isMobile ? (
                <p>Graph visualization (mobile view)</p>
              ) : (
                <p>Graph visualization would render here</p>
              )}
            </div>
          </div>
        );
    }
  };

  // Function to copy the entire JSON data
  const handleCopyData = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      toast.success('JSON data copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy data');
      console.error('Copy failed:', error);
    }
  };

  return (
    <div
      className={cx(
        'flex flex-col gap-4 rounded-2xl p-4 skeleton-bg max-w-[800px]',
        'bg-green-100 border border-green-200'
      )}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <div
            className={cx(
              'size-10 rounded-full skeleton-div',
              'bg-green-300'
            )}
          />
          <div className="text-2xl font-medium text-green-800">
            {title}
          </div>
        </div>

        {/* Copy button at top right - only show for JSON visualization */}
        {visualizationType === 'json' && (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="p-2 size-8 text-green-700 hover:text-green-800 bg-green-100 hover:bg-green-200 border border-green-300"
                  variant="outline"
                  onClick={handleCopyData}
                >
                  <CopyIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy JSON data</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <div className="text-green-700 text-sm">
        {description}
      </div>

      {/* Render the appropriate visualization */}
      {renderVisualization()}
    </div>
  );
}
