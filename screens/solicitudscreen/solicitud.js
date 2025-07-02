import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SolicitudFilters from './solicitudfilters';
import SolicitudTable from './solicitudtable';
import PagoModal from './pagomodal';
import styles from './styles';
import MainTabs from '../../components/MainTabs';
import { solicitudesMock, estados, municipios, parroquias, bancos } from './data';

const SolicitudScreen = () => {
  // Filtros
  const [estado, setEstado] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [parroquia, setParroquia] = useState('');
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  // Modal y formulario de pago
  const [modalVisible, setModalVisible] = useState(false);
  const [referencia, setReferencia] = useState('');
  const [banco, setBanco] = useState('');
  const [fechaPago, setFechaPago] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imagen, setImagen] = useState(null);

  // Para seleccionar solicitud activa
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);

  // Funciones
  const exportarPDF = () => alert('Función de exportar PDF');
  const abrirModalPago = (solicitud) => {
    setSolicitudSeleccionada(solicitud);
    setModalVisible(true);
  };
  const cerrarModal = () => {
    setModalVisible(false);
    setReferencia('');
    setBanco('');
    setFechaPago(new Date());
    setImagen(null);
    setSolicitudSeleccionada(null);
  };

  return (
    <View style={styles.container}>
     <MainTabs />
      <Text style={styles.title}>Lista de Solicitudes</Text>
      <SolicitudFilters
        estado={estado} setEstado={setEstado} estados={estados}
        municipio={municipio} setMunicipio={setMunicipio} municipios={municipios}
        parroquia={parroquia} setParroquia={setParroquia} parroquias={parroquias}
        fechaInicio={fechaInicio} setShowDatePicker={setShowDatePicker}
        fechaFin={fechaFin} exportarPDF={exportarPDF}
      />
      <SolicitudTable solicitudes={solicitudesMock} />
      <PagoModal
        visible={modalVisible}
        cerrarModal={cerrarModal}
        referencia={referencia}
        setReferencia={setReferencia}
        banco={banco}
        setBanco={setBanco}
        bancos={bancos}
        fechaPago={fechaPago}
        setFechaPago={setFechaPago}
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
        imagen={imagen}
        setImagen={setImagen}
      />
    </View>
  );
};

export default SolicitudScreen;