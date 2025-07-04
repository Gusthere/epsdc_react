import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';

const SolicitudFilters = ({
  estado, setEstado, estados,
  municipio, setMunicipio, municipios,
  parroquia, setParroquia, parroquias,
  fechaInicio, setFechaInicio,
  fechaFin, setFechaFin,
  setShowDatePicker,
  exportarPDF,
  limpiarFiltros
}) => (
  <View>
    {/* Fila de selects */}
    <View style={styles.filtrosRow}>
      <View style={styles.filtroItemRow}>
        <Text style={styles.filtroLabel}>Estado:</Text>
        <Picker selectedValue={estado} onValueChange={setEstado} style={styles.pickerRow}>
          <Picker.Item label="Seleccione estado" value="" />
          {estados.map(e => (
            <Picker.Item key={e.id} label={e.nombre} value={e.id} />
          ))}
        </Picker>
      </View>
      <View style={styles.filtroItemRow}>
        <Text style={styles.filtroLabel}>Municipio:</Text>
        <Picker selectedValue={municipio} onValueChange={setMunicipio} style={styles.pickerRow}>
          <Picker.Item label="Seleccione municipio" value="" />
          {municipios.map(e => (
            <Picker.Item key={e.id} label={e.nombre} value={e.id} />
          ))}
        </Picker>
      </View>
      <View style={styles.filtroItemRow}>
        <Text style={styles.filtroLabel}>Parroquia:</Text>
        <Picker selectedValue={parroquia} onValueChange={setParroquia} style={styles.pickerRow}>
          <Picker.Item label="Seleccione parroquia" value="" />
          {parroquias.map(e => (
            <Picker.Item key={e.id} label={e.nombre} value={e.id} />
          ))}
        </Picker>
      </View>
    </View>

    {/* Fila de fechas */}
    <View style={styles.filtrosRow}>
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

      <TouchableOpacity style={styles.pdfBtn} onPress={limpiarFiltros}>
        <Text style={{ color: 'white' }}>Limpiar</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default SolicitudFilters;
