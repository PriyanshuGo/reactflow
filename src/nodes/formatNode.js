// formatNode.js
import { useState, useEffect } from 'react';
import { BaseNode } from '../BaseNode';
import { useStore } from '../store';

export const FormatNode = ({ id, data }) => {
    const [format, setFormat] = useState(data?.format || 'text');
    const [prettyPrint, setPrettyPrint] = useState(data?.prettyPrint || false);
    const updateNodeField = useStore((state) => state.updateNodeField);
    const DEBOUNCE_DELAY = 300;
    const [currName, setCurrName] = useState(data?.name || id.replace('format-', 'format_'));

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
            updateNodeField(id, 'format', format);
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timeout);
    }, [format, id]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            updateNodeField(id, 'prettyPrint', prettyPrint);
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timeout);
    }, [prettyPrint, id]);

    return (
        <BaseNode

            title="Format Output"
            name={currName}
            onNameChange={handleNameChange}
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
