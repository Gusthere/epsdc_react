import React, { useState } from 'react';
import EntregaFilters from './entregafilters';
import EntregaTable from './entregatable';
import EntregaModal from './modal';
import styles from './styles';
import { entregasMock, estados, municipios, parroquias } from './data';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import MainTabs from '../../components/MainTabs';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import Footer from '../../components/Footer';

const EntregaScreen = () => {
  // Filtros
  const [estado, setEstado] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [parroquia, setParroquia] = useState('');
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [entregas, setEntregas] = useState(entregasMock);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pagina, setPagina] = useState(1);
  const registrosPorPagina = 4;

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

  // Paginación
  const entregasPaginadas = entregas.slice(
    (pagina - 1) * registrosPorPagina,
    pagina * registrosPorPagina
  );
  const totalPaginas = Math.ceil(entregas.length / registrosPorPagina);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={{ flex: 1, paddingBottom: 60, paddingHorizontal: 12 }}>
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
            entregas={entregasPaginadas}
            onRowPress={abrirModal}
            onFinalizar={finalizarEntrega}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 12 }}>
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
      </ScrollView>
      <Footer />
    </View>
  );
};

export default EntregaScreen;