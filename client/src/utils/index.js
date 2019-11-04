const SERVER_URL = "http://localhost:8081/";

export const fetchData = async path => {
  const res = await fetch(SERVER_URL + path);
  return await res.json();
};

export const isSearchTermIncluded = (dnaPackage, searchTerm) => {
  return dnaPackage.name.toLowerCase().includes(searchTerm.toLowerCase())
    || dnaPackage.type.toLowerCase().includes(searchTerm.toLowerCase())
    || dnaPackage.agreement.toLowerCase().includes(searchTerm.toLowerCase());
};
