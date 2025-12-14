// llmNode.js
import { Handle, Position } from 'reactflow';
import { TbRobot } from 'react-icons/tb';

export const LLMNode = ({ id, data }) => {
  return (
    <div className="node-container nowheel">
      {/* Header */}
      <div className="node-header">
        <TbRobot className="node-header-icon" size={16} />
        <span className="node-header-text">LLM</span>
      </div>

      {/* Body */}
      <div className="node-body">
        <p className="text-xs text-gray-600 leading-relaxed">
          This is a LLM.
        </p>
      </div>

      {/* Input Handles */}
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        style={{ top: '33%' }}
        className="node-handle"
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{ top: '67%' }}
        className="node-handle"
      />

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
        className="node-handle"
      />
    </div>
  );
};
