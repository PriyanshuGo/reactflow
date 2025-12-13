// ConditionNode.js
import { BaseNode } from "../BaseNode";

export const ConditionNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Condition"
      inputs={[
        { id: `${id}-value` },
      ]}
      outputs={[
        { id: `${id}-true` },
        { id: `${id}-false` },
      ]}
    >
      <span>True / False branching</span>
    </BaseNode>
  );
};
