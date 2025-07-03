import React, { useState } from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SolicitudFilters from './solicitudfilters';
import SolicitudTable from './solicitudtable';
import PagoModal from './pagomodal';
import SolicitudModal from './modal';
import styles from './styles';
import MainTabs from '../../components/MainTabs';
import { solicitudesMock, estados, municipios, parroquias, bancos } from './data';
import { useNavigation } from '@react-navigation/native';

const SolicitudScreen = () => {
  const navigation = useNavigation();
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
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [imagen, setImagen] = useState(null);

  // Para seleccionar solicitud activa
  const [modalDetalleVisible, setModalDetalleVisible] = useState(false);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);

  // Paginación
  const [pagina, setPagina] = useState(1);
  const registrosPorPagina = 4;

  // Funciones
  const exportarPDF = () => alert('Función de exportar PDF');
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
    setReferencia('');
    setBanco('');
    setFechaPago(new Date());
    setImagen(null);
    setSolicitudSeleccionada(null);
  };

  // Calcula los registros a mostrar
  const solicitudesPaginadas = solicitudesMock.slice(
    (pagina - 1) * registrosPorPagina,
    pagina * registrosPorPagina
  );

  const totalPaginas = Math.ceil(solicitudesMock.length / registrosPorPagina);

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
      <SolicitudTable
        solicitudes={solicitudesPaginadas}
        onRowPress={abrirModalDetalle}
      />
      {/* El paginador y el botón van aquí, fuera del ScrollView */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',marginTop: 8 }}>
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
       
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Siguiente</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', marginTop: 16 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#5478ff',
            width: 56,
            height: 56,
            borderRadius: 28,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 4,
            marginVertical: 29,
            marginBottom: 23,
          }}
          onPress={() => navigation.navigate('solicitud-new')}
        >
          <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold' }}>+</Text>
        </TouchableOpacity>
      </View>
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
      <SolicitudModal
        visible={modalDetalleVisible}
        cerrarModal={() => setModalDetalleVisible(false)}
        solicitudSeleccionada={solicitudSeleccionada}
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

export default SolicitudScreen;