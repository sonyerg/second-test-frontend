import { useEffect, useState } from "react";

import "./CalculationTree.css";
import { getTree } from "../../services/api";

interface CalculationTreeProps {
  treeId: string;
  updateTrigger: number;
}

interface Operation {
  id: string;
  operation: string;
  rightNumber: number;
  result: number;
}

interface TreeData {
  startingNumber: number;
  operations: Operation[];
}

export default function CalculationTree({
  treeId,
  updateTrigger,
}: CalculationTreeProps) {
  const [treeData, setTreeData] = useState<TreeData | null>(null);

  useEffect(() => {
    async function fetchTree() {
      try {
        const response = await getTree(treeId);
        console.log("Fetched Tree:", response.data);
        setTreeData(response.data);
      } catch (error) {
        console.error("Failed to fetch tree", error);
      }
    }

    fetchTree();
  }, [treeId, updateTrigger]);

  if (!treeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tree-container">
      <h3>Starting Number: {treeData.startingNumber}</h3>
      {treeData.operations.length === 0 ? (
        <p>Start the calculation by adding an operation.</p>
      ) : (
        <ul>
          {treeData.operations.map((op, index) => (
            <div key={index}>
              {op.operation} {op.rightNumber} ={" "}
              {op.result.toString().split(".")[1]?.length > 4
                ? op.result.toFixed(4)
                : op.result}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
