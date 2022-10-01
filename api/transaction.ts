import axios from "axios";
import { Transaction } from "@prisma/client";

const api = {
  findAll: () => axios.get("/transaction"),
  create: (data: Partial<Transaction>) => axios.post("/transaction", data),
  delete: (id: number) => axios.delete(`/transaction/${id}`),
};

export default api;
