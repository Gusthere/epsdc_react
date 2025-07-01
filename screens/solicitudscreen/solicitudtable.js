import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from './styles';

const tableWidth = 520;

const SolicitudTable = ({ solicitudes }) => (
  <ScrollView horizontal>
    <View>
      <View style={[styles.tableHeader, { width: tableWidth }]}>
        <Text style={[styles.th, { width: 30 }]}>#</Text>
        <Text style={[styles.th, { width: 120 }]}>CONSEJO COMUNAL</Text>
        <Text style={[styles.th, { width: 100 }]}>FECHA DE SOLICITUD</Text>
        <Text style={[styles.th, { width: 110 }]}>REFERENCIA</Text>
        <Text style={[styles.th, { width: 80 }]}>PAGO TOTAL</Text>
        <Text style={[styles.th, { width: 80 }]}>ESTADO</Text>
      </View>
      {solicitudes.map(item => (
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
        </View>
      ))}
    </View>
  </ScrollView>
);

export default SolicitudTable;