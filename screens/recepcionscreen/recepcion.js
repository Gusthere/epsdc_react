import React, { useState } from 'react';
import RecepcionFilters from './recepcionfilters';
import RecepcionTable from './recepciontable';
import RecepcionModal from './modal';
import styles from './styles';
import { recepcionesMock, estados, municipios, parroquias } from './data';
import { View, Text } from 'react-native';
import MainTabs from '../../components/MainTabs';

const RecepcionScreen = () => {
  // Filtros
  const [estado, setEstado] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [parroquia, setParroquia] = useState('');
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [recepcionSeleccionada, setRecepcionSeleccionada] = useState(null);

  // Funciones
  const exportarPDF = () => alert('Función de exportar PDF');
  const abrirModal = (recepcion) => {
    setRecepcionSeleccionada(recepcion);
    setModalVisible(true);
  };
  const cerrarModal = () => {
    setModalVisible(false);
    setRecepcionSeleccionada(null);
  };

  return (
    <View style={styles.container}>
      <MainTabs />
      <Text style={styles.title}>Lista de Recepciones</Text>
      <RecepcionFilters
        estado={estado} setEstado={setEstado} estados={estados}
        municipio={municipio} setMunicipio={setMunicipio} municipios={municipios}
        parroquia={parroquia} setParroquia={setParroquia} parroquias={parroquias}
        fechaInicio={fechaInicio} setShowDatePicker={() => {}}
        fechaFin={fechaFin} exportarPDF={exportarPDF}
      />
      <RecepcionTable recepciones={recepcionesMock} onRowPress={abrirModal} />
      <RecepcionModal
        visible={modalVisible}
        cerrarModal={cerrarModal}
        recepcionSeleccionada={recepcionSeleccionada}
      />
    </View>
  );
};

export default RecepcionScreen;