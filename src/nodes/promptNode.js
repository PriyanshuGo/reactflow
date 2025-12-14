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
                <label className="mb-1 block text-xs font-medium text-gray-700">
                    Template <span className="text-red-500">*</span>
                </label>
                <select
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    className="nodrag w-full rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs text-gray-800 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-300"
                >
                    <option value="instruction">Instruction</option>
                    <option value="qa">Question-Answer</option>
                    <option value="creative">Creative Writing</option>
                    <option value="code">Code Generation</option>
                </select>
            </div>

            {/* Custom Instruction */}
            <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                    Custom Instruction
                </label>
                <input
                    type="text"
                    value={customInstruction}
                    onChange={(e) => setCustomInstruction(e.target.value)}
                    className="nodrag w-full rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs text-gray-800 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-300"
                    placeholder="Add custom instructions..."
                />
            </div>
        </BaseNode>
    );
};
