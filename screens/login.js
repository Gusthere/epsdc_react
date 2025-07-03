import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";
import Link from "../components/link2";
import useCustomValidation from "../components/hooks/useCustomValidation";
import { setTokens } from "../utils/tokenStorage";
import apiClient from "../api/apiClient";
import { useAuthStartup } from "../hooks/useAuthStartup";

const LoginScreen = ({ navigation }) => {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const { errors } = useCustomValidation(dni, password);

  // Ejecutar chequeo de sesión al montar
  useAuthStartup(navigation);

  const handleLogin = async () => {
    if (Object.keys(errors).length === 0 && dni !== "" && password !== "") {
      try {
        const response = await apiClient.post("/login", {
          cedula: dni,
          clave: password,
        });

        const { AccessToken, RefreshToken } = response.data.attachment;
        await setTokens(AccessToken, RefreshToken);

        alert("Login exitoso");
        navigation.reset({ index: 0, routes: [{ name: "solicitud" }] });
      } catch (error) {
        alert("Error al iniciar sesión. Verifica tus credenciales.");
      }
    } else {
      alert("Por favor completa los campos correctamente");
    }
  };

  return (
    <View style={styles.containerPrincipal}>
      <View style={styles.container}>
        <Card>
          <Text style={styles.titulo}>Login</Text>
          <Input
            value={dni}
            onChangeText={setDni}
            regex={/^[0-9]$/}
            keyBoardType="number-pad"
            placeholder="Cedula"
          />
          {errors.dni && <Text style={styles.error}>{errors.dni}</Text>}
          <Input
            value={password}
            onChangeText={setPassword}
            regex={/^[0-9a-zA-Z\s ñ \W \b]*$/}
            placeholder="Contraseña"
            secureTextEntry
          />
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}
          <Button title="Iniciar Sesión" onPress={handleLogin} />
          <View>
            <Link onPress={() => navigation.navigate("recuperar_cuenta")}>
              ¿Olvido su Contraseña?
            </Link>
          </View>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: "#ff4343",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 20,
  },
  error: {
    color: "red",
    marginBottom: 12,
  },
  titulo: {
    fontSize: 20,
    marginBottom: 30,
    fontWeight: "bolder",
  },
});

export default LoginScreen;
