import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import SolicitudFilters from "./solicitudfilters";
import SolicitudTable from "./solicitudtable";
import PagoModal from "./pagomodal";
import SolicitudModal from "./modal";
import styles from "./styles";
import MainTabs from "../../components/MainTabs";
import apiClient from "../../api/apiClient";
import { useNavigation } from "@react-navigation/native";

const SolicitudScreen = () => {
  const navigation = useNavigation();

  const [estado, setEstado] = useState("12");
  const [municipio, setMunicipio] = useState("147");
  const [parroquia, setParroquia] = useState("");
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [parroquias, setParroquias] = useState([]);

  const [solicitudes, setSolicitudes] = useState([]);
  const [pagina, setPagina] = useState(1);
  const registrosPorPagina = 4;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalDetalleVisible, setModalDetalleVisible] = useState(false);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
  const [referencia, setReferencia] = useState("");
  const [banco, setBanco] = useState("");
  const [fechaPago, setFechaPago] = useState(new Date());
  const [imagen, setImagen] = useState(null);

  const [showDatePicker, setShowDatePicker] = useState(null);

  const totalPaginas = Math.ceil(solicitudes.length / registrosPorPagina);
  const solicitudesPaginadas = solicitudes.slice(
    (pagina - 1) * registrosPorPagina,
    pagina * registrosPorPagina
  );

  const fetchSolicitudes = async (filtros = {}) => {
    try {
      const response = await apiClient.get("/solicitud", filtros);
      setSolicitudes(response.data.info || []);

      if (response.data.select) {
        if (filtros.select === "estado") setMunicipios(response.data.select);
        if (filtros.select === "municipio") setParroquias(response.data.select);
      }
    } catch (error) {
      console.error("Error al cargar solicitudes:", error);
    }
  };

  const fetchSelectsIniciales = async () => {
    try {
      const [resEstados, resMunicipios, resParroquias] = await Promise.all([
        apiClient.get("/estado"),
        apiClient.post("/municipio/por-estado", {estado: 12}),
        apiClient.post("/parroquia/por-municipio", {municipio: 147}),
      ]);
      setEstados(resEstados.data.attachment.registros);
      setMunicipios(resMunicipios.data.attachment.registros);
      setParroquias(resParroquias.data.attachment.registros);
    } catch (error) {
      console.error("Error al cargar selects:", error);
    }
  };

  useEffect(() => {
    fetchSolicitudes();
    fetchSelectsIniciales();
  }, []);

  const handleFiltroChange = async (select, valor) => {
    const filtros = {
      select,
      valor,
      fecha_inicio: fechaInicio || undefined,
      fecha_fin: fechaFin || undefined,
    };
    await fetchSolicitudes(filtros);
  };

  const handleFechaChange = async () => {
    const filtros = {
      select: parroquia
        ? "parroquia"
        : municipio
        ? "municipio"
        : estado
        ? "estado"
        : "ninguno",
      valor: parroquia || municipio || estado || "ninguno",
      fecha_inicio: fechaInicio || undefined,
      fecha_fin: fechaFin || undefined,
    };
    await fetchSolicitudes(filtros);
  };

  const limpiarFiltros = async () => {
    setEstado("");
    setMunicipio("");
    setParroquia("");
    setFechaInicio(null);
    setFechaFin(null);
    await fetchSolicitudes();
  };

  const exportarPDF = () => alert("Función de exportar PDF");

  const abrirModalPago = (solicitud) => {
    setSolicitudSeleccionada(solicitud);
    setModalVisible(true);
  };

  const abrirModalDetalle = (solicitud) => {
    setSolicitudSeleccionada(solicitud);
    setModalDetalleVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setReferencia("");
    setBanco("");
    setFechaPago(new Date());
    setImagen(null);
    setSolicitudSeleccionada(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, paddingBottom: 60, paddingHorizontal: 12 }}>
          <MainTabs />
          <Text style={styles.title}>Lista de Solicitudes</Text>
          <SolicitudFilters
            estado={estado}
            setEstado={(val) => {
              setEstado(val);
              setMunicipio("");
              setParroquia("");
              handleFiltroChange("estado", val);
            }}
            estados={estados}
            municipio={municipio}
            setMunicipio={(val) => {
              setMunicipio(val);
              setParroquia("");
              handleFiltroChange("municipio", val);
            }}
            municipios={municipios}
            parroquia={parroquia}
            setParroquia={(val) => {
              setParroquia(val);
              handleFiltroChange("parroquia", val);
            }}
            parroquias={parroquias}
            fechaInicio={fechaInicio}
            setFechaInicio={(val) => {
              setFechaInicio(val);
              handleFechaChange();
            }}
            fechaFin={fechaFin}
            setFechaFin={(val) => {
              setFechaFin(val);
              handleFechaChange();
            }}
            limpiarFiltros={limpiarFiltros}
            exportarPDF={exportarPDF}
          />

          <SolicitudTable
            solicitudes={solicitudesPaginadas}
            onRowPress={abrirModalDetalle}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 8,
            }}
          >
            <TouchableOpacity
              onPress={() => setPagina((p) => Math.max(1, p - 1))}
              disabled={pagina === 1}
              style={{
                padding: 8,
                backgroundColor: pagina === 1 ? "#ccc" : "#5478ff",
                borderRadius: 4,
                marginHorizontal: 8,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Anterior
              </Text>
            </TouchableOpacity>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {pagina} / {totalPaginas}
            </Text>
            <TouchableOpacity
              onPress={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
              disabled={pagina === totalPaginas}
              style={{
                padding: 8,
                backgroundColor: pagina === totalPaginas ? "#ccc" : "#5478ff",
                borderRadius: 4,
                marginHorizontal: 8,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Siguiente
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: "center", marginTop: 16 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#5478ff",
                width: 56,
                height: 56,
                borderRadius: 28,
                justifyContent: "center",
                alignItems: "center",
                elevation: 4,
              }}
              onPress={() => navigation.navigate("solicitud-new")}
            >
              <Text
                style={{ color: "white", fontSize: 32, fontWeight: "bold" }}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SolicitudScreen;
