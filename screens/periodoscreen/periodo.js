import React, { useState } from 'react';
import { View, Text, Platform, TouchableOpacity, ScrollView } from 'react-native';
import PeriodoFilters from './periodofilters';
import PeriodoTable from './periodotable';
import PeriodoModal from './modal';
import styles from './styles';
import MainTabs from '../../components/MainTabs';
import { periodosMock, estados, municipios, parroquias } from './data';
import DateTimePicker from '@react-native-community/datetimepicker';
/*import Footer from '../../components/Footer';*/

const PeriodoScreen = () => {
  const [estado, setEstado] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [parroquia, setParroquia] = useState('');
  const [periodos, setPeriodos] = useState(periodosMock);
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState(null);
  const [parroquiaCerrar, setParroquiaCerrar] = useState('');
  const [pagina, setPagina] = useState(1);
  const registrosPorPagina = 4;
  const parroquiasCerrar = parroquias; // O usa otro array si es diferente

  // Función para exportar PDF
  const exportarPDF = () => alert('Función de exportar PDF');

  const abrirModal = (periodo) => {
    setPeriodoSeleccionado(periodo);
    setModalVisible(true);
  };
  const cerrarModal = () => {
    setModalVisible(false);
    setPeriodoSeleccionado(null);
  };

  const onIniciar = () => {
    alert('Función para iniciar periodo');
  };

  const onCerrar = () => {
    alert('Función para cerrar periodo');
  };

  // Paginación
  const periodosPaginados = periodos.slice(
    (pagina - 1) * registrosPorPagina,
    pagina * registrosPorPagina
  );
  const totalPaginas = Math.ceil(periodos.length / registrosPorPagina);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, paddingBottom: 60, paddingHorizontal: 12 }}>
          <MainTabs />
          <Text style={styles.title}>Periodo</Text>
          <PeriodoFilters
            estado={estado} setEstado={setEstado} estados={estados}
            municipio={municipio} setMunicipio={setMunicipio} municipios={municipios}
            parroquia={parroquia} setParroquia={setParroquia} parroquias={parroquias}
            parroquiaCerrar={parroquiaCerrar} setParroquiaCerrar={setParroquiaCerrar} parroquiasCerrar={parroquiasCerrar}
            fechaInicio={fechaInicio} setShowDatePicker={setShowDatePicker}
            fechaFin={fechaFin} exportarPDF={exportarPDF}
            onIniciar={onIniciar}
            onCerrar={onCerrar}
          />
          <PeriodoTable periodos={periodosPaginados} onRowPress={abrirModal} />
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
                marginVertical: 26,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Siguiente</Text>
            </TouchableOpacity>
          </View>
          <PeriodoModal
            visible={modalVisible}
            cerrarModal={cerrarModal}
            periodoSeleccionado={periodoSeleccionado}
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
       {/*<Footer />*/}
    </View>
  );
};

export default PeriodoScreen;