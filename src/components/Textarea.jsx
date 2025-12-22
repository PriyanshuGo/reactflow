import { useEffect, useRef, useState } from "react";

export const Textarea = ({
  value,
  onChange,
  placeholder = "",
  minFontSize = 10,
  maxFontSize = 18,
  maxHeight = 160,
  className = "",
}) => {
  const textareaRef = useRef(null);
  const [fontSize, setFontSize] = useState(12);

  // Auto-resize
  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      Math.min(textareaRef.current.scrollHeight, maxHeight) + "px";
  }, [value, maxHeight]);

  // Ctrl + mouse wheel zoom
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleWheel = (e) => {
      if (!e.ctrlKey) return;

      e.preventDefault();
      setFontSize((s) =>
        e.deltaY < 0
          ? Math.min(s + 1, maxFontSize)
          : Math.max(s - 1, minFontSize)
      );
    };

    textarea.addEventListener("wheel", handleWheel, { passive: false });
    return () => textarea.removeEventListener("wheel", handleWheel);
  }, [minFontSize, maxFontSize]);

  // Ctrl + / - zoom
  const handleKeyDown = (e) => {
    if (!e.ctrlKey) return;

    if (e.key === "=" || e.key === "+") {
      e.preventDefault();
      setFontSize((s) => Math.min(s + 1, maxFontSize));
    }

    if (e.key === "-") {
      e.preventDefault();
      setFontSize((s) => Math.max(s - 1, minFontSize));
    }
  };

  return (
    <div
      onWheel={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        placeholder={placeholder}
        className={`node-textarea nodrag scrollbar-thin ${className}`}
        style={{ fontSize, maxHeight }}
      />
    </div>
  );
};
