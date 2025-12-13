import { useState } from "react";
import { BaseNode } from "../BaseNode";

export const MathNode = ({ id }) => {
  const [operation, setOperation] = useState("add");

  return (
    <BaseNode
      title="Math"
      inputs={[
        { id: `${id}-a` },
        { id: `${id}-b` },
      ]}
      outputs={[
        { id: `${id}-result` },
      ]}
    >
      <label className="flex flex-col">
        Operation
        <select
          className="mt-1 rounded bg-bg border border-border p-1"
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
        </select>
      </label>
    </BaseNode>
  );
};
