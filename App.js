import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RecuperarForm from "./screens/recuperar_cuenta";
import CodigoForm from "./screens/codigo";
import LoginScreen from "./screens/login";
import SolicitudScreen from "./screens/solicitudscreen/solicitud";
import SolicitudNewScreen from "./screens/solicitud-newscreen/solicitud-newscreen";
import RecepcionScreen from "./screens/recepcionscreen/recepcion";
import EntregaScreen from "./screens/entregascreen/entrega";
import PeriodoScreen from "./screens/periodoscreen/periodo";
import { alertConfigs } from "./components/hooks/alertConfigs"; // Importa las configuraciones de alertas

const Stack = createStackNavigator();
//pagina principal que habrá en esta ocacion es initialRouteName="recuperar_cuenta", creo que en nuestro caso seria la de iniciar sesion, es como un tipo de home?
// el alertConfigs solo se usa para esto pero no hace nada mas, creo que se puede acomodar esto, pero asi funciona
// en los  {(props) => <RecuperarForm {...props} alertConfigs={alertConfigs} />}
// pego los comentarios aqui por que si los coloco en la linea exacta que quiero me da un error wtf

const Navegador = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={20}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen
            name="login"
            options={{
              title: "Login",
              headerStyle: {
                backgroundColor: "#5478ff",
                borderBottomWidth: 1,
                borderBottomColor: "#ffffff",
              },
              headerTintColor: "#FFFFFF",
            }}
          >
            {(props) => <LoginScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="recuperar_cuenta"
            options={{
              title: "Recuperar Cuenta",
              headerStyle: {
                backgroundColor: "#5478ff",
                borderBottomWidth: 1,
                borderBottomColor: "#ffffff",
              },
              headerTintColor: "#FFFFFF",
            }}
          >
            {(props) => (
              <RecuperarForm {...props} alertConfigs={alertConfigs} />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="codigo"
            options={{
              title: "Código de Recuperación",
              headerStyle: {
                backgroundColor: "#5478ff",
                borderBottomWidth: 1,
                borderBottomColor: "#ffffff",
              },
              headerTintColor: "#FFFFFF",
            }}
          >
            {(props) => <CodigoForm {...props} alertConfigs={alertConfigs} />}
          </Stack.Screen>
          <Stack.Screen
            name="solicitud"
            component={SolicitudScreen}
            options={{
              title: "Solicitud",
              headerStyle: {
                backgroundColor: "#5478ff",
                borderBottomWidth: 1,
                borderBottomColor: "#ffffff",
              },
              headerTintColor: "#FFFFFF",
            }}
          />
          <Stack.Screen
            name="solicitud-new"
            component={SolicitudNewScreen}
            options={{
              title: "Nueva Solicitud",
              headerStyle: {
                backgroundColor: "#5478ff",
                borderBottomWidth: 1,
                borderBottomColor: "#ffffff",
              },
              headerTintColor: "#FFFFFF",
            }}
          />
          <Stack.Screen
            name="recepcion"
            options={{
              title: "Recepción",
              headerStyle: {
                backgroundColor: "#5478ff",
                borderBottomWidth: 1,
                borderBottomColor: "#ffffff",
              },
              headerTintColor: "#FFFFFF",
            }}
          >
            {(props) => <RecepcionScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="entrega"
            options={{
              title: "Entrega",
              headerStyle: {
                backgroundColor: "#5478ff",
                borderBottomWidth: 1,
                borderBottomColor: "#ffffff",
              },
              headerTintColor: "#FFFFFF",
            }}
          >
            {(props) => <EntregaScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="periodo"
            options={{
              title: "Periodo",
              headerStyle: {
                backgroundColor: "#5478ff",
                borderBottomWidth: 1,
                borderBottomColor: "#ffffff",
              },
              headerTintColor: "#FFFFFF",
            }}
          >
            {(props) => <PeriodoScreen {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Navegador;
