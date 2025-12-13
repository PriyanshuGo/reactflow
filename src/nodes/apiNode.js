import { useState } from "react";
import { BaseNode } from "../BaseNode";

export const APINode = ({ id }) => {
  const [url, setUrl] = useState("");

  return (
    <BaseNode
      title="API Request"
      inputs={[
        { id: `${id}-body` },
      ]}
      outputs={[
        { id: `${id}-response` },
      ]}
    >
      <label className="flex flex-col">
        URL
        <input
          className="mt-1 rounded bg-bg border border-border p-1"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com"
        />
      </label>
    </BaseNode>
  );
};
