import apiClient from "../api/apiClient";
import { getCSRFToken, setCSRFToken, clearCSRFToken } from "./tokenStorage";

/**
 * Envia una petición con el token CSRF actualizado si existe.
 * @param {string} method - Método HTTP (GET, POST, etc.)
 * @param {string} url - Ruta relativa (ej: '/usuario/...')
 * @param {Object} [data] - Datos del cuerpo (solo para métodos con cuerpo)
 * @param {Object} [extraConfig] - Configuración adicional para Axios
 */
export async function csrfRequest(method, url, data = {}, extraConfig = {}) {
  try {
    const csrfToken = await getCSRFToken();

    // Creamos los headers básicos sin sobrescribir lo que apiClient ya pone
    const headers = {
      ...(extraConfig.headers || {}),
      ...(csrfToken && { "x-csrf-token": csrfToken }),
    };

    const config = {
      method: method.toLowerCase(),
      url,
      headers,
      ...(["post", "put", "patch"].includes(method.toLowerCase()) && { data }),
      ...extraConfig,
    };

    const response = await apiClient(config);

    const newCSRF = response.headers["x-csrf-token"];
    if (newCSRF) {
      await setCSRFToken(newCSRF);
    }

    return response;
  } catch (error) {
    if ([419, 403].includes(error?.response?.status)) {
      await clearCSRFToken();
    }
    throw error;
  }
}

