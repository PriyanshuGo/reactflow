// llmNode.js
import { TbRobot } from 'react-icons/tb';
import { useState } from 'react';
import { useStore } from '../store';
import { BaseNode } from '../BaseNode';

export const LLMNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currName, setCurrName] = useState(data?.llmName || id.replace('llm-', 'llm_'));

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'llmName', e.target.value);
  };

  return (
    <BaseNode
      
      title="LLM"
      icon={TbRobot}
      name={currName}
      onNameChange={handleNameChange}
      inputs={[
        { id: `${id}-system`, style: { top: '33%' } },
        { id: `${id}-prompt`, style: { top: '67%' } }
      ]}
      outputs={[
        { id: `${id}-response` }
      ]}
    >
      <p className="text-xs text-gray-600 leading-relaxed">
        This is a LLM.
      </p>
    </BaseNode>
  );
};
