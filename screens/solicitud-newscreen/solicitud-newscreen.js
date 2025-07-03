import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import MainTabs from '../../components/MainTabs';
/*import Footer from '../../components/Footer';*/

const consejosMock = [
  { label: 'Seleccione Consejo Comunal', value: '' },
  { label: 'Consejo 1', value: '1' },
  { label: 'Consejo 2', value: '2' },
  // ...otros consejos
];

const SolicitudNewScreen = () => {
  const navigation = useNavigation();
  const [consejo, setConsejo] = useState('');
  const [ciliP, setCiliP] = useState('');
  const [ciliM, setCiliM] = useState('');
  const [ciliMG, setCiliMG] = useState('');
  const [ciliG, setCiliG] = useState('');
  const [precio, setPrecio] = useState('');

  // Calcula el total automáticamente
  React.useEffect(() => {
    const total =
      (parseInt(ciliP) || 0) +
      (parseInt(ciliM) || 0) +
      (parseInt(ciliMG) || 0) +
      (parseInt(ciliG) || 0);
    setPrecio(total);
  }, [ciliP, ciliM, ciliMG, ciliG]);

  const limpiar = () => {
    setConsejo('');
    setCiliP('');
    setCiliM('');
    setCiliMG('');
    setCiliG('');
    setPrecio('');
  };

  const agregar = () => {
    alert('Solicitud agregada');
    limpiar();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
     
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <MainTabs />
        <Text style={styles.title}>Agregar Solicitud</Text>
        <View style={styles.card}>
          <Text style={styles.filtroLabel}>Consejo Comunal</Text>
          <Picker
            selectedValue={consejo}
            onValueChange={setConsejo}
            style={styles.pickerRow}
          >
            {consejosMock.map((c) => (
              <Picker.Item key={c.value} label={c.label} value={c.value} />
            ))}
          </Picker>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <View style={styles.inputGroup}>
              <Text style={styles.filtroLabel}>Cilindros 10kg</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={ciliP}
                onChangeText={setCiliP}
                placeholder="Cilindros 10kg"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.filtroLabel}>Cilindros 18kg</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={ciliM}
                onChangeText={setCiliM}
                placeholder="Cilindros 18kg"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.filtroLabel}>Cilindros 27kg</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={ciliMG}
                onChangeText={setCiliMG}
                placeholder="Cilindros 27kg"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.filtroLabel}>Cilindros 43kg</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={ciliG}
                onChangeText={setCiliG}
                placeholder="Cilindros 43kg"
              />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.filtroLabel}>Total</Text>
            <TextInput
              style={[styles.input, { backgroundColor: '#eee' }]}
              value={precio.toString()}
              editable={false}
              placeholder="Total"
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24, gap: 12 }}>
            <TouchableOpacity style={styles.limpiarBtn} onPress={limpiar}>
              <Text style={{ color: 'white' }}>Limpiar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.agregarBtn} onPress={agregar}>
              <Text style={{ color: 'white' }}>Agregar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: 'center', marginTop: 24 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#007bff',
              paddingVertical: 12,
              paddingHorizontal: 32,
              borderRadius: 24,
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('solicitud')}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
     {/*<Footer />*/}
    </View>
  );
};

export default SolicitudNewScreen;