import axios from "../axios";

const handleGetHistoryLogApi = (accountId) => {
  return axios.get(`/api/v1/log-history/?accountId=${accountId}`);
};

export { handleGetHistoryLogApi };
