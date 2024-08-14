import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export async function startTree(startingNumber: number) {
  return api.post("/start-tree", { startingNumber });
}

export async function addOperation(
  treeId: string,
  operation: string,
  rightNumber: number
) {
  return api.post(`/add-operation/${treeId}`, { operation, rightNumber });
}

export async function getTree(treeId: string) {
  return api.get(`/tree/${treeId}`);
}

export default api;
