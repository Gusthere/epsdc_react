import React, { useState } from 'react';
import RecepcionFilters from './recepcionfilters';
import RecepcionTable from './recepciontable';
import RecepcionModal from './modal';
import styles from './styles';
import { recepcionesMock, estados, municipios, parroquias } from './data';
import { View, Text } from 'react-native';
import MainTabs from '../../components/MainTabs';
import DateTimePicker from '@react-native-community/datetimepicker';

const RecepcionScreen = () => {
  // Filtros
  const [estado, setEstado] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [parroquia, setParroquia] = useState('');
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [recepciones, setRecepciones] = useState(recepcionesMock);
  const [showDatePicker, setShowDatePicker] = useState(null);

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

  // Acción para finalizar
  const finalizarRecepcion = (id) => {
    setRecepciones(prev =>
      prev.map(r =>
        r.id === id ? { ...r, estado: 'ENTREGADO' } : r
      )
    );
  };

  return (
    <View style={styles.container}>
      <MainTabs />
      <Text style={styles.title}>Lista de Recepciones</Text>
      <RecepcionFilters
         estado={estado} setEstado={setEstado} estados={estados}
  municipio={municipio} setMunicipio={setMunicipio} municipios={municipios}
  parroquia={parroquia} setParroquia={setParroquia} parroquias={parroquias}
  fechaInicio={fechaInicio} setShowDatePicker={setShowDatePicker} // <-- aquí el cambio
  fechaFin={fechaFin} exportarPDF={exportarPDF}
      />
      <RecepcionTable
        recepciones={recepciones}
        onRowPress={abrirModal}
        onFinalizar={finalizarRecepcion}
      />
      <RecepcionModal
        visible={modalVisible}
        cerrarModal={cerrarModal}
        recepcionSeleccionada={recepcionSeleccionada}
      />
      {showDatePicker && (
        <DateTimePicker
          value={showDatePicker === 'inicio' ? (fechaInicio || new Date()) : (fechaFin || new Date())}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => {
            setShowDatePicker(null);
            if (date) {
              if (showDatePicker === 'inicio') setFechaInicio(date);
              else if (showDatePicker === 'fin') setFechaFin(date);
            }
          }}
        />
      )}
    </View>
  );
};

export default RecepcionScreen;