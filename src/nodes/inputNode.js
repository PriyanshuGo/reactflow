// inputNode.js
import { useState, useEffect } from 'react';
import { FiDownload } from 'react-icons/fi';

import { useStore } from '../store';
import { BaseNode } from '../BaseNode';

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const DEBOUNCE_DELAY = 300;
  const [currName, setCurrName] = useState(data?.name || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateNodeField(id, 'name', currName);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeout);
  }, [currName, id]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateNodeField(id, 'inputType', inputType);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeout);
  }, [inputType, id]);

  return (
    <BaseNode
      title="Input"
      icon={FiDownload}
      name={currName}
      onNameChange={handleNameChange}
      outputs={[{ id: `${id}-value` }]}
    >
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
    </BaseNode>
  );
};
