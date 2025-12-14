import { useEffect, useRef, useState } from "react";
import { Handle, Position } from "reactflow";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [fontSize, setFontSize] = useState(12);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + "px";
  }, [currText]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault(); // stop browser zoom
        if (e.deltaY < 0) {
          setFontSize((s) => Math.min(s + 1, 18));
        } else if (e.deltaY > 0) {
          setFontSize((s) => Math.max(s - 1, 10));
        }
      }
    };

    textarea.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      textarea.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Ctrl + / - for font zoom
  const handleKeyDown = (e) => {
    if (e.ctrlKey) {
      if (e.key === "=" || e.key === "+") {
        e.preventDefault();
        setFontSize((s) => Math.min(s + 1, 18));
      }
      if (e.key === "-") {
        e.preventDefault();
        setFontSize((s) => Math.max(s - 1, 10));
      }
    }
  };



  return (
    <div className="nowheel w-[280px] rounded-xl border border-indigo-200 bg-white shadow-sm">
      {/* Header */}
      <div className="rounded-t-xl border-b border-indigo-100 bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-900">
        Text
      </div>

      {/* Body */}
      <div className="px-3 py-3">
        <label className="mb-1 block text-xs font-medium text-gray-700">
          Text <span className="text-red-500">*</span>
        </label>

        <div
          onWheel={(e) => e.stopPropagation()}  // allow scroll inside textarea
          onMouseDown={(e) => e.stopPropagation()} // prevent node drag
        >
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
            onKeyDown={handleKeyDown}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            placeholder="Type text here..."
            className="nodrag w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-800 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-300 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-transparent"
            style={{ fontSize, maxHeight: "160px" }}
          />
        </div>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="!h-2.5 !w-2.5 !border-0 !bg-indigo-400"
      />
    </div>
  );
};
