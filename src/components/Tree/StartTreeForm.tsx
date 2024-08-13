import { useState } from "react";
import { startTree } from "../../services/api";

interface StartTreeFormProps {
  onTreeCreated: (treeId: string) => void;
}

export default function StartTreeForm({ onTreeCreated }: StartTreeFormProps) {
  const [startingNumber, setStartingNumber] = useState(0);

  const handleStartTree = async () => {
    try {
      const response = await startTree(startingNumber);
      const newTreeId = response.data._id;
      onTreeCreated(newTreeId);
    } catch (error) {
      console.error("Failed to start tree", error);
    } finally {
      setStartingNumber(0);
    }
  };

  return (
    <div>
      <input
        type="number"
        value={startingNumber}
        onChange={(e) => setStartingNumber(parseFloat(e.target.value))}
      />
      <button onClick={handleStartTree}>Start Tree</button>
    </div>
  );
}
