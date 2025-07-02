import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const RecepcionModal = ({
  visible,
  cerrarModal,
  recepcionSeleccionada
}) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Detalle de Recepción</Text>
        {recepcionSeleccionada ? (
          <>
            <Text>Consejo: {recepcionSeleccionada.consejo}</Text>
            <Text>Fecha de Recepción: {recepcionSeleccionada.fechaRecepcion}</Text>
            <Text>Fecha de Entrega: {recepcionSeleccionada.fechaEntrega}</Text>
            <Text>Equipo: {recepcionSeleccionada.equipo}</Text>
            <Text>Estado: {recepcionSeleccionada.estado}</Text>
          </>
        ) : (
          <Text>No hay datos</Text>
        )}
        <TouchableOpacity onPress={cerrarModal} style={{ marginTop: 20 }}>
          <Text style={{ color: 'red' }}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default RecepcionModal;