// llmNode.js
import { Handle, Position } from 'reactflow';
import { TbRobot } from 'react-icons/tb';
import { useState } from 'react';
import { useStore } from '../store';

export const LLMNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currName, setCurrName] = useState(data?.llmName || id.replace('llm-', 'llm_'));

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'llmName', e.target.value);
  };

  return (
    <div className="node-container nowheel">
      {/* Header */}
      <div className="node-header">
        <TbRobot className="node-header-icon" size={16} />
        <span className="node-header-text">LLM</span>
      </div>

      {/* Body */}
      <div className="node-body">
        <div style={{ marginBottom: '10px' }}>
          <label className="node-label">
            Name
          </label>
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="node-input nodrag"
          />
        </div>
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
