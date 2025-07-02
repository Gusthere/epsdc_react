import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const tableWidth = 640;

const EntregaTable = ({ entregas, onRowPress, onFinalizar }) => (
  <ScrollView horizontal>
    <View>
      <View style={[styles.tableHeader, { width: tableWidth }]}>
        <Text style={[styles.th, { width: 120 }]}>CONSEJO</Text>
        <Text style={[styles.th, { width: 120 }]}>FECHA DE RECEPCIÓN</Text>
        <Text style={[styles.th, { width: 120 }]}>FECHA DE ENTREGA</Text>
        <Text style={[styles.th, { width: 80 }]}>EQUIPO</Text>
        <Text style={[styles.th, { width: 100 }]}>ESTADO</Text>
        <Text style={[styles.th, { width: 100 }]}>FINALIZAR</Text>
      </View>
      {entregas.map(item => (
        <TouchableOpacity
          key={item.id}
          style={[styles.tableRow, { width: tableWidth }]}
          onPress={() => onRowPress(item)}
          activeOpacity={0.7}
        >
          <Text style={[styles.td, { width: 120 }]}>{item.consejo}</Text>
          <Text style={[styles.td, { width: 120 }]}>{item.fechaRecepcion}</Text>
          <Text style={[styles.td, { width: 120 }]}>{item.fechaEntrega}</Text>
          <Text style={[styles.td, { width: 80 }]}>{item.equipo}</Text>
          <View style={[styles.td, { width: 100 }]}>
            <View style={styles.estadoBadge}>
              <Text style={styles.estadoBadgeText}>{item.estado}</Text>
            </View>
          </View>
          <View style={[styles.td, { width: 100, alignItems: 'center' }]}>
            {item.estado !== 'ENTREGADO' && (
              <TouchableOpacity
                style={{
                  backgroundColor: '#28a745',
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderRadius: 6,
                }}
                onPress={() => onFinalizar(item.id)}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Finaliza</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  </ScrollView>
);

export default EntregaTable;