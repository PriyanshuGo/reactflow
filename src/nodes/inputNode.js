// inputNode.js
import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { FiDownload } from 'react-icons/fi';

import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'inputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <div className="node-container nowheel">
      {/* Header */}
      <div className="node-header">
        <FiDownload className="node-header-icon" size={16} />
        <span className="node-header-text">Input</span>
      </div>

      {/* Body */}
      <div className="node-body node-body-spaced">
        {/* Name Field */}
        <div>
          <label className="node-label">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="node-input nodrag"
            placeholder="input_name"
          />
        </div>

        {/* Type Field */}
        <div>
          <label className="node-label">
            Type <span className="text-red-500">*</span>
          </label>
          <select
            value={inputType}
            onChange={handleTypeChange}
            className="node-input nodrag"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </div>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
        className="node-handle"
      />
    </div>
  );
};
