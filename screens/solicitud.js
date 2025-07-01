import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, FlatList, Modal,
  TextInput, Image, StyleSheet, Platform, ScrollView, Dimensions
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const estados = [
  { label: 'Seleccione Estado', value: '' },
  { label: 'Estado 1', value: 'estado1' },
  { label: 'Estado 2', value: 'estado2' },
];
const municipios = [
  { label: 'Seleccione Municipio', value: '' },
  { label: 'Municipio 1', value: 'municipio1' },
  { label: 'Municipio 2', value: 'municipio2' },
];
const parroquias = [
  { label: 'Seleccione Parroquia', value: '' },
  { label: 'Parroquia 1', value: 'parroquia1' },
  { label: 'Parroquia 2', value: 'parroquia2' },
];

const bancos = [
  { label: 'Seleccione Banco', value: '' },
  { label: 'BDV', value: 'bdv' },
  { label: 'Banesco', value: 'banesco' },
];

const solicitudesMock = [
  {
    id: 1,
    consejo: 'PRUEBAUNO',
    fecha: '12/05/2025',
    referencias: [
      { valor: '1011565854', color: '#20c997' },
      { valor: '1011584456', color: '#dc3545' }
    ],
    total: '990 Bs',
    estado: 'PENDIENTE'
  },
  {
    id: 2,
    consejo: 'PRUEBADOS',
    fecha: '13/05/2025',
    referencias: [
      { valor: '2011565854', color: '#20c997' }
    ],
    total: '1200 Bs',
    estado: 'PAGADO'
  },
  {
    id: 3,
    consejo: 'PRUEBATRES',
    fecha: '14/05/2025',
    referencias: [
      { valor: '3011565854', color: '#20c997' }
    ],
    total: '800 Bs',
    estado: 'PENDIENTE'
  },
  {
    id: 4,
    consejo: 'PRUEBACUATRO',
    fecha: '15/05/2025',
    referencias: [
      { valor: '4011565854', color: '#dc3545' }
    ],
    total: '1500 Bs',
    estado: 'RECHAZADO'
  },
  {
    id: 5,
    consejo: 'PRUEBACINCO',
    fecha: '16/05/2025',
    referencias: [
      { valor: '5011565854', color: '#20c997' }
    ],
    total: '950 Bs',
    estado: 'PENDIENTE'
  }
];

