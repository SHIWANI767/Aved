import axios from "axios";
import { api_configs } from "..";

export const apiRouterCall = async ({
  method,
  endPoint,
  bodyData,
  paramsData,
  token,
  id,
  source,
}) => {
  try {
    console.log({
      method,
      endPoint,
      bodyData,
      paramsData,
      token,
      id,
      source,
    });
    
    return await axios({
      method: method,
      url: id ? `${api_configs[endPoint]}/${id}` : api_configs[endPoint],
      headers: {
        token: token ? token : window.sessionStorage.getItem("adminToken"),
      },
      data: bodyData ? bodyData : null,
      params: paramsData ? paramsData : null,
      cancelToken: source ? source.token : null,
    });
  } catch (error) {
    console.log(error?.response);
    if (error.response) {
      return error?.response;
    } else {
      return { data: { message: error?.message } };
    }
  }
};
export const getAPIHandler = async ({
  endPoint,
  id,
  bodyData,
  source,
  paramsData,
  query,
}) => {
  console.log({ endPoint, id, bodyData, source, paramsData, query });
  try {
    return await axios({
      method: "GET",
      url: id ? `${api_configs[endPoint]}/${id}` : api_configs[endPoint],
      params: paramsData ? paramsData : null,
      data: bodyData ? bodyData : null,
      params: query ? query : null,
      headers: {
        token: window.sessionStorage.getItem("adminToken"),
      },
      cancelToken: source ? source.token : null,
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const postAPIHandler = async ({
  endPoint,
  dataToSend,
  paramsData,
  id,
}) => {
  try {
    return await axios({
      method: "POST",
      url: id ? `${api_configs[endPoint]}/${id}` : api_configs[endPoint],
      headers: {
        token: window.sessionStorage.getItem("adminToken"),
      },
      data: dataToSend ? dataToSend : null,
      params: paramsData ? paramsData : null,
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export const putAPIHandler = async ({
  endPoint,
  dataToSend,
  paramsData,
  id,
}) => {
  try {
    return await axios({
      method: "PUT",
      url: id ? `${api_configs[endPoint]}/${id}` : api_configs[endPoint],
      headers: {
        token: window.sessionStorage.getItem("adminToken"),
      },
      data: dataToSend ? dataToSend : null,
      params: paramsData ? paramsData : null,
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
