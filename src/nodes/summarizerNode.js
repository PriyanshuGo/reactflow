// summarizerNode.js
import { useState } from 'react';
import { BaseNode } from '../BaseNode';
import { useStore } from '../store';

export const SummarizerNode = ({ id, data }) => {
    const [length, setLength] = useState(data?.length || 'medium');
    const [maxWords, setMaxWords] = useState(data?.maxWords || '100');
    const updateNodeField = useStore((state) => state.updateNodeField);
    const [currName, setCurrName] = useState(data?.summarizerName || id.replace('summarizer-', 'summarizer_'));

    const handleNameChange = (e) => {
        setCurrName(e.target.value);
        updateNodeField(id, 'summarizerName', e.target.value);
    };

    return (
        <BaseNode
            title="Summarizer"
            inputs={[{ id: `${id}-text` }]}
            outputs={[{ id: `${id}-summary` }]}
        >
            <div>
                <label className="node-label">
                    Name
                </label>
                <input
                    type="text"
                    value={currName}
                    onChange={handleNameChange}
                    className="node-input nodrag"
                />
            </div>
            {/* Summary Length */}
            {/* Summary Length */}
            <div>
                <label className="node-label">
                    Summary Length <span className="text-red-500">*</span>
                </label>
                <select
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="node-input nodrag"
                >
                    <option value="short">Short (~50 words)</option>
                    <option value="medium">Medium (~100 words)</option>
                    <option value="long">Long (~200 words)</option>
                    <option value="custom">Custom</option>
                </select>
            </div>

            {/* Max Words (shown when custom) */}
            {length === 'custom' && (
                <div>
                    <label className="node-label">
                        Max Words
                    </label>
                    <input
                        type="number"
                        value={maxWords}
                        onChange={(e) => setMaxWords(e.target.value)}
                        className="node-input nodrag"
                        placeholder="100"
                        min="10"
                    />
                </div>
            )}
        </BaseNode>
    );
};
