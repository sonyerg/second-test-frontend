import { useState } from "react";

import "./Home.css";
import OperationForm from "../components/Tree/OperationForm";
import CalculationTree from "../components/Tree/CalculationTree";
import StartTreeForm from "../components/Tree/StartTreeForm";

export default function Home() {
  const [treeIds, setTreeIds] = useState<string[]>([]);

  const [updateTrigger, setUpdateTrigger] = useState(0);

  function handleTreeCreated(newTreeId: string) {
    setTreeIds((prevIds) => [...prevIds, newTreeId]);
  }

  function handleOperationAdded() {
    setUpdateTrigger((prev) => prev + 1);
  }

  return (
    <div className="container">
      <h2>Number Discussion</h2>
      <StartTreeForm onTreeCreated={handleTreeCreated} />
      {treeIds.length === 0 && <p>Post a discussion</p>}
      {[...treeIds].reverse().map((treeId) => (
        <div key={treeId} className="discussion-tree">
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
