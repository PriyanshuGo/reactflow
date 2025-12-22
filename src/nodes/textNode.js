import { useState, useEffect } from "react";
import { Position } from "reactflow";
import { useStore } from "../store";
import { BaseNode } from "../BaseNode";
import { Textarea } from "../components/Textarea";

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const DEBOUNCE_DELAY = 300;
  const [currName, setCurrName] = useState(
    data?.textName || id.replace("text-", "text_")
  );
  const [currText, setCurrText] = useState("");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };


  useEffect(() => {
    const timeout = setTimeout(() => {
      updateNodeField(id, "text", currText);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeout);
  }, [currText, id]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateNodeField(id, "textName", currName);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeout);
  }, [currName, id]);

  return (
    <BaseNode
      title="Text"
      name={currName}
      onNameChange={handleNameChange}
      inputs={[{ id: `${id}-input`, position: Position.Left }]}
      outputs={[{ id: `${id}-output`, position: Position.Right }]}
    >
      <div>
        <label className="node-label">
          Text <span className="text-red-500">*</span>
        </label>

        <Textarea
          value={currText}
          onChange={(e) => {
            setCurrText(e.target.value);
          }}
          placeholder="Type text here..."
        />
      </div>
    </BaseNode>
  );
};