const windowWidth = Dimensions.get('window').width;

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
  const abrirGaleria = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

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

  const exportarPDF = () => {
    alert('Función de exportar PDF');
  };

  // Para la tabla responsiva
  const tableWidth = 650; // suma de los widths de las columnas

  // ListHeaderComponent para filtros y encabezado de tabla
  const renderHeader = () => (
    <>
      <Text style={styles.title}>Lista de Solicitudes</Text>
      <View style={styles.filtrosRow}>
        <View style={styles.filtroItem}>
          <Text style={styles.filtroLabel}>Estado:</Text>
          <Picker selectedValue={estado} onValueChange={setEstado} style={styles.picker}>
            {estados.map(e => <Picker.Item key={e.value} label={e.label} value={e.value} />)}
          </Picker>
        </View>
        <View style={styles.filtroItem}>
          <Text style={styles.filtroLabel}>Municipio:</Text>
          <Picker selectedValue={municipio} onValueChange={setMunicipio} style={styles.picker}>
            {municipios.map(e => <Picker.Item key={e.value} label={e.label} value={e.value} />)}
          </Picker>
        </View>
        <View style={styles.filtroItem}>
          <Text style={styles.filtroLabel}>Parroquia:</Text>
          <Picker selectedValue={parroquia} onValueChange={setParroquia} style={styles.picker}>
            {parroquias.map(e => <Picker.Item key={e.value} label={e.label} value={e.value} />)}
          </Picker>
        </View>
        <View style={styles.filtroItem}>
          <Text style={styles.filtroLabel}>De:</Text>
          <TouchableOpacity
            style={styles.dateBtn}
            onPress={() => setShowDatePicker('inicio')}
          >
            <Text>{fechaInicio ? fechaInicio.toLocaleDateString() : 'Seleccionar'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.filtroItem}>
          <Text style={styles.filtroLabel}>Hasta:</Text>
          <TouchableOpacity
            style={styles.dateBtn}
            onPress={() => setShowDatePicker('fin')}
          >
            <Text>{fechaFin ? fechaFin.toLocaleDateString() : 'Seleccionar'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.pdfBtn} onPress={exportarPDF}>
          <Text style={{ color: 'white' }}>PDF</Text>
        </TouchableOpacity>
      </View>
      {/* Tabla encabezado */}
      <ScrollView horizontal>
        <View>
          {/* Encabezado */}
          <View style={[styles.tableHeader, { width: tableWidth }]}>
            <Text style={[styles.th, { width: 30 }]}>#</Text>
            <Text style={[styles.th, { width: 120 }]}>CONSEJO COMUNAL</Text>
            <Text style={[styles.th, { width: 100 }]}>FECHA DE SOLICITUD</Text>
            <Text style={[styles.th, { width: 110 }]}>REFERENCIA</Text>
            <Text style={[styles.th, { width: 80 }]}>PAGO TOTAL</Text>
            <Text style={[styles.th, { width: 80 }]}>ESTADO</Text>
            <Text style={[styles.th, { width: 110 }]}>ACCIONES</Text>
          </View>
          {/* Filas */}
          {solicitudesMock.map(item => (
            <View key={item.id} style={[styles.tableRow, { width: tableWidth }]}>
              <Text style={[styles.td, { width: 30 }]}>{item.id}</Text>
              <Text style={[styles.td, { width: 120 }]}>{item.consejo}</Text>
              <Text style={[styles.td, { width: 100 }]}>{item.fecha}</Text>
              <View style={[styles.td, { width: 110, flexDirection: 'column', alignItems: 'center' }]}>
                {item.referencias.map((ref, idx) => (
                  <View key={idx} style={[styles.badge, { backgroundColor: ref.color }]}>
                    <Text style={styles.badgeText}>{ref.valor}</Text>
                  </View>
                ))}
              </View>
              <Text style={[styles.td, { width: 80 }]}>{item.total}</Text>
              <View style={[styles.td, { width: 80 }]}>
                <View style={styles.estadoBadge}>
                  <Text style={styles.estadoBadgeText}>{item.estado}</Text>
                </View>
              </View>
              <View style={[styles.td, { width: 110, flexDirection: 'row', justifyContent: 'center' }]}>
                <TouchableOpacity onPress={() => alert('Ver usuario')}>
                  <Icon name="account-group" size={22} color="#17a2b8" style={styles.iconBtn} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert('Actualizar')}>
                  <Icon name="refresh" size={22} color="#28a745" style={styles.iconBtn} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert('Eliminar')}>
                  <Icon name="delete" size={22} color="#ffc107" style={styles.iconBtn} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );

  // Render de cada fila
  const renderItem = ({ item }) => (
    <ScrollView horizontal>
      <View style={[styles.tableRow, { width: tableWidth }]}>
        <Text style={[styles.td, { width: 30 }]}>{item.id}</Text>
        <Text style={[styles.td, { width: 120 }]}>{item.consejo}</Text>
        <Text style={[styles.td, { width: 100 }]}>{item.fecha}</Text>
        <View style={[styles.td, { width: 110, flexDirection: 'column', alignItems: 'center' }]}>
          {item.referencias.map((ref, idx) => (
            <View key={idx} style={[styles.badge, { backgroundColor: ref.color }]}>
              <Text style={styles.badgeText}>{ref.valor}</Text>
            </View>
          ))}
        </View>
        <Text style={[styles.td, { width: 80 }]}>{item.total}</Text>
        <View style={[styles.td, { width: 80 }]}>
          <View style={styles.estadoBadge}>
            <Text style={styles.estadoBadgeText}>{item.estado}</Text>
          </View>
        </View>
        <View style={[styles.td, { width: 110, flexDirection: 'row', justifyContent: 'center' }]}>
          <TouchableOpacity onPress={() => alert('Ver usuario')}>
            <Icon name="account-group" size={22} color="#17a2b8" style={styles.iconBtn} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Actualizar')}>
            <Icon name="refresh" size={22} color="#28a745" style={styles.iconBtn} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Eliminar')}>
            <Icon name="delete" size={22} color="#ffc107" style={styles.iconBtn} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  // Render
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Solicitudes</Text>
      <View style={styles.filtrosRow}>
        <View style={styles.filtroItem}>
          <Text style={styles.filtroLabel}>Estado:</Text>
          <Picker selectedValue={estado} onValueChange={setEstado} style={styles.picker}>
            {estados.map(e => <Picker.Item key={e.value} label={e.label} value={e.value} />)}
          </Picker>
        </View>
        <View style={styles.filtroItem}>
          <Text style={styles.filtroLabel}>Municipio:</Text>
          <Picker selectedValue={municipio} onValueChange={setMunicipio} style={styles.picker}>
            {municipios.map(e => <Picker.Item key={e.value} label={e.label} value={e.value} />)}
          </Picker>
        </View>
        <View style={styles.filtroItem}>
          <Text style={styles.filtroLabel}>Parroquia:</Text>
          <Picker selectedValue={parroquia} onValueChange={setParroquia} style={styles.picker}>
            {parroquias.map(e => <Picker.Item key={e.value} label={e.label} value={e.value} />)}
          </Picker>
        </View>
        <View style={styles.filtroItem}>
          <Text style={styles.filtroLabel}>De:</Text>
          <TouchableOpacity
            style={styles.dateBtn}
            onPress={() => setShowDatePicker('inicio')}
          >
            <Text>{fechaInicio ? fechaInicio.toLocaleDateString() : 'Seleccionar'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.filtroItem}>
          <Text style={styles.filtroLabel}>Hasta:</Text>
          <TouchableOpacity
            style={styles.dateBtn}
            onPress={() => setShowDatePicker('fin')}
          >
            <Text>{fechaFin ? fechaFin.toLocaleDateString() : 'Seleccionar'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.pdfBtn} onPress={exportarPDF}>
          <Text style={{ color: 'white' }}>PDF</Text>
        </TouchableOpacity>
      </View>
      {/* Tabla con un solo scroll horizontal */}
      <ScrollView horizontal>
        <View>
          {/* Encabezado */}
          <View style={[styles.tableHeader, { width: tableWidth }]}>
            <Text style={[styles.th, { width: 30 }]}>#</Text>
            <Text style={[styles.th, { width: 120 }]}>CONSEJO COMUNAL</Text>
            <Text style={[styles.th, { width: 100 }]}>FECHA DE SOLICITUD</Text>
            <Text style={[styles.th, { width: 110 }]}>REFERENCIA</Text>
            <Text style={[styles.th, { width: 80 }]}>PAGO TOTAL</Text>
            <Text style={[styles.th, { width: 80 }]}>ESTADO</Text>
            <Text style={[styles.th, { width: 110 }]}>ACCIONES</Text>
          </View>
          {/* Filas */}
          {solicitudesMock.map(item => (
            <View key={item.id} style={[styles.tableRow, { width: tableWidth }]}>
              <Text style={[styles.td, { width: 30 }]}>{item.id}</Text>
              <Text style={[styles.td, { width: 120 }]}>{item.consejo}</Text>
              <Text style={[styles.td, { width: 100 }]}>{item.fecha}</Text>
              <View style={[styles.td, { width: 110, flexDirection: 'column', alignItems: 'center' }]}>
                {item.referencias.map((ref, idx) => (
                  <View key={idx} style={[styles.badge, { backgroundColor: ref.color }]}>
                    <Text style={styles.badgeText}>{ref.valor}</Text>
                  </View>
                ))}
              </View>
              <Text style={[styles.td, { width: 80 }]}>{item.total}</Text>
              <View style={[styles.td, { width: 80 }]}>
                <View style={styles.estadoBadge}>
                  <Text style={styles.estadoBadgeText}>{item.estado}</Text>
                </View>
              </View>
              <View style={[styles.td, { width: 110, flexDirection: 'row', justifyContent: 'center' }]}>
                <TouchableOpacity onPress={() => alert('Ver usuario')}>
                  <Icon name="account-group" size={22} color="#17a2b8" style={styles.iconBtn} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert('Actualizar')}>
                  <Icon name="refresh" size={22} color="#28a745" style={styles.iconBtn} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert('Eliminar')}>
                  <Icon name="delete" size={22} color="#ffc107" style={styles.iconBtn} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* DatePickers para filtros */}
      {showDatePicker === 'inicio' && (
        <DateTimePicker
          value={fechaInicio || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setFechaInicio(date);
          }}
        />
      )}
      {showDatePicker === 'fin' && (
        <DateTimePicker
          value={fechaFin || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setFechaFin(date);
          }}
        />
      )}

      {/* Modal de Pago */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Registrar Pago</Text>
            <TextInput
              placeholder="Referencia"
              style={styles.input}
              value={referencia}
              onChangeText={setReferencia}
              maxLength={15}
            />
            <Text style={styles.label}>Fecha</Text>
            <TouchableOpacity
              style={styles.dateBtn}
              onPress={() => setShowDatePicker('pago')}
            >
              <Text>{fechaPago ? fechaPago.toLocaleDateString() : 'Seleccionar'}</Text>
            </TouchableOpacity>
            {showDatePicker === 'pago' && (
              <DateTimePicker
                value={fechaPago}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, date) => {
                  setShowDatePicker(false);
                  if (date) setFechaPago(date);
                }}
              />
            )}
            <Text style={styles.label}>Banco</Text>
            <Picker selectedValue={banco} onValueChange={setBanco}>
              {bancos.map(e => <Picker.Item key={e.value} label={e.label} value={e.value} />)}
            </Picker>
            <TouchableOpacity onPress={abrirGaleria} style={styles.imageBtn}>
              <Text style={{ color: 'white' }}>Seleccionar Imagen</Text>
            </TouchableOpacity>
            {imagen && <Image source={{ uri: imagen }} style={styles.imagePreview} />}
            <TouchableOpacity style={styles.registrarBtn} onPress={() => alert('Pago registrado')}>
              <Text style={{ color: 'white' }}>Registrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cerrarModal}>
              <Text style={{ marginTop: 10, color: 'red' }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SolicitudScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  filtrosRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10, alignItems: 'center', gap: 8 },
  filtroItem: { minWidth: 120, marginRight: 8, marginBottom: 8 },
  filtroLabel: { fontWeight: 'bold', fontSize: 12 },
  picker: { height: 40, width: '100%' },
  dateBtn: { borderWidth: 1, borderColor: '#ccc', padding: 6, borderRadius: 4, backgroundColor: '#f8f8f8', marginTop: 2 },
  pdfBtn: { backgroundColor: '#ff4343', padding: 8, borderRadius: 5, marginLeft: 8 },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#ff4343',
    padding: 6,
    borderRadius: 4,
    marginBottom: 2,
  },
  th: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 6,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  td: {
    textAlign: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontSize: 12,
  },
  modalContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: 'white', padding: 20, borderRadius: 10, width: '90%'
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderBottomWidth: 1, marginBottom: 10 },
  label: { marginTop: 10 },
  imageBtn: {
    backgroundColor: '#28a745', padding: 10, borderRadius: 5, marginTop: 10
  },
  imagePreview: { width: 200, height: 200, marginTop: 10, alignSelf: 'center' },
  registrarBtn: {
    backgroundColor: '#007bff', padding: 10, marginTop: 10, borderRadius: 5,
    alignItems: 'center'
  },
  badge: {
    paddingVertical: 4, paddingHorizontal: 8, borderRadius: 12, marginVertical: 2
  },
  badgeText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  estadoBadge: {
    backgroundColor: '#ff914d', // badge de estado
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12
  },
  estadoBadgeText: { color: 'white', fontWeight: 'bold', fontSize: 12, textAlign: 'center' },
  iconBtn: { marginHorizontal: 4 }
});
