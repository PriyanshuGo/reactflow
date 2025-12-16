// BaseNode.js
import { Handle, Position } from 'reactflow';

export const BaseNode = ({
  title,
  icon: Icon,
  name,
  onNameChange,
  inputs = [],
  outputs = [],
  children,
}) => {
  return (
    <div className="node-container nowheel">
      {/* Header */}
      <div className="node-header">
        {Icon && <Icon className="node-header-icon" size={16} />}
        <span className="node-header-text">{title}</span>
      </div>

      {/* Body */}
      <div className="node-body node-body-spaced">
        {/* Name (always required) */}
        <div>
          <label className="node-label">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={onNameChange}
            className="node-input nodrag"
            placeholder={`${title.toLowerCase()}_name`}
          />
        </div>

        {children}
      </div>

      {/* Input Handles */}
      {inputs.map((input) => (
        <Handle
          key={input.id}
          id={input.id}
          type="target"
          position={input.position || Position.Left}
          style={input.style}
          className="node-handle"
        />
      ))}

      {/* Output Handles */}
      {outputs.map((output) => (
        <Handle
          key={output.id}
          id={output.id}
          type="source"
          position={output.position || Position.Right}
          style={output.style}
          className="node-handle"
        />
      ))}
    </div>
  );
};
