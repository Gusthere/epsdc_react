import React, { useState } from 'react';
import RecepcionFilters from './recepcionfilters';
import RecepcionTable from './recepciontable';
import RecepcionModal from './modal';
import styles from './styles';
import { recepcionesMock, estados, municipios, parroquias } from './data';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import MainTabs from '../../components/MainTabs';
import DateTimePicker from '@react-native-community/datetimepicker';
import Footer from '../../components/Footer';

const RecepcionScreen = () => {
  // Filtros
  const [estado, setEstado] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [parroquia, setParroquia] = useState('');
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [recepciones, setRecepciones] = useState(recepcionesMock);
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [pagina, setPagina] = useState(1);
  const registrosPorPagina = 4;

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

  // Paginación
  const recepcionesPaginadas = recepciones.slice(
    (pagina - 1) * registrosPorPagina,
    pagina * registrosPorPagina
  );
  const totalPaginas = Math.ceil(recepciones.length / registrosPorPagina);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={{ flex: 1, paddingBottom: 60, paddingHorizontal: 12 }}>
          <MainTabs />
          <Text style={styles.title}>Lista de Recepciones</Text>
          <RecepcionFilters
            estado={estado} setEstado={setEstado} estados={estados}
            municipio={municipio} setMunicipio={setMunicipio} municipios={municipios}
            parroquia={parroquia} setParroquia={setParroquia} parroquias={parroquias}
            fechaInicio={fechaInicio} setShowDatePicker={setShowDatePicker}
            fechaFin={fechaFin} exportarPDF={exportarPDF}
          />
          <RecepcionTable
            recepciones={recepcionesPaginadas}
            onRowPress={abrirModal}
            onFinalizar={finalizarRecepcion}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 8 }}>
            <TouchableOpacity
              onPress={() => setPagina(p => Math.max(1, p - 1))}
              disabled={pagina === 1}
              style={{
                padding: 8,
                backgroundColor: pagina === 1 ? '#ccc' : '#5478ff',
                borderRadius: 4,
                marginHorizontal: 8,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Anterior</Text>
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              {pagina} / {totalPaginas}
            </Text>
            <TouchableOpacity
              onPress={() => setPagina(p => Math.min(totalPaginas, p + 1))}
              disabled={pagina === totalPaginas}
              style={{
                padding: 8,
                backgroundColor: pagina === totalPaginas ? '#ccc' : '#5478ff',
                borderRadius: 4,
                marginHorizontal: 8,
                marginVertical: 70
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Siguiente</Text>
            </TouchableOpacity>
          </View>
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
      </ScrollView>
      <Footer />
    </View>
  );
};

export default RecepcionScreen;