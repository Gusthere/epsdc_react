import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const tableWidth = 600;

const RecepcionTable = ({ recepciones, onRowPress }) => (
  <ScrollView horizontal>
    <View>
      <View style={[styles.tableHeader, { width: tableWidth }]}>
        <Text style={[styles.th, { width: 30 }]}>#</Text>
        <Text style={[styles.th, { width: 120 }]}>CONSEJO</Text>
        <Text style={[styles.th, { width: 120 }]}>FECHA DE RECEPCIÓN</Text>
        <Text style={[styles.th, { width: 120 }]}>FECHA DE ENTREGA</Text>
        <Text style={[styles.th, { width: 110 }]}>EQUIPO</Text>
        <Text style={[styles.th, { width: 100 }]}>ESTADO</Text>
      </View>
      {recepciones.map(item => (
        <TouchableOpacity
          key={item.id}
          style={[styles.tableRow, { width: tableWidth }]}
          onPress={() => onRowPress(item)}
        >
          <Text style={[styles.td, { width: 30 }]}>{item.id}</Text>
          <Text style={[styles.td, { width: 120 }]}>{item.consejo}</Text>
          <Text style={[styles.td, { width: 120 }]}>{item.fechaRecepcion}</Text>
          <Text style={[styles.td, { width: 120 }]}>{item.fechaEntrega}</Text>
          <Text style={[styles.td, { width: 110 }]}>{item.equipo}</Text>
          <View style={[styles.td, { width: 100 }]}>
            <View style={styles.estadoBadge}>
              <Text style={styles.estadoBadgeText}>{item.estado}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  </ScrollView>
);

export default RecepcionTable;