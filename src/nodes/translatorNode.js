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
                <label className="node-label">
                    Source Language <span className="text-red-500">*</span>
                </label>
                <select
                    value={sourceLang}
                    onChange={(e) => setSourceLang(e.target.value)}
                    className="node-input nodrag"
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
                <label className="node-label">
                    Target Language <span className="text-red-500">*</span>
                </label>
                <select
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="node-input nodrag"
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
