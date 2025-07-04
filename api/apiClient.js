import axios from "axios";
import { Platform } from "react-native";
import { API_BASE_URL } from "../config/urlAPI";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "../utils/tokenStorage";
import { refreshAccessToken } from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import forge from 'node-forge';
import publicKeyPem from '../rsa/publicKey';

function encryptWithPublicKey(data) {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const jsonData = JSON.stringify(data);
  const encrypted = publicKey.encrypt(jsonData, 'RSA-OAEP');
  return forge.util.encode64(encrypted);
}

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

  if (config.data) {
    const encrypted = encryptWithPublicKey(config.data);
    config.data = JSON.stringify({ encrypted });
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    const newCsrf = response.headers["x-csrf-token"];
    if (newCsrf) {
      if (Platform.OS === "web") {
        localStorage.setItem("csrfToken", newCsrf);
      } else {
        AsyncStorage.setItem("csrfToken", newCsrf);
      }
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

        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${newTokens.AccessToken}`;
        return apiClient(originalRequest);
      } catch {
        await clearTokens();
        return Promise.reject({ sessionExpired: true });
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
