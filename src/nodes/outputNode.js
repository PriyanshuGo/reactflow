// outputNode.js
import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { FiUpload } from 'react-icons/fi';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <div className="node-container nowheel">
      {/* Header */}
      <div className="node-header">
        <FiUpload className="node-header-icon" size={16} />
        <span className="node-header-text">Output</span>
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
            placeholder="output_name"
          />
        </div>

        {/* Type Field */}
        <div>
          <label className="node-label">
            Type <span className="text-red-500">*</span>
          </label>
          <select
            value={outputType}
            onChange={handleTypeChange}
            className="node-input nodrag"
          >
            <option value="Text">Text</option>
            <option value="Image">Image</option>
          </select>
        </div>
      </div>

      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
        className="node-handle"
      />
    </div>
  );
};
