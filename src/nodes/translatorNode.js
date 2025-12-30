// translatorNode.js
import { useState, useEffect } from 'react';
import { BaseNode } from '../BaseNode';
import { useStore } from '../store';

export const TranslatorNode = ({ id, data }) => {
    const [sourceLang, setSourceLang] = useState(data?.sourceLang || 'auto');
    const [targetLang, setTargetLang] = useState(data?.targetLang || 'en');
    const updateNodeField = useStore((state) => state.updateNodeField);
    const DEBOUNCE_DELAY = 300;
    const [currName, setCurrName] = useState(data?.name || id.replace('translator-', 'translator_'));

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
            updateNodeField(id, 'sourceLang', sourceLang);
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timeout);
    }, [sourceLang, id]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            updateNodeField(id, 'targetLang', targetLang);
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timeout);
    }, [targetLang, id]);

    return (
        <BaseNode

            title="Translator"
            name={currName}
            onNameChange={handleNameChange}
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
