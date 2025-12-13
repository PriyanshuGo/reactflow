// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="bg-card border-r border-border h-full p-3">
            <h3 className="text-sm font-semibold mb-3">Nodes</h3>
            <div className="flex flex-wrap gap-2">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type="math" label="Math" />
                <DraggableNode type="condition" label="Condition" />
                <DraggableNode type="api" label="API" />
                <DraggableNode type="delay" label="Delay" />
                <DraggableNode type="embedding" label="Embedding" />
            </div>
        </div>

    );
};
