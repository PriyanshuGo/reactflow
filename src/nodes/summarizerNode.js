// summarizerNode.js
import { useState } from 'react';
import { BaseNode } from '../BaseNode';

export const SummarizerNode = ({ id, data }) => {
    const [length, setLength] = useState(data?.length || 'medium');
    const [maxWords, setMaxWords] = useState(data?.maxWords || '100');

    return (
        <BaseNode
            title="Summarizer"
            inputs={[{ id: `${id}-text` }]}
            outputs={[{ id: `${id}-summary` }]}
        >
            {/* Summary Length */}
            <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                    Summary Length <span className="text-red-500">*</span>
                </label>
                <select
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="nodrag w-full rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs text-gray-800 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-300"
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
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                        Max Words
                    </label>
                    <input
                        type="number"
                        value={maxWords}
                        onChange={(e) => setMaxWords(e.target.value)}
                        className="nodrag w-full rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs text-gray-800 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-300"
                        placeholder="100"
                        min="10"
                    />
                </div>
            )}
        </BaseNode>
    );
};
