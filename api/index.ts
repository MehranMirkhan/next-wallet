import axios from "axios";

import transactionApi from "./transaction";

axios.defaults.baseURL = "api";
axios.defaults.withCredentials = true;

const api = {
  transaction: transactionApi,
};

export default api;
