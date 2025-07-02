import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const SolicitudModal = ({
  visible,
  cerrarModal,
  solicitudSeleccionada
}) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Detalle de Solicitud</Text>
        {solicitudSeleccionada ? (
          <>
            <Text>Consejo: {solicitudSeleccionada.consejo}</Text>
            <Text>Fecha de Solicitud: {solicitudSeleccionada.fechaSolicitud}</Text>
            <Text>Referencia: {solicitudSeleccionada.referencia}</Text>
            <Text>Estado: {solicitudSeleccionada.estado}</Text>
            {/* Agrega más campos si los tienes */}
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

export default SolicitudModal;