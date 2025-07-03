// === screens/solicitud-newscreen/solicitud-newscreen.js ===
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import MainTabs from "../../components/MainTabs";
import apiClient from "../../api/apiClient";
import { csrfRequest } from "../../utils/csrfRequest";

const SolicitudNewScreen = () => {
  const navigation = useNavigation();
  const [consejo, setConsejo] = useState("");
  const [ciliP, setCiliP] = useState("");
  const [ciliM, setCiliM] = useState("");
  const [ciliMG, setCiliMG] = useState("");
  const [ciliG, setCiliG] = useState("");
  const [precio, setPrecio] = useState("");
  const [consejos, setConsejos] = useState([
    { label: "Cargando...", value: "" },
  ]);
  const [preciosCilindros, setPreciosCilindros] = useState({});

  useEffect(() => {
    const fetchConsejos = async () => {
      try {
        const response = await apiClient.get("/vocero/disponibles");
        const data = response.data.attachment.registros;
        const formatted = Object.entries(data).map(([label, value]) => ({
          label,
          value,
        }));
        setConsejos([
          { label: "Seleccione Consejo Comunal", value: "" },
          ...formatted,
        ]);
      } catch (error) {
        console.error("Error al cargar consejos comunales:", error);
        setConsejos([{ label: "Error al cargar", value: "" }]);
      }
    };

    const fetchPrecios = async () => {
      try {
        const response = await apiClient.get("/cilindro/precio");
        const precios = {};
        response.data.attachment.registros.forEach(({ peso, precio }) => {
          precios[peso] = precio;
        });
        setPreciosCilindros(precios);
      } catch (error) {
        console.error("Error al obtener precios:", error);
      }
    };

    fetchConsejos();
    fetchPrecios();
    csrfRequest("GET", "/usuario/csrf");
  }, []);

  useEffect(() => {
    const total =
      parseInt(ciliP || 0) * (preciosCilindros[10] || 0) +
      parseInt(ciliM || 0) * (preciosCilindros[18] || 0) +
      parseInt(ciliMG || 0) * (preciosCilindros[27] || 0) +
      parseInt(ciliG || 0) * (preciosCilindros[43] || 0);
    setPrecio(total);
  }, [ciliP, ciliM, ciliMG, ciliG, preciosCilindros]);

  const limpiar = () => {
    setConsejo("");
    setCiliP("");
    setCiliM("");
    setCiliMG("");
    setCiliG("");
    setPrecio("");
  };

  const agregar = async () => {
    try {
      const payload = {
        vocero: consejo,
        ciliP: ciliP,
        ciliM: ciliM,
        ciliMG: ciliMG,
        ciliG: ciliG,
      };
      
      await csrfRequest("POST", "/solicitud/crear", payload);

      alert("Solicitud agregada");
      limpiar();
    } catch (error) {
      if (error.response) {
      } else {
        console.log("Error sin respuesta:", error.message);
      }

      alert("Ocurrió un error al enviar la solicitud.");
      console.error("Error al agregar solicitud:", error);
      alert("Ocurrió un error al enviar la solicitud.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <MainTabs />
        <Text style={styles.title}>Agregar Solicitud</Text>
        <View style={styles.card}>
          <Text style={styles.filtroLabel}>Consejo Comunal</Text>
          <Picker
            selectedValue={consejo}
            onValueChange={setConsejo}
            style={styles.pickerRow}
          >
            {consejos.map((c) => (
              <Picker.Item key={c.value} label={c.label} value={c.value} />
            ))}
          </Picker>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            <View style={styles.inputGroup}>
              <Text style={styles.filtroLabel}>Cilindros 10kg</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={ciliP}
                onChangeText={setCiliP}
                placeholder="Cilindros 10kg"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.filtroLabel}>Cilindros 18kg</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={ciliM}
                onChangeText={setCiliM}
                placeholder="Cilindros 18kg"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.filtroLabel}>Cilindros 27kg</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={ciliMG}
                onChangeText={setCiliMG}
                placeholder="Cilindros 27kg"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.filtroLabel}>Cilindros 43kg</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={ciliG}
                onChangeText={setCiliG}
                placeholder="Cilindros 43kg"
              />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.filtroLabel}>Total</Text>
            <TextInput
              style={[styles.input, { backgroundColor: "#eee" }]}
              value={precio.toString()}
              editable={false}
              placeholder="Total"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 24,
              gap: 12,
            }}
          >
            <TouchableOpacity style={styles.limpiarBtn} onPress={limpiar}>
              <Text style={{ color: "white" }}>Limpiar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.agregarBtn} onPress={agregar}>
              <Text style={{ color: "white" }}>Agregar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center", marginTop: 24 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#007bff",
              paddingVertical: 12,
              paddingHorizontal: 32,
              borderRadius: 24,
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("solicitud")}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Regresar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SolicitudNewScreen;
