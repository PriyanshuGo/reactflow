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
                <label className="node-label">
                    Format Type <span className="text-red-500">*</span>
                </label>
                <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="node-input nodrag"
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
                    className="node-checkbox nodrag"
                />
                <label htmlFor={`${id}-pretty`} className="text-xs font-medium text-gray-700 cursor-pointer">
                    Pretty Print
                </label>
            </div>
        </BaseNode>
    );
};
