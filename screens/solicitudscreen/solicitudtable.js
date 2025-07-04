import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";

const tableWidth = 540;
const estadoColor = {
  a: "#20c997", // Aprobado
  d: "#dc3545", // Denegado
  v: "#9E9E9E", // Verificando
};

const SolicitudTable = ({ solicitudes, onRowPress }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <View>
      <View style={[styles.tableHeader, { width: tableWidth }]}>
        <Text style={[styles.th, { width: 30 }]}>#</Text>
        <Text style={[styles.th, { width: 120 }]}>CONSEJO COMUNAL</Text>
        <Text style={[styles.th, { width: 100 }]}>FECHA DE SOLICITUD</Text>
        <Text style={[styles.th, { width: 110 }]}>REFERENCIA</Text>
        <Text style={[styles.th, { width: 80 }]}>PAGO TOTAL</Text>
        <Text style={[styles.th, { width: 80 }]}>ESTADO</Text>
      </View>
      {solicitudes.map((solicitud) => (
        <TouchableOpacity
          key={solicitud.id}
          style={[styles.tableRow, { width: tableWidth }]}
          onPress={() => onRowPress(solicitud)}
          activeOpacity={0.7}
        >
          <Text style={[styles.td, { width: 30 }]}>{solicitud.id}</Text>
          <Text style={[styles.td, { width: 120 }]}>{solicitud.nombre_consejo_comunal}</Text>
          <Text style={[styles.td, { width: 100 }]}>{solicitud.fecha}</Text>
          <View style={[styles.td, { width: 110, flexDirection: 'column', alignItems: 'center' }]}>
            {(solicitud.referencias_pagos || "")
              .split(",")
              .filter(ref => ref.trim() !== "") // Evita referencias vacías
              .map((ref, index) => {
                const estado = ref.slice(-1); // Último carácter
                const referencia = ref.slice(0, -1); // El resto
                const color = estadoColor[estado] || "#000";

                if (!referencia) return null; // Si no hay referencia, no renderiza

                return (
                  <View key={index} style={[styles.badge, { backgroundColor: color }]}>
                    <Text style={styles.badgeText}>{referencia}</Text>
                  </View>
                );
              })}
          </View>
          <Text style={[styles.td, { width: 80 }]}>{solicitud.precio_total}</Text>
          <View style={[styles.td, { width: 80 }]}>
            <View style={styles.estadoBadge}>
              <Text style={styles.estadoBadgeText}>{solicitud.estado}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  </ScrollView>
);

export default SolicitudTable;
