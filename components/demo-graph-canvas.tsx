'use client';

import { useEffect, useState } from 'react';
import cx from 'classnames';

interface DemoGraphData {
  title?: string;
  description?: string;
  data?: any;
  // Add any other properties that might be returned by the get_graph tool
}

// Sample data for when no data is provided
const SAMPLE: DemoGraphData = {
  title: 'Sample Graph',
  description: 'This is a sample graph visualization',
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

  return (
    <div
      className={cx(
        'flex flex-col gap-4 rounded-2xl p-4 skeleton-bg max-w-[500px]',
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
      </div>

      <div className="text-green-700 text-sm">
        {description}
      </div>

      {/* Placeholder for actual graph visualization */}
      <div className="bg-white rounded-lg p-4 h-40 flex items-center justify-center border border-green-200">
        <div className="text-green-500 text-center">
          {isMobile ? (
            <p>Graph visualization (mobile view)</p>
          ) : (
            <p>Graph visualization would render here</p>
          )}
        </div>
      </div>
    </div>
  );
}
