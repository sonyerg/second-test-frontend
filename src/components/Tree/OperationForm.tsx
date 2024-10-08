import { useState } from "react";

import "./OperationForm.css";
import { addOperation } from "../../services/api";

interface OperationFormProps {
  treeId: string;
  onOperationAdded: () => void;
}

export default function OperationForm({
  treeId,
  onOperationAdded,
}: OperationFormProps) {
  const [operation, setOperation] = useState("+");
  const [rightNumber, setRightNumber] = useState<number>(0);

  async function handleAddOperation() {
    try {
      const response = await addOperation(treeId, operation, rightNumber);
      console.log("Operation added:", response.data);
      onOperationAdded();
      setRightNumber(0);
    } catch (error) {
      console.error("Failed to add operation", error);
    }
  }

  function handleSubmit(e: React.ChangeEvent<HTMLInputElement>) {
    setRightNumber(parseFloat(e.target.value));
  }

  return (
    <div className="operation-form">
      <select value={operation} onChange={(e) => setOperation(e.target.value)}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <input type="number" value={rightNumber} onChange={handleSubmit} />
      <button onClick={handleAddOperation}>Add Operation</button>
    </div>
  );
}
