// promptNode.js
import { useState } from 'react';
import { BaseNode } from '../BaseNode';

export const PromptNode = ({ id, data }) => {
    const [template, setTemplate] = useState(data?.template || 'instruction');
    const [customInstruction, setCustomInstruction] = useState(data?.customInstruction || '');

    return (
        <BaseNode
            title="Prompt Builder"
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
