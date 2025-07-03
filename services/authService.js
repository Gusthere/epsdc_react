import apiClient from "../api/apiClient";
import { getRefreshToken } from "../utils/tokenStorage";

export const refreshAccessToken = async () => {
  const refreshToken = await getRefreshToken();
  const response = await apiClient.get("/usuario/refresh-token", {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return response.data.attachment;
};

export const getCSRFToken = async () => {
  const response = await apiClient.get("/usuario/csrf");
  return response.headers["x-csrf-token"];
};