import { useEffect, useState } from "react";
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
    const fetchTree = async () => {
      try {
        const response = await getTree(treeId);
        console.log("Fetched Tree:", response.data);
        setTreeData(response.data);
      } catch (error) {
        console.error("Failed to fetch tree", error);
      }
    };

    fetchTree();
  }, [treeId, updateTrigger]);

  if (!treeData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Calculation Tree</h2>
      <h3>Starting Number: {treeData.startingNumber}</h3>
      <ul>
        {treeData.operations.map((op, index) => (
          <li key={index}>
            {op.operation} {op.rightNumber} = {op.result}
          </li>
        ))}
      </ul>
    </div>
  );
}
