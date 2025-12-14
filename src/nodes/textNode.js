import { useEffect, useRef, useState } from "react";
import { useStore } from "../store";
import { VariableTextarea } from "../components/VariableTextarea";
import { BaseNode } from "../BaseNode";

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const nodes = useStore((state) => state.nodes);

  const edges = useStore(state => state.edges);
  const onEdgesChange = useStore(state => state.onEdgesChange);
  const onConnect = useStore(state => state.onConnect);


  const [currName, setCurrName] = useState(data?.textName || id.replace('text-', 'text_'));
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [fontSize, setFontSize] = useState(12);
  const [variableHandles, setVariableHandles] = useState([]);
  const [invalidVars, setInvalidVars] = useState([]);

  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + "px";
  }, [currText]);

  // Extract variables and update handles
  useEffect(() => {
    const regex = /\{\{(.*?)\}\}/g;
    const matches = new Set();
    let match;
    while ((match = regex.exec(currText)) !== null) {
      const varName = match[1].trim();
      if (varName) matches.add(varName);
    }
    setVariableHandles(Array.from(matches));
  }, [currText]);

  // Handle Zoom
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
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
  }, [textareaRef.current]);

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

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'textName', e.target.value);
  };

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    updateNodeField(id, 'text', e.target.value);
  };

  // Options for autocomplete: all other nodes
  const options = nodes
    .filter(n => n.id !== id)
    .map(n => ({
      id: n.id,
      type: n.type,
      label: n.data?.label || n.data?.textName || n.data?.id || n.id
    }));

  // Construct inputs and outputs for BaseNode
  const inputs = variableHandles.map((handleId) => ({
    id: handleId,
    title: handleId,
    className: invalidVars.includes(handleId) ? 'bg-red-500' : ''
  }));

  const outputs = [{ id: `${id}-output` }];

useEffect(() => {
  const incomingEdges = edges.filter(
    e => e.target === id
  );

  const currentVars = new Set(variableHandles);

  // 1️⃣ REMOVE edges whose variable no longer exists
  incomingEdges.forEach(edge => {
    const varName = edge.targetHandle;
    if (!currentVars.has(varName)) {
      onEdgesChange([
        { id: edge.id, type: 'remove' }
      ]);
    }
  });

  // 2️⃣ ADD missing edges for new variables
  variableHandles.forEach(varName => {
    const exists = incomingEdges.some(
      e => e.targetHandle === varName
    );

    if (!exists) {
      onConnect({
        source: varName,
        sourceHandle: `${varName}-output`,
        target: id,
        targetHandle: varName,
      });
    }
  });

}, [variableHandles, edges, id]);



  return (
    <BaseNode
      title="Text"
      inputs={inputs}
      outputs={outputs}
      className="nowheel shadow-md"
    >
      <label className="node-label">
        Name
      </label>
      <input
        type="text"
        value={currName}
        onChange={handleNameChange}
        className="node-input nodrag mb-3"
      />

      <label className="node-label">
        Text <span className="text-red-500">*</span>
      </label>

      <div
        onWheel={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <VariableTextarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          options={options}
          onValidate={(isValid, invalid) => setInvalidVars(invalid)}
          keyboardInteraction={handleKeyDown}
          placeholder="Type text here... Use {{ for variables"
          className="node-textarea nodrag scrollbar-thin"
          style={{ fontSize, maxHeight: "160px" }}
        />
      </div>

      {invalidVars.length > 0 && (
        <div className="mt-2 text-xs text-red-500 border border-red-200 bg-red-50 p-1 rounded">
          Invalid variables: {invalidVars.join(', ')}
        </div>
      )}
    </BaseNode>
  );
};
