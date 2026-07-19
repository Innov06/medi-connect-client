export const saveOfflineData = (data) => {
  localStorage.setItem("offlinePatientData", JSON.stringify(data));
};

export const getOfflineData = () => {
  const data = localStorage.getItem("offlinePatientData");
  return data ? JSON.parse(data) : null;
};