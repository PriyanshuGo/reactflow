// DelayNode.js
import { BaseNode } from "../BaseNode";

export const DelayNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Delay"
      inputs={[
        { id: `${id}-input` },
      ]}
      outputs={[
        { id: `${id}-output` },
      ]}
    >
      <span>Delays execution</span>
    </BaseNode>
  );
};
