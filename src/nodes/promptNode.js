// promptNode.js
import { useState, useEffect } from 'react';
import { BaseNode } from '../BaseNode';
import { useStore } from '../store';

export const PromptNode = ({ id, data }) => {
    const [template, setTemplate] = useState(data?.template || 'instruction');
    const [customInstruction, setCustomInstruction] = useState(data?.customInstruction || '');
    const updateNodeField = useStore((state) => state.updateNodeField);
    const DEBOUNCE_DELAY = 300;
    const [currName, setCurrName] = useState(data?.name || id.replace('prompt-', 'prompt_'));

    const handleNameChange = (e) => {
        setCurrName(e.target.value);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            updateNodeField(id, 'name', currName);
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timeout);
    }, [currName, id]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            updateNodeField(id, 'template', template);
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timeout);
    }, [template, id]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            updateNodeField(id, 'customInstruction', customInstruction);
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timeout);
    }, [customInstruction, id]);

    return (
        <BaseNode

            title="Prompt Builder"
            name={currName}
            onNameChange={handleNameChange}
            inputs={[{ id: `${id}-input` }]}
            outputs={[{ id: `${id}-prompt` }]}
        >
            {/* Template Type */}
            <div>
                <label className="node-label">
                    Template <span className="text-red-500">*</span>
                </label>
                <select
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    className="node-input nodrag"
                >
                    <option value="instruction">Instruction</option>
                    <option value="qa">Question-Answer</option>
                    <option value="creative">Creative Writing</option>
                    <option value="code">Code Generation</option>
                </select>
            </div>

            {/* Custom Instruction */}
            <div>
                <label className="node-label">
                    Custom Instruction
                </label>
                <input
                    type="text"
                    value={customInstruction}
                    onChange={(e) => setCustomInstruction(e.target.value)}
                    className="node-input nodrag"
                    placeholder="Add custom instructions..."
                />
            </div>
        </BaseNode>
    );
};
