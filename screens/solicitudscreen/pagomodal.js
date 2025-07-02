import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Image, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';

const PagoModal = ({
  visible,
  cerrarModal,
  referencia,
  setReferencia,
  banco,
  setBanco,
  bancos,
  fechaPago,
  setFechaPago,
  showDatePicker,
  setShowDatePicker,
  imagen,
  setImagen,
}) => (
  <Modal visible={visible} transparent animationType="slide">
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
        <TouchableOpacity onPress={() => alert('Seleccionar imagen')} style={styles.imageBtn}>
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
);

const App = () => {
  const [modalDetalleVisible, setModalDetalleVisible] = useState(false);
  const [modalPagoVisible, setModalPagoVisible] = useState(false);

  return (
    // Your main app component code
    <>
      <SolicitudModal
        visible={modalDetalleVisible}
        cerrarModal={() => setModalDetalleVisible(false)}
        solicitudSeleccionada={solicitudSeleccionada}
      />
      <PagoModal
        visible={modalPagoVisible}
        cerrarModal={() => setModalPagoVisible(false)}
        // ...otros props...
      />
    </>
  );
};

export default PagoModal;