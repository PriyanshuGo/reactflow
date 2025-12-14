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
    <div className="node-container nowheel">
      {/* Header */}
      <div className="node-header">
        <div className="node-header-text">
          Text
        </div>
      </div>

      {/* Body */}
      <div className="node-body">
        <label className="node-label">
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
            className="node-textarea nodrag scrollbar-thin"
            style={{ fontSize, maxHeight: "160px" }}
          />
        </div>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="node-handle"
      />
    </div>
  );
};
