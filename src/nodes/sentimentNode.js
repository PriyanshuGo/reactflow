// sentimentNode.js
import { useState, useEffect } from 'react';
import { BaseNode } from '../BaseNode';
import { useStore } from '../store';

export const SentimentNode = ({ id, data }) => {
    const [detailed, setDetailed] = useState(data?.detailed || false);
    const [displayMode, setDisplayMode] = useState(data?.displayMode || 'both');
    const updateNodeField = useStore((state) => state.updateNodeField);
    const DEBOUNCE_DELAY = 300;
    const [currName, setCurrName] = useState(data?.name || id.replace('sentiment-', 'sentiment_'));

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
            updateNodeField(id, 'detailed', detailed);
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timeout);
    }, [detailed, id]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            updateNodeField(id, 'displayMode', displayMode);
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timeout);
    }, [displayMode, id]);

    return (
        <BaseNode

            title="Sentiment Analysis"
            name={currName}
            onNameChange={handleNameChange}
            inputs={[{ id: `${id}-text` }]}
            outputs={[{ id: `${id}-result` }]}
        >
            {/* Display Mode */}
            <div>
                <label className="node-label">
                    Display Mode <span className="text-red-500">*</span>
                </label>
                <select
                    value={displayMode}
                    onChange={(e) => setDisplayMode(e.target.value)}
                    className="node-input nodrag"
                >
                    <option value="label">Label Only</option>
                    <option value="score">Score Only</option>
                    <option value="both">Label + Score</option>
                </select>
            </div>

            {/* Detailed Analysis */}
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id={`${id}-detailed`}
                    checked={detailed}
                    onChange={(e) => setDetailed(e.target.checked)}
                    className="node-checkbox nodrag"
                />
                <label htmlFor={`${id}-detailed`} className="text-xs font-medium text-gray-700 cursor-pointer">
                    Detailed Analysis
                </label>
            </div>
        </BaseNode>
    );
};
