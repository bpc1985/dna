// const SERVER_URL = "http://localhost:8081/";
const SERVER_URL = "http://localhost:8082/";

const AUTH_HEADER = "token";
const AUTH_HEADER_NAME = "Authorization";

const addAuthHeader = headers => {
  const authHeaderValue = localStorage.getItem(AUTH_HEADER);
  if (authHeaderValue) {
    return { ...headers, [AUTH_HEADER_NAME]: `Bearer ${authHeaderValue}` };
  }
  return headers;
};

const get = async path => {
  const response = await fetch(SERVER_URL + path, {
    headers: addAuthHeader({})
  });
  return response;
};

const post = async (path, body) => {
  const header = body ? { "Content-Type": "application/json" } : {};
  const response = await fetch(SERVER_URL + path, {
    method: "POST",
    headers: addAuthHeader(header),
    body: JSON.stringify(body)
  });
  return response;
};

const parseResponse = async response => {
  let body;
  try {
    body = await response.json();
  } catch (error) {
    body = {};
  }
  if (!response.ok) {
    const error = new Error();
    error.errorMessage = body.message || "";
    throw error;
  }
  return body;
};

export const postLogOut = async () => {
  const response = await post("users/logout");
  return parseResponse(response);
};

export const postLogIn = async payload => {
  const response = await post("users/login", { ...payload });
  return parseResponse(response);
};

export const fetchUserData = async () => {
  const response = await get("users/me");
  return parseResponse(response);
};

export const fetchSubscriptionsData = async () => {
  const response = await get("subscriptions");
  return parseResponse(response);
};

export const fetchSubscriptionDetailData = async id => {
  const response = await get(`subscriptions/${id}`);
  return parseResponse(response);
};

export const isSearchTermIncluded = (dnaPackage, searchTerm) => {
  return (
    dnaPackage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dnaPackage.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dnaPackage.agreement.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const getUrlParams = search => {
  if (search) {
    let hashes = search.slice(search.indexOf("?") + 1).split("&");
    return hashes.reduce((params, hash) => {
      let [key, val] = hash.split("=");
      return Object.assign(params, { [key]: decodeURIComponent(val) });
    }, {});
  }
  return {};
};
