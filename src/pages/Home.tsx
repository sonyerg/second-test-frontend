import { useState } from "react";

import "./Home.css";
import OperationForm from "../components/Tree/OperationForm";
import CalculationTree from "../components/Tree/CalculationTree";
import StartTreeForm from "../components/Tree/StartTreeForm";

export default function Home() {
  const [treeIds, setTreeIds] = useState<string[]>([]);

  const [updateTrigger, setUpdateTrigger] = useState(0);

  const handleTreeCreated = (newTreeId: string) => {
    setTreeIds((prevIds) => [...prevIds, newTreeId]);
  };

  const handleOperationAdded = () => {
    setUpdateTrigger((prev) => prev + 1);
  };

  return (
    <div className="container">
      <h2>Number Discussion</h2>
      <StartTreeForm onTreeCreated={handleTreeCreated} />
      {treeIds.map((treeId) => (
        <div key={treeId}>
          <CalculationTree treeId={treeId} updateTrigger={updateTrigger} />
          <OperationForm
            treeId={treeId}
            onOperationAdded={handleOperationAdded}
          />
        </div>
      ))}
    </div>
  );
}
