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
      <div className="title">
        <h2>Number Discussion</h2>
        <i>Start a discussion</i>
      </div>
      <StartTreeForm onTreeCreated={handleTreeCreated} />
      {treeIds.length === 0 && <p>No discussions yet.</p>}
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
