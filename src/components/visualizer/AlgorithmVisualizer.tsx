
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface AlgorithmVisualizerProps {
  step: any;
  description: string;
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({ 
  step, 
  description 
}) => {
  const renderVisualization = () => {
    if (!step || !step.type) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Select a step to visualize</p>
        </div>
      );
    }

    switch (step.type) {
      case 'array':
        return <ArrayVisualizer data={step.data} pointers={step.pointers || []} />;
      case 'graph':
        return <GraphVisualizer nodes={step.nodes} edges={step.edges} />;
      case 'tree':
        return <TreeVisualizer nodes={step.nodes} edges={step.edges} />;  
      case 'basic':
      default:
        return <BasicVisualizer value={step.value} />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-grow overflow-hidden">
        <CardContent className="p-4 h-full flex flex-col">
          <div className="bg-muted/50 p-2 rounded-md mb-4">
            <p className="text-sm">{description}</p>
          </div>
          <div className="flex-grow flex items-center justify-center">
            {renderVisualization()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Component for array-based visualizations
const ArrayVisualizer: React.FC<{
  data: any[];
  pointers: Array<{index: number; label: string; highlight?: boolean}>;
}> = ({ data, pointers }) => {
  // Handle different data types for arrays
  const renderArrayElement = (value: any, index: number) => {
    if (Array.isArray(value)) {
      // For 2D arrays or interval-like data
      return (
        <div className="flex flex-col items-center mx-1">
          <div 
            className={`
              text-xs px-2 py-1 rounded-md border
              ${pointers.some(p => p.index === index && p.highlight) 
                ? 'border-primary bg-primary/10' 
                : 'border-muted-foreground/30 bg-muted/30'
              }
            `}
          >
            [{value.join(',')}]
          </div>
        </div>
      );
    } else {
      // For regular 1D arrays
      return (
        <div 
          className={`
            w-12 h-12 flex items-center justify-center rounded border-2
            ${pointers.some(p => p.index === index && p.highlight) 
              ? 'border-primary bg-primary/10 dark:bg-primary/20' 
              : 'border-muted-foreground/30 bg-muted/30'
            }
          `}
        >
          {value}
        </div>
      );
    }
  };
  
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-center items-end mb-8 w-full flex-wrap">
        {data.map((value, index) => {
          const pointer = pointers.find(p => p.index === index);
          
          return (
            <div key={index} className="flex flex-col items-center mx-2 mb-4">
              <div className={`text-xs mb-1 ${pointer ? 'text-primary font-bold' : 'invisible'}`}>
                {pointer?.label || 'x'}
              </div>
              {renderArrayElement(value, index)}
              <div className="text-xs mt-1 text-muted-foreground">
                {Array.isArray(value) ? `interval ${index}` : `index: ${index}`}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="text-center text-sm text-muted-foreground">
        {pointers.length > 0 
          ? `Pointers: ${pointers.map(p => `${p.label} at index ${p.index}`).join(', ')}`
          : 'Array initialized'
        }
      </div>
    </div>
  );
};

// Component for graph-based visualizations
const GraphVisualizer: React.FC<{
  nodes: Array<{id: any; highlight?: boolean; visited?: boolean}>;
  edges: Array<{source: any; target: any; highlight?: boolean; visited?: boolean}>;
}> = ({ nodes, edges }) => {
  // Calculate positions in a circular layout
  const radius = 120;
  const center = { x: 150, y: 150 };
  const nodeRadius = 25;
  
  const getNodePosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI;
    return {
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle)
    };
  };
  
  const nodePositions = nodes.map((node, index) => ({
    ...node,
    ...getNodePosition(index, nodes.length)
  }));
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="300" height="300" viewBox="0 0 300 300">
        {/* Draw edges */}
        {edges.map((edge, index) => {
          const source = nodePositions.find(n => n.id === edge.source);
          const target = nodePositions.find(n => n.id === edge.target);
          
          if (!source || !target) return null;
          
          return (
            <line
              key={`edge-${index}`}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke={edge.visited 
                ? 'var(--primary)' 
                : edge.highlight 
                  ? 'var(--primary)' 
                  : 'var(--muted-foreground)'
              }
              strokeWidth={edge.highlight || edge.visited ? 3 : 1.5}
              strokeOpacity={edge.visited ? 0.7 : 1}
            />
          );
        })}
        
        {/* Draw nodes */}
        {nodePositions.map((node) => (
          <g key={`node-${node.id}`}>
            <circle
              cx={node.x}
              cy={node.y}
              r={nodeRadius}
              fill={node.highlight 
                ? 'var(--primary)' 
                : node.visited 
                  ? 'var(--accent)' 
                  : 'var(--muted)'
              }
              stroke={node.highlight || node.visited ? 'var(--primary)' : 'var(--border)'}
              strokeWidth={node.highlight ? 3 : 1.5}
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="14"
              fill={node.highlight ? 'var(--primary-foreground)' : 'var(--foreground)'}
            >
              {node.id}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

// Tree visualization component 
const TreeVisualizer: React.FC<{
  nodes: Array<{id: any; highlight?: boolean; visited?: boolean}>;
  edges: Array<{source: any; target: any; highlight?: boolean}>;
}> = ({ nodes, edges }) => {
  // Similar to graph visualization but with hierarchical layout
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <p className="text-muted-foreground">Tree visualization</p>
      </div>
    </div>
  );
};

// Basic fallback visualizer
const BasicVisualizer: React.FC<{value: string}> = ({ value }) => {
  return (
    <div className="text-center">
      <div className="text-xl font-bold mb-2">{value}</div>
      <p className="text-sm text-muted-foreground">This is a simplified visualization for this algorithm step.</p>
    </div>
  );
};

export default AlgorithmVisualizer;