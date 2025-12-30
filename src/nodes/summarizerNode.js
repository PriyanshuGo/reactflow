// summarizerNode.js
import { useState, useEffect } from 'react';
import { BaseNode } from '../BaseNode';
import { useStore } from '../store';

export const SummarizerNode = ({ id, data }) => {
    const [length, setLength] = useState(data?.length || 'medium');
    const [maxWords, setMaxWords] = useState(data?.maxWords || '100');
    const updateNodeField = useStore((state) => state.updateNodeField);
    const DEBOUNCE_DELAY = 300;
    const [currName, setCurrName] = useState(data?.name || id.replace('summarizer-', 'summarizer_'));

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
            updateNodeField(id, 'length', length);
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timeout);
    }, [length, id]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            updateNodeField(id, 'maxWords', maxWords);
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timeout);
    }, [maxWords, id]);

    return (
        <BaseNode

            title="Summarizer"
            name={currName}
            onNameChange={handleNameChange}
            inputs={[{ id: `${id}-text` }]}
            outputs={[{ id: `${id}-summary` }]}
        >
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
