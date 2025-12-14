// translatorNode.js
import { useState } from 'react';
import { BaseNode } from '../BaseNode';

export const TranslatorNode = ({ id, data }) => {
    const [sourceLang, setSourceLang] = useState(data?.sourceLang || 'auto');
    const [targetLang, setTargetLang] = useState(data?.targetLang || 'en');

    return (
        <BaseNode
            title="Translator"
            inputs={[{ id: `${id}-text` }]}
            outputs={[{ id: `${id}-translated` }]}
        >
            {/* Source Language */}
            <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                    Source Language <span className="text-red-500">*</span>
                </label>
                <select
                    value={sourceLang}
                    onChange={(e) => setSourceLang(e.target.value)}
                    className="nodrag w-full rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs text-gray-800 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-300"
                >
                    <option value="auto">Auto-detect</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                    <option value="ja">Japanese</option>
                </select>
            </div>

            {/* Target Language */}
            <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                    Target Language <span className="text-red-500">*</span>
                </label>
                <select
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="nodrag w-full rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs text-gray-800 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-300"
                >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                    <option value="ja">Japanese</option>
                </select>
            </div>
        </BaseNode>
    );
};
