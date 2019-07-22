import axios from "axios";
import stringifyRequestParams from "../helpers/stringifyRequestParams";

const getEmployees = async (requestParams = {}) => {
  const endpoint = "/api/employees";
  const expectedParams = ["limit", "filter"];
  const params = stringifyRequestParams(requestParams, expectedParams);
  const url = `${endpoint}${params}`;
  const response = await axios.get(url);
  return response;
};

export default {
  getEmployees
};
