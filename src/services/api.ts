import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const startTree = async (startingNumber: number) => {
  return api.post("/start-tree", { startingNumber });
};

export const addOperation = async (
  treeId: string,
  operation: string,
  rightNumber: number
) => {
  return api.post(`/add-operation/${treeId}`, { operation, rightNumber });
};

export const getTree = async (treeId: string) => {
  return api.get(`/tree/${treeId}`);
};

export default api;
