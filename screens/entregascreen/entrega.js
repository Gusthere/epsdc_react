import React, { useState } from 'react';
import EntregaFilters from './entregafilters';
import EntregaTable from './entregatable';
import EntregaModal from './modal';
import styles from './styles';
import { entregasMock, estados, municipios, parroquias } from './data';
import { View, Text } from 'react-native';
import MainTabs from '../../components/MainTabs';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

const EntregaScreen = () => {
  // Filtros
  const [estado, setEstado] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [parroquia, setParroquia] = useState('');
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [entregas, setEntregas] = useState(entregasMock);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [entregaSeleccionada, setEntregaSeleccionada] = useState(null);

  // Funciones
  const exportarPDF = () => alert('Función de exportar PDF');
  const abrirModal = (entrega) => {
    setEntregaSeleccionada(entrega);
    setModalVisible(true);
  };
  const cerrarModal = () => {
    setModalVisible(false);
    setEntregaSeleccionada(null);
  };

  // Acción para finalizar
  const finalizarEntrega = (id) => {
    setEntregas(prev =>
      prev.map(e =>
        e.id === id ? { ...e, estado: 'ENTREGADO' } : e
      )
    );
  };

  return (
    <View style={styles.container}>
      <MainTabs />
      <Text style={styles.title}>Lista de Entregas</Text>
      <EntregaFilters
        estado={estado} setEstado={setEstado} estados={estados}
        municipio={municipio} setMunicipio={setMunicipio} municipios={municipios}
        parroquia={parroquia} setParroquia={setParroquia} parroquias={parroquias}
        fechaInicio={fechaInicio} setShowDatePicker={setShowDatePicker}
        fechaFin={fechaFin} exportarPDF={exportarPDF}
      />
      <EntregaTable
        entregas={entregas}
        onRowPress={abrirModal}
        onFinalizar={finalizarEntrega}
      />
      <EntregaModal
        visible={modalVisible}
        cerrarModal={cerrarModal}
        entregaSeleccionada={entregaSeleccionada}
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

export default EntregaScreen;