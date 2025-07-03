import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';

const PeriodoFilters = ({
  estado, setEstado, estados,
  municipio, setMunicipio, municipios,
  parroquia, setParroquia, parroquias,
  parroquiaCerrar, setParroquiaCerrar, parroquiasCerrar,
  onIniciar, onCerrar
}) => (
  <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
    {/* Iniciar Periodo */}
    <View style={[styles.card, { flex: 1, borderColor: '#5478ff', borderWidth: 1 }]}>
      <Text style={styles.cardTitle}>INICIAR PERIODO</Text>
      <Text style={styles.filtroLabel}>Estado</Text>
      <Picker selectedValue={estado} onValueChange={setEstado} style={styles.pickerRow}>
        {estados.map(e => <Picker.Item key={e.value} label={e.label} value={e.value} />)}
      </Picker>
      <Text style={styles.filtroLabel}>Municipio</Text>
      <Picker selectedValue={municipio} onValueChange={setMunicipio} style={styles.pickerRow}>
        {municipios.map(e => <Picker.Item key={e.value} label={e.label} value={e.value} />)}
      </Picker>
      <Text style={styles.filtroLabel}>Parroquia</Text>
      <Picker selectedValue={parroquia} onValueChange={setParroquia} style={styles.pickerRow}>
        {parroquias.map(e => <Picker.Item key={e.value} label={e.label} value={e.value} />)}
      </Picker>
      <TouchableOpacity style={styles.iniciarBtn} onPress={onIniciar}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Iniciar</Text>
      </TouchableOpacity>
    </View>
    {/* Cerrar Periodo */}
    <View style={[styles.card, { flex: 1, borderColor: '#ff4343', borderWidth: 1 }]}>
      <Text style={[styles.cardTitle, { color: '#ff4343' }]}>CERRAR PERIODO</Text>
      <Text style={styles.filtroLabel}>Parroquia</Text>
      <Picker selectedValue={parroquiaCerrar} onValueChange={setParroquiaCerrar} style={styles.pickerRow}>
        {parroquiasCerrar.map(e => <Picker.Item key={e.value} label={e.label} value={e.value} />)}
      </Picker>
      <TouchableOpacity style={styles.cerrarBtn} onPress={onCerrar}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Cerrar</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default PeriodoFilters;