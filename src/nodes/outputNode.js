// outputNode.js
import { useState, useEffect } from 'react';
import { FiUpload } from 'react-icons/fi';

import { useStore } from '../store';
import { BaseNode } from '../BaseNode';

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const DEBOUNCE_DELAY = 300;
  const [currName, setCurrName] = useState(data?.name || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateNodeField(id, 'name', currName);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeout);
  }, [currName, id]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateNodeField(id, 'outputType', outputType);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeout);
  }, [outputType, id]);

  return (
    <BaseNode

      title="Output"
      icon={FiUpload}
      name={currName}
      onNameChange={handleNameChange}
      inputs={[{ id: `${id}-value` }]}
    >
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
    </BaseNode>
  );
};
