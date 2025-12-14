import { DraggableNode } from './draggableNode';
import {
  FiDownload,
  FiUpload,
  FiFileText,
  FiGlobe,
  FiEdit3,
  FiMinimize2,
  FiHeart,
  FiCode
} from 'react-icons/fi';
import {
  TbRobot,
  TbMath,
  TbClock,
  TbBinaryTree
} from 'react-icons/tb';
import { BiDiamond } from 'react-icons/bi';

export const PipelineToolbar = () => {
  return (
    <div className="bg-white border-b border-slate-200">
      {/* Header */}
      <div className="border-b border-slate-200 px-6 py-3">
        <h3 className="text-base font-bold ">
          Nodes
        </h3>
      </div>

      {/* Horizontal Scrolling Node Cards */}
      <div className="overflow-x-auto overflow-y-hidden px-6 py-4">
        <div className="flex gap-4 pb-2">
          <DraggableNode type="customInput" label="Input" icon={<FiDownload />} />
          <DraggableNode type="llm" label="LLM" icon={<TbRobot />} />
          <DraggableNode type="customOutput" label="Output" icon={<FiUpload />} />
          <DraggableNode type="text" label="Text" icon={<FiFileText />} />
          <DraggableNode type="prompt" label="Prompt" icon={<FiEdit3 />} />
          <DraggableNode type="summarizer" label="Summarizer" icon={<FiMinimize2 />} />
          <DraggableNode type="translator" label="Translator" icon={<FiGlobe />} />
          <DraggableNode type="sentiment" label="Sentiment" icon={<FiHeart />} />
          <DraggableNode type="format" label="Format" icon={<FiCode />} />
        </div>
      </div>
    </div>
  );
};
