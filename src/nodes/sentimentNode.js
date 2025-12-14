// sentimentNode.js
import { useState } from 'react';
import { BaseNode } from '../BaseNode';

export const SentimentNode = ({ id, data }) => {
    const [detailed, setDetailed] = useState(data?.detailed || false);
    const [displayMode, setDisplayMode] = useState(data?.displayMode || 'both');

    return (
        <BaseNode
            title="Sentiment Analysis"
            inputs={[{ id: `${id}-text` }]}
            outputs={[{ id: `${id}-result` }]}
        >
            {/* Display Mode */}
            <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                    Display Mode <span className="text-red-500">*</span>
                </label>
                <select
                    value={displayMode}
                    onChange={(e) => setDisplayMode(e.target.value)}
                    className="nodrag w-full rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs text-gray-800 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-300"
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
                    className="nodrag w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor={`${id}-detailed`} className="text-xs font-medium text-gray-700">
                    Detailed Analysis
                </label>
            </div>
        </BaseNode>
    );
};
