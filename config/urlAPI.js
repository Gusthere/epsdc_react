import { Platform } from "react-native";
import { API_BASE_URL_WEB, API_BASE_URL_ANDROID } from "@env";

export const API_BASE_URL =
  Platform.OS === "web" ? API_BASE_URL_WEB : API_BASE_URL_ANDROID;