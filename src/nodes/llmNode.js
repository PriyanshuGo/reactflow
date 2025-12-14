// llmNode.js
import { Handle, Position } from 'reactflow';
import { TbRobot } from 'react-icons/tb';

export const LLMNode = ({ id, data }) => {
  return (
    <div className="nowheel w-[280px] rounded-xl border border-indigo-200 bg-white shadow-sm">
      {/* Header */}
      <div className="rounded-t-xl border-b border-indigo-100 bg-indigo-50 px-3 py-2 flex items-center gap-2">
        <TbRobot className="text-indigo-600" size={16} />
        <span className="text-sm font-semibold text-indigo-900">LLM</span>
      </div>

      {/* Body */}
      <div className="px-3 py-3">
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
        className="!h-2.5 !w-2.5 !border-0 !bg-indigo-400"
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{ top: '67%' }}
        className="!h-2.5 !w-2.5 !border-0 !bg-indigo-400"
      />

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
        className="!h-2.5 !w-2.5 !border-0 !bg-indigo-400"
      />
    </div>
  );
};
