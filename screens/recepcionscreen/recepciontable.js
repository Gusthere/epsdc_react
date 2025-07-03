import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const tableWidth = 700;

const RecepcionTable = ({ recepciones, onRowPress, onFinalizar }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <View>
      <View style={[styles.tableHeader, { width: tableWidth }]}>
        <Text style={[styles.th, { width: 30 }]}>#</Text>
        <Text style={[styles.th, { width: 120 }]}>CONSEJO</Text>
        <Text style={[styles.th, { width: 120 }]}>FECHA DE RECEPCIÓN</Text>
        <Text style={[styles.th, { width: 120 }]}>FECHA DE ENTREGA</Text>
        <Text style={[styles.th, { width: 110 }]}>EQUIPO</Text>
        <Text style={[styles.th, { width: 100 }]}>ESTADO</Text>
        <Text style={[styles.th, { width: 100 }]}>FINALIZAR</Text>
      </View>
      {recepciones.map(item => (
        <TouchableOpacity
          key={item.id}
          style={[styles.tableRow, { width: tableWidth }]}
          onPress={() => onRowPress(item)}
          activeOpacity={0.7}
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
          <View style={[styles.td, { width: 100, alignItems: 'center' }]}>
            {item.estado !== 'ENTREGADO' && (
              <TouchableOpacity
                style={{
                  backgroundColor: '#28a745',
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderRadius: 6,
                }}
                onPress={e => {
                  e.stopPropagation && e.stopPropagation();
                  onFinalizar(item.id);
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Finalizar</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  </ScrollView>
);

export default RecepcionTable;