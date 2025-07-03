import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export const setTokens = async (access, refresh) => {
  if (Platform.OS === "web") {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  } else {
    await AsyncStorage.setItem("accessToken", access);
    await AsyncStorage.setItem("refreshToken", refresh);
  }
};

export const getAccessToken = async () => {
  return Platform.OS === "web"
    ? localStorage.getItem("accessToken")
    : await AsyncStorage.getItem("accessToken");
};

export const getRefreshToken = async () => {
  return Platform.OS === "web"
    ? localStorage.getItem("refreshToken")
    : await AsyncStorage.getItem("refreshToken");
};

export const clearTokens = async () => {
  if (Platform.OS === "web") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("csrfToken");
  } else {
    await AsyncStorage.multiRemove(["accessToken", "refreshToken", "csrfToken"]);
  }
};

// === Manejo de CSRF Token ===
export const getCSRFToken = async () => {
  return Platform.OS === "web"
    ? localStorage.getItem("csrfToken")
    : await AsyncStorage.getItem("csrfToken");
};

export const setCSRFToken = async (token) => {
  if (Platform.OS === "web") {
    localStorage.setItem("csrfToken", token);
  } else {
    await AsyncStorage.setItem("csrfToken", token);
  }
};

export const clearCSRFToken = async () => {
  if (Platform.OS === "web") {
    localStorage.removeItem("csrfToken");
  } else {
    await AsyncStorage.removeItem("csrfToken");
  }
};