// inputNode.js
import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { FiDownload } from 'react-icons/fi';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <div className="nowheel w-[280px] rounded-xl border border-indigo-200 bg-white shadow-sm">
      {/* Header */}
      <div className="rounded-t-xl border-b border-indigo-100 bg-indigo-50 px-3 py-2 flex items-center gap-2">
        <FiDownload className="text-indigo-600" size={16} />
        <span className="text-sm font-semibold text-indigo-900">Input</span>
      </div>

      {/* Body */}
      <div className="px-3 py-3 space-y-3">
        {/* Name Field */}
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="nodrag w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-300"
            placeholder="input_name"
          />
        </div>

        {/* Type Field */}
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            Type <span className="text-red-500">*</span>
          </label>
          <select
            value={inputType}
            onChange={handleTypeChange}
            className="nodrag w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-300"
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
        className="!h-2.5 !w-2.5 !border-0 !bg-indigo-400"
      />
    </div>
  );
};
