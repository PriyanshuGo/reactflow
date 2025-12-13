// EmbeddingNode.js
import { BaseNode } from "../BaseNode";

export const EmbeddingNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Embedding"
      inputs={[
        { id: `${id}-text` },
      ]}
      outputs={[
        { id: `${id}-vector` },
      ]}
    >
      <span>Text → Vector</span>
    </BaseNode>
  );
};
