// llmNode.js
import { TbRobot } from 'react-icons/tb';
import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { BaseNode } from '../BaseNode';

export const LLMNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const DEBOUNCE_DELAY = 300;
  const [currName, setCurrName] = useState(data?.name || id.replace('llm-', 'llm_'));

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateNodeField(id, 'name', currName);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeout);
  }, [currName, id]);

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
