import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const PeriodoModal = ({
  visible,
  cerrarModal,
  periodoSeleccionado
}) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Detalle de Periodo</Text>
        {periodoSeleccionado ? (
          <>
            <Text>Parroquia: {periodoSeleccionado.parroquia}</Text>
            <Text>Inicio: {periodoSeleccionado.inicio}</Text>
            <Text>Final: {periodoSeleccionado.final}</Text>
            <Text>Días Activo: {periodoSeleccionado.diasActivo}</Text>
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

export default PeriodoModal;