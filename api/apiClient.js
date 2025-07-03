import axios from "axios";
import { API_BASE_URL } from "../config/urlAPI";
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "../utils/tokenStorage";
import { refreshAccessToken } from "../services/authService";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  const accessToken = await getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    const newCsrf = response.headers["x-csrf-token"];
    if (newCsrf) {
      localStorage.setItem("csrfToken", newCsrf); // solo web por simplicidad
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const puedeRefrescar = error.response?.data?.puedeRefrescar;

    if (status === 401 && puedeRefrescar && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newTokens = await refreshAccessToken();
        await setTokens(newTokens.AccessToken, newTokens.RefreshToken);

        originalRequest.headers["Authorization"] = `Bearer ${newTokens.AccessToken}`;
        return apiClient(originalRequest);
      } catch {
        await clearTokens();
        // No se navega aquí, el componente lo debe manejar
        return Promise.reject({ sessionExpired: true });
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;