import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";
import Link from "../components/link2";
import axios from "axios";
import useCustomValidation from "../components/hooks/useCustomValidation";

const LoginScreen = ({ navigation }) => {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const { errors } = useCustomValidation(dni, password); // Pasar dni y password al hook

  const handleLogin = async () => {
    if (Object.keys(errors).length === 0 && (dni != "" || password != "")) {
      // Solo proceder si no hay errores
      axios
        .get("info.json")
        .then((response) => {
          alert("Bienvenido de vuelta");
        })
        .catch((error) => {
          alert("Bienvenido de vuelta");
        });
    } else {
      console.log("Datos incompletos");
    }
  };
  /* Api
      try {
        const formData = new FormData();
        formData.append("cedula", dni);
        formData.append("clave", password);
        const response = await axios.post(
          "http://192.168.56.1/Codigo/EPSDC-API/login",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(1);
        alert(response.data.attachment.token);
        Alert.alert("Login exitoso", `Bienvenido ${response.data.username}`);
        console.log(1);
      } catch (error) {
        console.log(2);
        Alert.alert("Error", "Error al iniciar sesión");
        console.log(2);
        console.log(error.response);
      }
      */

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
          {errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}
          <Button title="Iniciar Sesión" onPress={handleLogin} />
          <View>
            <Link onPress={() => navigation.navigate("recuperar_cuenta")}>
              Pedir otro código!
            </Link>
          </View>
          <View >
            <Link onPress={() => navigation.navigate("codigo")}>
              Tengo el código!
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
