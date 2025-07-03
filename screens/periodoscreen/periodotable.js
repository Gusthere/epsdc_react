import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './styles';

const tableWidth = 600;

const PeriodoTable = ({ periodos, onRowPress }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <View>
      <View style={[styles.tableHeader, { width: tableWidth }]}>
        <Text style={[styles.th, { width: 180 }]}>PARROQUIA</Text>
        <Text style={[styles.th, { width: 120 }]}>INICIO</Text>
        <Text style={[styles.th, { width: 120 }]}>FINAL</Text>
        <Text style={[styles.th, { width: 100 }]}>DIAS ACTIVO</Text>
      </View>
      {periodos.map((item, idx) => (
        <TouchableOpacity
          key={idx}
          style={[styles.tableRow, { width: tableWidth }]}
          onPress={() => onRowPress && onRowPress(item)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.td,
              { 
                width: 180,
                color: item.final === 'ACTIVO' ? 'green' : 'black',
                fontWeight: 'bold'
              }
            ]}
          >
            {item.parroquia}
          </Text>
          <Text style={[styles.td, { width: 120 }]}>{item.inicio}</Text>
          <Text style={[styles.td, { width: 120 }]}>{item.final}</Text>
          <Text style={[styles.td, { width: 100 }]}>{item.diasActivo}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </ScrollView>
);

export default PeriodoTable;