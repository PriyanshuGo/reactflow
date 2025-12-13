import { Handle, Position } from "reactflow";

export const BaseNode = ({
  title,
  inputs = [],
  outputs = [],
  children,
}) => {
  return (
    <div className="w-[260px] rounded-lg border border-gray-200 bg-white shadow-sm relative">

      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50 rounded-t-lg">
        <span className="text-sm font-medium text-gray-800">
          {title}
        </span>
      </div>

      {/* Body */}
      <div className="px-3 py-3 space-y-3 text-xs text-gray-700">
        {children}
      </div>

      {/* Input handles (LEFT) */}
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}
          className="!w-2.5 !h-2.5 !bg-gray-400 !border-0"
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
          className="!w-2.5 !h-2.5 !bg-gray-400 !border-0"
          style={{ top: 50 + index * 24 }}
        />
      ))}
    </div>
  );
};
