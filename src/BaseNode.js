import { Handle, Position } from "reactflow";

export const BaseNode = ({
  title,
  inputs = [],
  outputs = [],
  children,
}) => {
  return (
    <div className="node-container relative">
      {/* Header */}
      <div className="node-header justify-between">
        <span className="node-header-text">
          {title}
        </span>
      </div>

      {/* Body */}
      <div className="node-body space-y-3 text-xs text-gray-700">
        {children}
      </div>

      {/* Input handles (LEFT) */}
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}
          className="node-handle"
          style={{ top: 50 + index * 24 }}
        />
      ))}

      {/* Output handles (RIGHT) */}
      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}
          className="node-handle"
          style={{ top: 50 + index * 24 }}
        />
      ))}
    </div>
  );
};
