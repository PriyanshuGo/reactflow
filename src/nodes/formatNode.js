// formatNode.js
import { useState } from 'react';
import { BaseNode } from '../BaseNode';

export const FormatNode = ({ id, data }) => {
    const [format, setFormat] = useState(data?.format || 'text');
    const [prettyPrint, setPrettyPrint] = useState(data?.prettyPrint || false);

    return (
        <BaseNode
            title="Format Output"
            inputs={[{ id: `${id}-input` }]}
            outputs={[{ id: `${id}-output` }]}
        >
            {/* Format Type */}
            <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                    Format Type <span className="text-red-500">*</span>
                </label>
                <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="nodrag w-full rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs text-gray-800 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-300"
                >
                    <option value="text">Plain Text</option>
                    <option value="json">JSON</option>
                    <option value="markdown">Markdown</option>
                    <option value="html">HTML</option>
                    <option value="csv">CSV</option>
                </select>
            </div>

            {/* Pretty Print */}
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id={`${id}-pretty`}
                    checked={prettyPrint}
                    onChange={(e) => setPrettyPrint(e.target.checked)}
                    className="nodrag w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor={`${id}-pretty`} className="text-xs font-medium text-gray-700">
                    Pretty Print
                </label>
            </div>
        </BaseNode>
    );
};
