import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const EntregaModal = ({
  visible,
  cerrarModal,
  entregaSeleccionada
}) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Detalle de Entrega</Text>
        {entregaSeleccionada ? (
          <>
            <Text>Consejo: {entregaSeleccionada.consejo}</Text>
            <Text>Fecha de Recepción: {entregaSeleccionada.fechaRecepcion}</Text>
            <Text>Fecha de Entrega: {entregaSeleccionada.fechaEntrega}</Text>
            <Text>Equipo: {entregaSeleccionada.equipo}</Text>
            <Text>Estado: {entregaSeleccionada.estado}</Text>
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

export default EntregaModal;