export const setLocalStorageToken = (token: string) =>
  localStorage.setItem("token", "Bearer " + token);
