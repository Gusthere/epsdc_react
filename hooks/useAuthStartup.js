import { useEffect } from "react";
import { getAccessToken } from "../utils/tokenStorage";
import { getCSRFToken } from "../services/authService";

export const useAuthStartup = (navigation) => {
  useEffect(() => {
    const checkSession = async () => {
      const token = await getAccessToken();
      if (token) {
        try {
          await getCSRFToken();
          navigation.reset({ index: 0, routes: [{ name: "solicitud" }] });
        } catch (e) {
          console.log("Fallo CSRF, continuar al login");
        }
      }
    };
    checkSession();
  }, []);
};